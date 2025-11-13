# Backend Architecture: Persona AI

This document outlines the backend architecture for the Persona AI project, designed for high scalability and maintainability using a serverless approach on AWS.

## 1. Core Principles

-   **Serverless First:** Leverage AWS Lambda and API Gateway via the AWS Chalice framework to ensure automatic scaling, reduced operational overhead, and a pay-per-use cost model.
-   **Modular Design:** Structure the application into logical, domain-driven modules to promote separation of concerns, even within a single Chalice deployment. This facilitates future migration to a full microservices architecture if necessary.
-   **Asynchronous Processing:** Offload long-running tasks, such as AI persona generation, to a background processing queue to ensure a responsive API for users.
-   **Infrastructure as Code (IaC):** All AWS resources will be defined and managed through code for consistency and reproducibility.

## 2. Technology Stack

-   **Framework:** AWS Chalice
-   **Language:** Python 3.11+
-   **Database:** PostgreSQL (via Amazon RDS)
-   **Asynchronous Tasks:** AWS SQS + AWS Lambda
-   **Deployment:** AWS CodePipeline / GitHub Actions for CI/CD

## 3. Modular Structure

The backend application will be organized into the following distinct modules:

-   **`core`**: Contains shared utilities, configurations, custom exception handlers, database models (e.g., SQLAlchemy base), and base service classes.
-   **`auth`**: Manages all authentication and authorization logic. Responsible for handling Google Social Login, JWT creation, and validation.
-   **`analyses`**: Handles the creation and management of "Profile Analysis" surveys. Manages response submission and tracks the state of an analysis.
-   **`personas`**: The core business logic module.
    -   Handles the persona generation lifecycle (triggering, status tracking).
    -   Manages all chat interactions with the persona.
    -   Interfaces with AI services for LLM responses.
-   **`social`**: Manages social features, including retrieving public persona cards and calculating chemistry between personas.
-   **`workers`**: Contains the logic for asynchronous Lambda functions, decoupled from the main API. The first worker will be `PersonaGenerator`.

## 4. Directory Structure

The structure is designed to be modular and scalable, promoting a clear separation of concerns.

### 4.1. Top-Level Directory Structure

```
/backend
├── .chalice/              # Chalice deployment configuration & policies.
├── chalicelib/            # Main application source code.
├── tests/                 # Unit and integration tests.
├── app.py                 # Main Chalice app object and route registration.
├── requirements.txt       # Project dependencies for the API.
└── requirements-dev.txt   # Dependencies for local development and testing.
```

### 4.2. `chalicelib` - Application Source Code

All business logic and application code resides within the `chalicelib` directory, which is automatically added to the Python path during deployment.

```
/chalicelib
├── __init__.py
├── core/                  # Shared utilities, configs, and base classes.
├── auth/                  # Authentication module.
├── analyses/              # Survey/Analysis module.
├── personas/              # Persona generation and interaction module.
├── social/                # Social features module.
└── workers/               # Asynchronous task processors.
```

### 4.3. Module Structure (Example: `personas` module)

Each feature module follows a consistent internal structure.

```
/chalicelib/personas
├── __init__.py
├── routes.py              # Defines API endpoints (e.g., /personas/generate).
├── services.py            # Contains the core business logic.
├── schemas.py             # Pydantic schemas for request/response validation (DTOs).
└── exceptions.py          # Custom exceptions specific to the module.
```

-   **`routes.py`**: Handles request parsing, calling the appropriate service, and formatting the response.
-   **`services.py`**: Implements the core business logic, decoupled from the HTTP layer.
-   **`schemas.py`**: Defines Pydantic models for a consistent API contract.

### 4.4. `core` Module Structure

The `core` module contains code shared across all other modules.

```
/chalicelib/core
├── __init__.py
├── config.py              # Handles environment variables and configuration.
├── db.py                  # Manages database connections and sessions.
├── exceptions.py          # Global custom exception classes and error handlers.
└── models/                # Directory for SQLAlchemy data models.
    ├── __init__.py
    ├── base.py
    ├── user.py
    └── ...
```

### 4.5. `app.py` - Entry Point

The main `app.py` file is kept lean. It is responsible for initializing the Chalice `app` object and registering the route blueprints from each feature module.

## 5. Asynchronous Persona Generation Flow

To handle the computationally intensive process of generating a persona, an asynchronous workflow is employed:

1.  **API Call:** The frontend calls `POST /personas/generate`.
2.  **Enqueue Job:** The API endpoint performs initial validation and pushes a message to an SQS queue. The message contains necessary context like `user_id` and `analysis_id`. The API immediately returns a `202 Accepted` response.
3.  **Worker Trigger:** The SQS queue is configured to trigger the `PersonaGenerator` Lambda worker.
4.  **Processing:** The worker function consumes the message, fetches all required data, synthesizes the persona, interacts with AI services, and updates the persona's status in the database (`generating` -> `ready` or `failed`).
5.  **Client Polling:** The frontend periodically polls the `GET /personas/me` endpoint to check the generation status and retrieves the persona data once it's `ready`.

## 6. Scalability & Performance

-   **Compute:** AWS Lambda provides inherent scalability, automatically handling concurrent requests.
-   **Database:** Amazon RDS for PostgreSQL will be configured with a primary and a read replica. All read-heavy operations (e.g., fetching chat history, public profiles) will be directed to the read replica to reduce load on the primary instance.
-   **Caching:** A caching layer (e.g., Amazon ElastiCache for Redis) will be introduced for frequently accessed, semi-static data like public persona profiles to reduce database load and improve response times.
