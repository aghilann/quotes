"""
SQLAlchemy ORM models for database tables.
These define the database schema and relationships.
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from src.quotes.core.database import Base


class User(Base):
    """SQLAlchemy model for users table"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationship to quotes
    quotes = relationship("Quote", back_populates="user")

    def __repr__(self):
        return f"<User(id={self.id}, name='{self.name}', email='{self.email}')>"


class Quote(Base):
    """SQLAlchemy model for quotes table"""
    __tablename__ = "quotes"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(Text, nullable=False)
    category = Column(String(100), nullable=True)
    author = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationship to user
    user = relationship("User", back_populates="quotes")

    def __repr__(self):
        return f"<Quote(id={self.id}, text='{self.text[:50]}...', user_id={self.user_id})>"
