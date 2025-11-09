"""Architecture and Pattern Implementation Document."""

# Re:MirAI Backend Architecture & Design Patterns

## Overview

This document explains how the three key design patterns (Saga, CQRS, Queue-Based Load Leveling) are implemented in the Re:MirAI backend.

## 1. Saga Pattern (Distributed Transactions)

### Problem
Persona generation involves multiple external service calls (LLM, image generation) that can fail independently. Traditional transactions don't work well with async operations.

### Solution
Split persona generation into discrete steps, each with its own transaction. Each step triggers the next via SQS messages.

### Implementation

**Flow Diagram:**
```
User Request
    ↓
API: POST /personas/me
    ↓
Create Persona (status: "pending")
    ↓
[Enough responses?] → Send message to "persona-generation-queue"
    ↓
SQS Message
    ↓
Persona Synthesis Worker (Lambda)
    ├─ Aggregate survey responses
    ├─ Call LLM to generate prompt
    ├─ Update Persona (status: "generating_image")
    └─ Send message to "image-generation-queue"
    ↓
Image Generation Worker (Lambda)
    ├─ Generate illustration
    ├─ Update Persona (status: "ready")
    └─ Cleanup
    ↓
User Polls: GET /personas/me
    ↓
Response: { status: "ready", illustration_url, persona_prompt }
```

**Code References:**
- Saga initiation: `app/core/services.py::PersonaService.get_or_create_persona()`
- Saga Step 1: `app/workers/persona_synthesis_worker.py::lambda_handler()`
- Saga Step 2: `app/workers/image_generation_worker.py::lambda_handler()`

**Retry & Compensation:**
- SQS automatically retries failed messages (configurable)
- Dead-Letter Queue (DLQ) catches repeated failures
- Persona status reverts to "failed" if saga doesn't complete

### Benefits
✓ Each step is independent and can be scaled separately
✓ Failures are isolated; one step failing doesn't crash others
✓ Easy to add new steps without changing existing code
✓ Natural fit for serverless architecture (Lambda functions)

---

## 2. CQRS (Command Query Responsibility Segregation)

### Problem
API endpoints that modify data (create survey) and those that read data (fetch persona) have different performance requirements and failure modes. Mixing them leads to optimization trade-offs.

### Solution
Separate endpoints into **Commands** (write/modify) and **Queries** (read).

### Implementation

**Commands (Writes):**
```
POST /api/v1/surveys
  ├─ Input: { } (authenticated)
  ├─ Action: Create survey record
  ├─ Response: { survey_id, survey_url }
  ├─ Latency: < 100ms
  └─ Idempotency: Not required

POST /api/v1/surveys/{id}/responses
  ├─ Input: { answers: {...} }
  ├─ Action: Store response
  ├─ Response: { status: "success" }
  ├─ Latency: < 100ms
  └─ Idempotency: Not required (fingerprinting prevents duplicates)

POST /api/v1/personas/me/chat
  ├─ Input: { message: string }
  ├─ Action: Generate AI response, store in history
  ├─ Response: { response: string }
  ├─ Latency: 1-5 seconds (LLM call)
  └─ Idempotency: Not required
```

**Queries (Reads):**
```
GET /api/v1/surveys/{id}
  ├─ Action: Fetch survey questions
  ├─ Response: { survey_id, questions: [...] }
  ├─ Latency: < 50ms
  ├─ Cacheable: Yes (immutable)
  └─ Idempotency: Always idempotent

GET /api/v1/personas/me
  ├─ Action: Fetch persona + check status
  ├─ Response: { persona_id, status, persona_prompt, illustration_url }
  ├─ Latency: < 100ms
  ├─ Cacheable: Partially (status changes)
  └─ Idempotency: Always idempotent
```

**Code References:**
- Commands: `app/core/services.py` (methods that modify state)
- Queries: `app/core/services.py` (methods that only read state)
- Separation: Routes don't directly access database; they use services

### Benefits
✓ Commands can have optimized write paths (batching, async confirmation)
✓ Queries can be cached aggressively
✓ Easier to scale read-heavy or write-heavy workloads independently
✓ Clear separation of concerns

---

## 3. Queue-Based Load Leveling (SQS)

### Problem
External API calls (LLM, image generation) can be slow and variable. If the API server waits for these, it consumes threads/connections, becoming a bottleneck. During viral traffic spikes, the system can fail.

### Solution
Use SQS as a buffer. API server enqueues jobs immediately and responds to users right away. Workers process jobs asynchronously.

### Implementation

**Flow Diagram:**
```
Traffic Spike Scenario (10,000 requests/sec)
    ↓
API Server 1, 2, 3, ...
    ├─ Accept request (< 10ms)
    ├─ Enqueue to SQS (< 20ms)
    ├─ Respond to user immediately
    └─ No waiting for LLM/image generation
    ↓
SQS Queue Buffer (maintains order, handles backlog)
    ├─ Queue depth: 50,000 messages
    └─ Messages retained for 4 days
    ↓
Lambda Workers (persona-synthesis-worker, image-generation-worker)
    ├─ Worker 1: Processing message 1 (30 seconds)
    ├─ Worker 2: Processing message 2 (30 seconds)
    ├─ ...
    └─ Auto-scales: 100 concurrent workers if needed
    ↓
Result: System stays healthy, latency is predictable, users get timely updates
```

**Code References:**
- Enqueuing: `app/utils/queue_manager.py::QueueManager.send_message()`
- Workers consuming: `app/workers/*.py::lambda_handler()`
- Configuration: `.env` (queue names) and AWS Lambda settings (concurrency)

