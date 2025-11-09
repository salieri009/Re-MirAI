"""Deployment guide with infrastructure as code (IaC) instructions."""

# Deployment Guide for Re:MirAI Backend

## Quick Start

### Prerequisites
```bash
# Install AWS CLI v2
# Install AWS Chalice CLI
pip install chalice

# Install Terraform (optional, for IaC)
# Download from https://www.terraform.io/downloads.html
```

## Step 1: Prepare AWS Environment

### Create IAM Role for Chalice
```bash
# Create a role with permissions for Chalice
aws iam create-role --role-name chalice-deployment-role \
  --assume-role-policy-document file://trust-policy.json
```

### Create RDS PostgreSQL Instance
```bash
# Option A: Using AWS CLI
aws rds create-db-instance \
  --db-instance-identifier remirai-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password [PASSWORD] \
  --allocated-storage 20

# Option B: Using AWS Console (recommended for first-time)
# Navigate to RDS > Create Database > PostgreSQL
```

### Create SQS Queues
```bash
# Create persona generation queue
aws sqs create-queue --queue-name persona-generation-queue

# Create image generation queue
aws sqs create-queue --queue-name image-generation-queue
```

## Step 2: Configure Environment

1. **Set up credentials:**
   ```bash
   aws configure
   ```

2. **Create .env file from template:**
   ```bash
   cp .env.example .env
   ```

3. **Update .env with AWS and API credentials:**
   ```
   DATABASE_URL=postgresql://admin:password@remirai-db.xxxxx.us-east-1.rds.amazonaws.com:5432/remirai_db
   AWS_REGION=us-east-1
   GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-secret
   LLM_API_KEY=sk-xxxx
   IMAGE_API_KEY=sk-xxxx
   JWT_SECRET=your-long-random-secret-key
   ```

## Step 3: Deploy to AWS

### Deploy Chalice App

```bash
# Login to Chalice (first time only)
chalice login

# Deploy the main API
chalice deploy

# The deploy will output:
# - API endpoint: https://xxxxx.execute-api.us-east-1.amazonaws.com/api/
# - CloudWatch logs location
```

### Deploy Lambda Workers

The workers need to be deployed separately and linked to SQS queues.

#### Option A: Using AWS Lambda Console
1. Go to AWS Lambda Console
2. Create function: `persona-synthesis-worker`
   - Runtime: Python 3.11
   - Handler: `app.workers.persona_synthesis_worker.lambda_handler`
   - Timeout: 60 seconds
   - Memory: 512 MB
3. Add trigger: SQS > `persona-generation-queue`
4. Add environment variables (same as .env)
5. Repeat for `image-generation-worker`

#### Option B: Using AWS CLI

```bash
# Package the worker function
zip -r persona-worker.zip app/ requirements.txt

# Create Lambda function
aws lambda create-function \
  --function-name persona-synthesis-worker \
  --runtime python3.11 \
  --role arn:aws:iam::ACCOUNT_ID:role/lambda-execution-role \
  --handler app.workers.persona_synthesis_worker.lambda_handler \
  --zip-file fileb://persona-worker.zip \
  --timeout 60 \
  --memory-size 512 \
  --environment Variables="{...}"

# Create event source mapping (SQS trigger)
aws lambda create-event-source-mapping \
  --event-source-arn arn:aws:sqs:us-east-1:ACCOUNT_ID:persona-generation-queue \
  --function-name persona-synthesis-worker \
  --batch-size 1
```

## Step 4: Initialize Database

```bash
# Connect to RDS instance
psql postgresql://admin:password@remirai-db.xxxxx.amazonaws.com/remirai_db

# Run SQL to create tables
\i backend/schema.sql

# Or use Python ORM
python -c "from app.core.database import Base, engine; Base.metadata.create_all(bind=engine)"
```

## Step 5: Test Deployment

```bash
# Test API health
curl https://xxxxx.execute-api.us-east-1.amazonaws.com/api/health

# Test Google auth
curl -X POST https://xxxxx.execute-api.us-east-1.amazonaws.com/api/v1/auth/google \
  -H "Content-Type: application/json" \
  -d '{"token": "google-id-token"}'
```

## Monitoring & Maintenance

### View Logs
```bash
# Chalice API logs
chalice logs

# Lambda worker logs
aws logs tail /aws/lambda/persona-synthesis-worker --follow

# SQS queue depth
aws sqs get-queue-attributes \
  --queue-url https://sqs.us-east-1.amazonaws.com/xxxxx/persona-generation-queue \
  --attribute-names ApproximateNumberOfMessages
```

### Scaling Configuration

- **API Gateway:** Auto-scales (max 10k requests/sec)
- **Lambda:** Increase reserved concurrency if needed
  ```bash
  aws lambda put-function-concurrency \
    --function-name persona-synthesis-worker \
    --reserved-concurrent-executions 100
  ```
- **RDS:** Monitor CPU/connections; scale up if needed

## Rollback

```bash
# Revert to previous Chalice deployment
chalice delete --stage previous-stage

# Or keep multiple stages
chalice deploy --stage prod
chalice deploy --stage staging
```

## Cost Optimization

- Use t3.micro RDS for development
- Set SQS message retention to 1 day (default: 4 days)
- Enable Lambda provisioned concurrency during peak hours
- Use CloudFront to cache API responses

---

For detailed AWS best practices, see: https://docs.aws.amazon.com/chalice/latest/userguide/
