"""Basic tests for core services."""
import pytest
from uuid import uuid4
from unittest.mock import MagicMock, patch
from app.core.services import AuthService, SurveyService, PersonaService
from app.core.models import User, Survey


@pytest.fixture
def mock_db():
    """Create a mock database session."""
    return MagicMock()


class TestAuthService:
    """Tests for AuthService."""

    def test_get_or_create_user_new_user(self, mock_db):
        """Test creating a new user."""
        service = AuthService(mock_db)

        # Mock the repository to return None for get_by_google_id and return a user for create
        mock_user = User(
            id=uuid4(),
            google_id="123456",
            email="test@example.com",
            display_name="Test User",
        )
        service.user_repo.get_by_google_id = MagicMock(return_value=None)
        service.user_repo.create = MagicMock(return_value=mock_user)

        user = service.get_or_create_user("123456", "test@example.com", "Test User")

        assert user.google_id == "123456"
        assert user.email == "test@example.com"
        service.user_repo.create.assert_called_once()

    def test_get_or_create_user_existing_user(self, mock_db):
        """Test getting an existing user."""
        service = AuthService(mock_db)

        mock_user = User(
            id=uuid4(),
            google_id="123456",
            email="test@example.com",
        )
        service.user_repo.get_by_google_id = MagicMock(return_value=mock_user)

        user = service.get_or_create_user("123456", "test@example.com")

        assert user.google_id == "123456"
        service.user_repo.create.assert_not_called()


class TestSurveyService:
    """Tests for SurveyService."""

    def test_create_survey(self, mock_db):
        """Test creating a survey."""
        service = SurveyService(mock_db)

        user_id = uuid4()
        mock_survey = Survey(id=uuid4(), user_id=user_id, is_active=True)
        service.survey_repo.create = MagicMock(return_value=mock_survey)

        result = service.create_survey(user_id)

        assert "survey_id" in result
        assert "survey_url" in result
        service.survey_repo.create.assert_called_once_with(user_id)


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
