"""
Service layer for user business logic.
This layer handles all the business logic and database operations for users.
"""
from datetime import datetime
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import and_
from src.quotes.models.database import User as UserModel
from src.quotes.api.schemas import User, UserCreate, UserUpdate


class UserService:
    """Service class for user operations"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def create_user(self, user_data: UserCreate) -> User:
        """Create a new user"""
        db_user = UserModel(
            name=user_data.name,
            email=user_data.email
        )
        
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        
        return self._convert_to_pydantic(db_user)
    
    def get_users(
        self, 
        page: int = 1, 
        per_page: int = 10, 
        name: Optional[str] = None, 
        email: Optional[str] = None
    ) -> tuple[List[User], int]:
        """Get users with pagination and filtering"""
        
        # Build query with filters
        query = self.db.query(UserModel)
        
        if name:
            query = query.filter(UserModel.name.ilike(f"%{name}%"))
        
        if email:
            query = query.filter(UserModel.email.ilike(f"%{email}%"))
        
        # Get total count
        total = query.count()
        
        # Apply pagination
        offset = (page - 1) * per_page
        db_users = query.offset(offset).limit(per_page).all()
        
        # Convert to Pydantic models
        users = [self._convert_to_pydantic(u) for u in db_users]
        
        return users, total
    
    def get_user_by_id(self, user_id: int) -> Optional[User]:
        """Get a specific user by ID"""
        db_user = self.db.query(UserModel).filter(UserModel.id == user_id).first()
        
        if not db_user:
            return None
        
        return self._convert_to_pydantic(db_user)
    
    def get_user_by_email(self, email: str) -> Optional[User]:
        """Get a specific user by email"""
        db_user = self.db.query(UserModel).filter(UserModel.email == email).first()
        
        if not db_user:
            return None
        
        return self._convert_to_pydantic(db_user)
    
    def update_user(self, user_id: int, user_update: UserUpdate) -> Optional[User]:
        """Update a specific user"""
        db_user = self.db.query(UserModel).filter(UserModel.id == user_id).first()
        
        if not db_user:
            return None
        
        # Update fields if provided
        if user_update.name is not None:
            db_user.name = user_update.name
        if user_update.email is not None:
            db_user.email = user_update.email
        
        # Commit changes
        self.db.commit()
        self.db.refresh(db_user)
        
        return self._convert_to_pydantic(db_user)
    
    def delete_user(self, user_id: int) -> Optional[User]:
        """Delete a specific user"""
        db_user = self.db.query(UserModel).filter(UserModel.id == user_id).first()
        
        if not db_user:
            return None
        
        # Convert to Pydantic model before deletion
        user = self._convert_to_pydantic(db_user)
        
        # Delete from database
        self.db.delete(db_user)
        self.db.commit()
        
        return user
    
    def _convert_to_pydantic(self, db_user: UserModel) -> User:
        """Convert SQLAlchemy model to Pydantic model"""
        return User(
            id=db_user.id,
            name=db_user.name,
            email=db_user.email,
            created_at=db_user.created_at,
            updated_at=db_user.updated_at
        )
