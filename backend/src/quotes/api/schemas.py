from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    """Base user model with common fields"""
    name: str
    email: EmailStr


class UserCreate(UserBase):
    """Input model for creating a user"""
    pass


class UserUpdate(BaseModel):
    """Input model for updating a user"""
    name: Optional[str] = None
    email: Optional[EmailStr] = None


class User(UserBase):
    """Output model for user responses"""
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class QuoteBase(BaseModel):
    """Base quote model with common fields"""
    text: str
    category: Optional[str] = None
    author: int


class QuoteCreate(QuoteBase):
    """Input model for creating a quote"""
    pass


class QuoteUpdate(BaseModel):
    """Input model for updating a quote"""
    text: Optional[str] = None
    category: Optional[str] = None
    author: Optional[int] = None


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


class UserResponse(BaseModel):
    """Standard response wrapper for users"""
    success: bool
    message: str
    data: Optional[User] = None


class UsersListResponse(BaseModel):
    """Response wrapper for lists of users"""
    success: bool
    message: str
    data: list[User]
    total: int
    page: int
    per_page: int


class HealthCheckResponse(BaseModel):
    """Health check response model"""
    status: str
    timestamp: datetime
    version: str
