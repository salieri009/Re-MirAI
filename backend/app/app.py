"""Main Chalice application entry point."""
from chalice import Chalice, Response, AuthResponse
from app.core.database import SessionLocal, engine, Base
from app.config import get_settings

# Create database tables
Base.metadata.create_all(bind=engine)

app = Chalice(app_name="re-mirai-backend")
settings = get_settings()


@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint."""
    return {"status": "healthy"}


# Import route handlers
from app.routes import auth, ritual, personas, users, quests, social

# Routes are auto-discovered from the imported modules


if __name__ == "__main__":
    app.run()