**Configuration:**

```python
# app/config.py
persona_generation_queue_name = "persona-generation-queue"
image_generation_queue_name = "image-generation-queue"

# AWS Lambda concurrency settings:
# - Reserved: 10 concurrent workers
# - Max: 100 concurrent workers (scales up during load)
```

### Benefits
✓ System never waits for slow operations
✓ Graceful degradation: queue builds up, but system stays responsive
✓ Automatic scaling: more concurrent workers if queue depth increases
✓ No cascading failures: one slow worker doesn't block others
✓ Perfect for viral traffic (requests spike, but system stays stable)

### Monitoring SQS

```bash
# Check queue depth
aws sqs get-queue-attributes \
  --queue-url https://sqs.us-east-1.amazonaws.com/xxxxx/persona-generation-queue \
  --attribute-names ApproximateNumberOfMessages

# Sample output: ApproximateNumberOfMessages: 1250
# If this keeps growing, increase worker concurrency

# Check Dead-Letter Queue for errors
aws sqs get-queue-attributes \
  --queue-url .../persona-generation-queue-dlq \
  --attribute-names ApproximateNumberOfMessages
```

---

## Data Flow Example: Creating a Persona

### Step 1: User submits survey response
```
POST /api/v1/surveys/abc123/responses
Body: { "answers": { "q1": "Very funny", "q2": "Calm" } }

Service: SurveyService.submit_response()
├─ Repository: Create SurveyResponse record
├─ Check: count responses for survey
└─ Return: { status: "success" }

Response: 201 Created
```

### Step 2: User requests persona (after 3+ responses)
```
GET /api/v1/personas/me
Header: Authorization: Bearer {jwt_token}

Service: PersonaService.get_or_create_persona()
├─ Check: Does persona exist?
│  ├─ No → Create Persona record (status: "pending")
│  └─ Yes → Continue
├─ Check: Is status still "pending"?
│  ├─ No → Return current state
│  └─ Yes:
│    ├─ Check: Are there 3+ responses?
│    │  ├─ No → Return { status: "pending", ... }
│    │  └─ Yes → QueueManager.send_message() to SQS
│    └─ Update: Persona status to "synthesizing"
└─ Return: { status: "synthesizing" }

Response: 200 OK
```

### Step 3: Persona Synthesis Worker
```
SQS Message: { persona_id: "xyz", user_id: "user1", survey_id: "survey1" }

Worker: persona_synthesis_worker.lambda_handler()
├─ Get survey responses from DB
├─ Aggregate answers (extract themes, traits)
├─ Call LLM: "Generate persona prompt from: [themes]"
│  └─ LLM returns: "You are witty, calm, introverted..."
├─ Update DB: Persona.status = "generating_image"
├─ QueueManager.send_message() to image-generation-queue
└─ SQS.delete_message() ← Mark as processed

Next: Image Generation Worker
```

### Step 4: Image Generation Worker
```
SQS Message: { persona_id: "xyz", persona_prompt: "You are..." }

Worker: image_generation_worker.lambda_handler()
├─ Call Image API: "Generate character portrait: [persona_prompt]"
│  └─ API returns: "https://images.example.com/xyz.png"
├─ Update DB: 
│  ├─ Persona.illustration_url = "https://..."
│  ├─ Persona.persona_prompt = "You are..."
│  └─ Persona.status = "ready"
└─ SQS.delete_message() ← Mark as processed

Result: Persona is now ready
```

### Step 5: User polls and sees result
```
GET /api/v1/personas/me (polling every 5 seconds)

First poll: { status: "synthesizing", ... }
Second poll: { status: "generating_image", ... }
Third poll: { status: "ready", illustration_url: "https://...", persona_prompt: "..." }

Frontend: Triggers celebration animation, shows persona card
```

---

## Scalability Analysis

### How each pattern enables growth:

| Metric | Without Patterns | With Patterns |
|--------|------------------|---------------|
| **Requests/sec at launch** | 100 | 100 |
| **Max sustained requests** | 500 (bottleneck: LLM calls block threads) | 50,000 (queue absorbs spike) |
| **Response time during spike** | 30+ seconds | < 100ms (queued immediately) |
| **User experience during spike** | Timeouts, errors | Smooth; persona generation delayed |
| **System recovery time** | 10+ minutes | Automatic as queue drains |
| **Cost per request during spike** | High (wasted compute) | Low (pay only for work done) |

### Timeline: Growing from 1K to 100K daily users

**Day 1-7:** 1K users
- Single API instance sufficient
- Workers process surveys immediately
- No queue backlog

**Week 2:** 10K users
- Auto-scale to 2-3 API instances
- Queue depth stays < 100
- Workers still fast

**Week 3:** 50K users (viral moment)
- Auto-scale to 5+ API instances
- Queue depth: 5,000 messages
- Users see: persona generation takes 2-5 minutes
- System stays stable

**Week 4:** 100K+ users (peak viral)
- 10+ API instances
- 50+ concurrent workers
- Queue depth: 20,000 messages
- Users see: persona generation takes 10 minutes
- System still stable, no downtime

---

## Summary

These three patterns work together to create a resilient, scalable backend:

1. **Saga Pattern** → Handles complex multi-step operations reliably
2. **CQRS** → Optimizes reads and writes independently  
3. **Queue-Based Load Leveling** → Absorbs traffic spikes without degradation

Together, they enable Re:MirAI to handle viral growth without breaking.

