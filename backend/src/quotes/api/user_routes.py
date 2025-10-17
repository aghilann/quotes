from typing import Optional
from fastapi import APIRouter, HTTPException, Query, Depends
from sqlalchemy.orm import Session
from src.quotes.core.database import get_db
from src.quotes.services.users import UserService
from src.quotes.api.schemas import UserCreate, UserUpdate, UserResponse, UsersListResponse

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/", response_model=UserResponse, status_code=201)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    """Create a new user"""
    
    service = UserService(db)
    
    # Check if user with email already exists
    existing_user = service.get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists")
    
    created_user = service.create_user(user)
    
    return UserResponse(
        success=True,
        message="User created successfully",
        data=created_user
    )


@router.get("/", response_model=UsersListResponse)
async def get_users(
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(10, ge=1, le=100, description="Items per page"),
    name: Optional[str] = Query(None, description="Filter by name"),
    email: Optional[str] = Query(None, description="Filter by email"),
    db: Session = Depends(get_db)
):
    """Get all users with pagination and filtering"""
    
    service = UserService(db)
    users, total = service.get_users(page, per_page, name, email)
    
    return UsersListResponse(
        success=True,
        message=f"Retrieved {len(users)} users",
        data=users,
        total=total,
        page=page,
        per_page=per_page
    )


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    """Get a specific user by ID"""
    
    service = UserService(db)
    user = service.get_user_by_id(user_id)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return UserResponse(
        success=True,
        message="User retrieved successfully",
        data=user
    )


@router.put("/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)):
    """Update a specific user"""
    
    service = UserService(db)
    
    # Check if user exists
    existing_user = service.get_user_by_id(user_id)
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Check if email is being updated and if it already exists
    if user_update.email:
        user_with_email = service.get_user_by_email(user_update.email)
        if user_with_email and user_with_email.id != user_id:
            raise HTTPException(status_code=400, detail="User with this email already exists")
    
    updated_user = service.update_user(user_id, user_update)
    
    return UserResponse(
        success=True,
        message="User updated successfully",
        data=updated_user
    )


@router.delete("/{user_id}", response_model=UserResponse)
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    """Delete a specific user"""
    
    service = UserService(db)
    deleted_user = service.delete_user(user_id)
    
    if not deleted_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return UserResponse(
        success=True,
        message="User deleted successfully",
        data=deleted_user
    )
