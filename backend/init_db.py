#!/usr/bin/env python3
"""Database initialization script for Re:MirAI backend."""

import os
import sys
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Add the app directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from app.core.database import Base
from app.core.models import Quest
from app.config import get_settings

def init_database():
    """Initialize database with tables and seed data."""
    settings = get_settings()
    
    # Create engine
    engine = create_engine(settings.database_url, echo=True)
    
    # Create all tables
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✓ Tables created successfully!")
    
    # Create session for seeding data
    Session = sessionmaker(bind=engine)
    session = Session()
    
    try:
        # Seed initial quest data
        print("Seeding initial quest data...")
        
        initial_quests = [
            Quest(
                id="break-the-ice",
                title="Break the Ice",
                description="Say 'hello' to your Persona for the first time.",
                reward_type="memory_crystals",
                reward_amount=10,
                is_active=True
            ),
            Quest(
                id="heart-to-heart",
                title="Heart to Heart",
                description="Have a meaningful conversation with your Persona (send 5 messages).",
                reward_type="memory_crystals", 
                reward_amount=25,
                is_active=True
            ),
            Quest(
                id="share-the-magic",
                title="Share the Magic",
                description="Share your Persona's profile with someone special.",
                reward_type="memory_crystals",
                reward_amount=50,
                is_active=True
            ),
            Quest(
                id="ritual-master",
                title="Ritual Master", 
                description="Create your first summoning ritual.",
                reward_type="memory_crystals",
                reward_amount=30,
                is_active=True
            ),
            Quest(
                id="friendship-bonds",
                title="Friendship Bonds",
                description="Get 3 friends to participate in your ritual.",
                reward_type="memory_crystals",
                reward_amount=75,
                is_active=True
            ),
            Quest(
                id="persona-whisperer",
                title="Persona Whisperer",
                description="Reach bond level 2 with your Persona.",
                reward_type="memory_crystals",
                reward_amount=100,
                is_active=True
            ),
            Quest(
                id="social-butterfly",
                title="Social Butterfly",
                description="Check compatibility with another user's Persona.",
                reward_type="memory_crystals",
                reward_amount=40,
                is_active=True
            ),
            Quest(
                id="mystery-solver",
                title="Mystery Solver",
                description="Complete a practice ritual to unlock your inner self.",
                reward_type="memory_crystals",
                reward_amount=15,
                is_active=True
            )
        ]
        
        # Check if quests already exist
        existing_quest_ids = {q.id for q in session.query(Quest).all()}
        new_quests = [q for q in initial_quests if q.id not in existing_quest_ids]
        
        if new_quests:
            session.add_all(new_quests)
            session.commit()
            print(f"✓ Added {len(new_quests)} new quests!")
        else:
            print("✓ Quest data already exists, skipping...")
            
    except Exception as e:
        print(f"❌ Error seeding data: {e}")
        session.rollback()
        raise
    finally:
        session.close()
    
    print("🎉 Database initialization completed successfully!")

def reset_database():
    """Reset database by dropping and recreating all tables."""
    settings = get_settings()
    engine = create_engine(settings.database_url, echo=True)
    
    print("⚠️  Dropping all tables...")
    Base.metadata.drop_all(bind=engine)
    print("✓ Tables dropped!")
    
    init_database()

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Initialize Re:MirAI database")
    parser.add_argument("--reset", action="store_true", help="Reset database (drop and recreate)")
    args = parser.parse_args()
    
    if args.reset:
        confirm = input("Are you sure you want to reset the database? This will DELETE ALL DATA! (y/N): ")
        if confirm.lower() == 'y':
            reset_database()
        else:
            print("Reset cancelled.")
    else:
        init_database()
