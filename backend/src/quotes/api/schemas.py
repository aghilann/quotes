from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class QuoteBase(BaseModel):
    """Base quote model with common fields"""
    text: str
    author: Optional[str] = None
    category: Optional[str] = None


class QuoteCreate(QuoteBase):
    """Input model for creating a quote"""
    pass


class QuoteUpdate(BaseModel):
    """Input model for updating a quote"""
    text: Optional[str] = None
    author: Optional[str] = None
    category: Optional[str] = None


class Quote(QuoteBase):
    """Output model for quote responses"""
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class QuoteResponse(BaseModel):
    """Standard response wrapper for quotes"""
    success: bool
    message: str
    data: Optional[Quote] = None


class QuotesListResponse(BaseModel):
    """Response wrapper for lists of quotes"""
    success: bool
    message: str
    data: list[Quote]
    total: int
    page: int
    per_page: int


class HealthCheckResponse(BaseModel):
    """Health check response model"""
    status: str
    timestamp: datetime
    version: str
