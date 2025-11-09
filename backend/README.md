"""README for Re:MirAI Backend - Deployment and Architecture Guide."""

# Re:MirAI Backend

A production-grade, serverless backend for the Re:MirAI persona AI service, built with AWS Chalice and Python.

## Architecture Overview

This backend implements three critical design patterns for enterprise-grade reliability and scalability:

### 1. **Saga Pattern (Distributed Transactions)**
The persona generation process is split into multiple asynchronous steps:
- **Step 1:** Survey Response Aggregation + Persona Prompt Generation (Persona Synthesis Worker)
- **Step 2:** AI Illustration Generation (Image Generation Worker)

Each step is independent and can be retried independently, ensuring resilience.

### 2. **CQRS (Command Query Responsibility Segregation)**
API endpoints are split into two categories:
- **Commands (Write):** Endpoints that trigger actions (POST `/surveys`, POST `/personas/me/chat`)
- **Queries (Read):** Endpoints that retrieve state (GET `/surveys/{id}`, GET `/personas/me`)

This allows each to be optimized independently and enables better horizontal scaling.

### 3. **Queue-Based Load Leveling (SQS)**
Long-running tasks are placed in SQS queues, decoupling the API server from worker nodes:
- API servers quickly enqueue jobs and respond to users immediately
- Workers process jobs at their own pace
- System remains stable even during traffic spikes (viral moments)

## Project Structure

```
backend/
├── app/
│   ├── core/                    # Core business logic
│   │   ├── database.py          # SQLAlchemy setup
│   │   ├── models.py            # ORM models (User, Survey, Persona, etc.)
│   │   ├── repositories.py      # Data access layer
│   │   └── services.py          # Business logic (CQRS pattern)
│   ├── routes/                  # API endpoint handlers
│   │   ├── auth.py              # Authentication routes (Google OAuth)
│   │   ├── surveys.py           # Survey CRUD routes
│   │   └── personas.py          # Persona routes
│   ├── workers/                 # Lambda functions for async processing
│   │   ├── persona_synthesis_worker.py   # Saga Step 1
│   │   └── image_generation_worker.py    # Saga Step 2
│   ├── utils/                   # Utility modules
│   │   ├── auth.py              # JWT utilities
│   │   ├── queue_manager.py     # SQS management (Queue-Based Load Leveling)
│   │   ├── llm_client.py        # LLM API client
│   │   ├── image_generation_client.py   # Image generation API client
│   │   └── helpers.py           # Helper functions
│   └── app.py                   # Chalice entry point
├── tests/                       # Test suite
├── requirements.txt             # Python dependencies
├── .env.example                 # Environment variables template
└── README.md                    # This file
```

## Installation

### Prerequisites
- Python 3.9+
- PostgreSQL 12+
- AWS Account (with Chalice CLI installed)
- Google OAuth 2.0 credentials

### Setup

1. **Clone and navigate to backend:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Setup environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

5. **Initialize database:**
   ```bash
   python -c "from app.core.database import Base, engine; Base.metadata.create_all(bind=engine)"
   ```

## Deployment

### Local Development

```bash
chalice local
```

The API will be available at `http://localhost:8000`.

### AWS Deployment

1. **Deploy API:**
   ```bash
   chalice deploy
   ```

2. **Deploy Workers:**
   Workers are deployed as separate Lambda functions, linked to SQS queues.

   - **Persona Synthesis Worker:** Triggered by `persona-generation-queue`
   - **Image Generation Worker:** Triggered by `image-generation-queue`

   Use AWS CloudFormation or CDK to orchestrate deployment.

## API Endpoints

### Authentication
- `POST /api/v1/auth/google` - Google OAuth login/registration

### Surveys
- `POST /api/v1/surveys` - Create a survey
- `GET /api/v1/surveys/{survey_id}` - Fetch survey questions
- `POST /api/v1/surveys/{survey_id}/responses` - Submit survey responses

### Personas
- `GET /api/v1/personas/me` - Get user's persona (triggers generation if needed)
- `POST /api/v1/personas/me/chat` - Chat with persona

## Environment Variables

See `.env.example` for all available configuration options.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT signing
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `LLM_API_KEY` - OpenAI API key (or similar)
- `IMAGE_API_KEY` - Image generation API key

## Testing

```bash
pytest tests/
```

## Design Patterns in Action

### Example: Creating a Persona

1. **User submits survey responses** → API stores them
2. **User requests persona** → API creates `Persona` record with `status: "pending"`
3. **Enough responses received** → API sends message to SQS queue (Queue-Based Load Leveling)
4. **Persona Synthesis Worker** receives message → Aggregates responses, calls LLM, sends next message (Saga Step 1)
5. **Image Generation Worker** receives message → Generates illustration, marks persona as "ready" (Saga Step 2)
6. **User polls** → `GET /personas/me` returns `status: "ready"` with full persona details
7. **Frontend displays** → User sees their generated persona card

## Performance Considerations

- **Database:** Use connection pooling (implemented in `core/database.py`)
- **Caching:** Consider caching survey questions and generated personas in a distributed cache (Redis)
- **API:** Use API Gateway throttling to prevent abuse
- **Workers:** Configure Lambda concurrency limits to prevent resource exhaustion

## Monitoring & Logging

- **CloudWatch Logs:** All Lambda functions and Chalice app logs go here
- **SQS Metrics:** Monitor queue depth to detect bottlenecks
- **Database Monitoring:** Use RDS Enhanced Monitoring

## Security

- JWT tokens expire after 24 hours (configurable)
- Google OAuth handles authentication; we store the `sub` claim
- Survey responses are anonymized via client fingerprinting
- All API endpoints (except public survey pages) require authentication
- Use AWS Secrets Manager for sensitive credentials

## Contributing

Follow the existing architecture patterns:
1. Add business logic to `core/services.py`
2. Add data access to `core/repositories.py`
3. Add API endpoints to `routes/`
4. Add async workers to `workers/`

## Future Enhancements

- Add WebSocket support for real-time chat updates
- Implement caching layer (Redis) for frequently accessed personas
- Add analytics to track engagement and viral metrics
- Support more LLM and image generation APIs
- Implement rate limiting and usage quotas

---

**Last Updated:** November 2025
**Author:** Re:MirAI Development Team
