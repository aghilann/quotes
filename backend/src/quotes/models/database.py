"""
SQLAlchemy ORM models for database tables.
These define the database schema and relationships.
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from src.quotes.core.database import Base


class Quote(Base):
    """SQLAlchemy model for quotes table"""
    __tablename__ = "quotes"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(Text, nullable=False)
    author = Column(String(255), nullable=True)
    category = Column(String(100), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    def __repr__(self):
        return f"<Quote(id={self.id}, text='{self.text[:50]}...', author='{self.author}')>"
