"""
Service layer for business logic.
This layer handles all the business logic and database operations.
"""
from datetime import datetime
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import and_
from src.quotes.models.database import Quote as QuoteModel
from src.quotes.api.schemas import Quote, QuoteCreate, QuoteUpdate


class QuoteService:
    """Service class for quote operations"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def create_quote(self, quote_data: QuoteCreate) -> Quote:
        """Create a new quote"""
        db_quote = QuoteModel(
            text=quote_data.text,
            author=quote_data.author,
            category=quote_data.category
        )
        
        self.db.add(db_quote)
        self.db.commit()
        self.db.refresh(db_quote)
        
        return self._convert_to_pydantic(db_quote)
    
    def get_quotes(
        self, 
        page: int = 1, 
        per_page: int = 10, 
        category: Optional[str] = None, 
        author: Optional[str] = None
    ) -> tuple[List[Quote], int]:
        """Get quotes with pagination and filtering"""
        
        # Build query with filters
        query = self.db.query(QuoteModel)
        
        if category:
            query = query.filter(QuoteModel.category == category)
        
        if author:
            query = query.filter(QuoteModel.author == author)
        
        # Get total count
        total = query.count()
        
        # Apply pagination
        offset = (page - 1) * per_page
        db_quotes = query.offset(offset).limit(per_page).all()
        
        # Convert to Pydantic models
        quotes = [self._convert_to_pydantic(q) for q in db_quotes]
        
        return quotes, total
    
    def get_quote_by_id(self, quote_id: int) -> Optional[Quote]:
        """Get a specific quote by ID"""
        db_quote = self.db.query(QuoteModel).filter(QuoteModel.id == quote_id).first()
        
        if not db_quote:
            return None
        
        return self._convert_to_pydantic(db_quote)
    
    def update_quote(self, quote_id: int, quote_update: QuoteUpdate) -> Optional[Quote]:
        """Update a specific quote"""
        db_quote = self.db.query(QuoteModel).filter(QuoteModel.id == quote_id).first()
        
        if not db_quote:
            return None
        
        # Update fields if provided
        if quote_update.text is not None:
            db_quote.text = quote_update.text
        if quote_update.author is not None:
            db_quote.author = quote_update.author
        if quote_update.category is not None:
            db_quote.category = quote_update.category
        
        # Commit changes
        self.db.commit()
        self.db.refresh(db_quote)
        
        return self._convert_to_pydantic(db_quote)
    
    def delete_quote(self, quote_id: int) -> Optional[Quote]:
        """Delete a specific quote"""
        db_quote = self.db.query(QuoteModel).filter(QuoteModel.id == quote_id).first()
        
        if not db_quote:
            return None
        
        # Convert to Pydantic model before deletion
        quote = self._convert_to_pydantic(db_quote)
        
        # Delete from database
        self.db.delete(db_quote)
        self.db.commit()
        
        return quote
    
    def _convert_to_pydantic(self, db_quote: QuoteModel) -> Quote:
        """Convert SQLAlchemy model to Pydantic model"""
        return Quote(
            id=db_quote.id,
            text=db_quote.text,
            author=db_quote.author,
            category=db_quote.category,
            created_at=db_quote.created_at,
            updated_at=db_quote.updated_at
        )
