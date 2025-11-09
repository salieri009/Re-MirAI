"""Queue management for SQS (Queue-Based Load Leveling Pattern)."""
import json
import boto3
from typing import dict
from app.config import get_settings

settings = get_settings()


class QueueManager:
    """Manages SQS queue operations for asynchronous processing."""

    def __init__(self):
        self.sqs_client = boto3.client(
            "sqs",
            region_name=settings.aws_region,
            aws_access_key_id=settings.aws_access_key_id,
            aws_secret_access_key=settings.aws_secret_access_key,
        )
        self._queue_urls = {}

    def _get_queue_url(self, queue_name: str) -> str:
        """Get or cache the URL for a queue."""
        if queue_name not in self._queue_urls:
            response = self.sqs_client.get_queue_url(QueueName=queue_name)
            self._queue_urls[queue_name] = response["QueueUrl"]
        return self._queue_urls[queue_name]

    def send_message(self, queue_name: str, message_body: dict) -> str:
        """Send a message to an SQS queue."""
        queue_url = self._get_queue_url(queue_name)
        response = self.sqs_client.send_message(
            QueueUrl=queue_url,
            MessageBody=json.dumps(message_body),
        )
        return response["MessageId"]

    def receive_messages(self, queue_name: str, max_messages: int = 1, wait_time_seconds: int = 5):
        """Receive messages from an SQS queue."""
        queue_url = self._get_queue_url(queue_name)
        response = self.sqs_client.receive_message(
            QueueUrl=queue_url,
            MaxNumberOfMessages=max_messages,
            WaitTimeSeconds=wait_time_seconds,
        )
        return response.get("Messages", [])

    def delete_message(self, queue_name: str, receipt_handle: str):
        """Delete a message from an SQS queue."""
        queue_url = self._get_queue_url(queue_name)
        self.sqs_client.delete_message(QueueUrl=queue_url, ReceiptHandle=receipt_handle)
