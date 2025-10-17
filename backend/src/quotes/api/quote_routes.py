from typing import Optional
from fastapi import APIRouter, HTTPException, Query, Depends
from sqlalchemy.orm import Session
from src.quotes.core.database import get_db
from src.quotes.services.quotes import QuoteService
from src.quotes.api.schemas import QuoteCreate, QuoteUpdate, QuoteResponse, QuotesListResponse

router = APIRouter(prefix="/quotes", tags=["quotes"])


@router.post("/", response_model=QuoteResponse, status_code=201)
async def create_quote(quote: QuoteCreate, db: Session = Depends(get_db)):
    """Create a new quote"""
    
    service = QuoteService(db)
    created_quote = service.create_quote(quote)
    
    return QuoteResponse(
        success=True,
        message="Quote created successfully",
        data=created_quote
    )


@router.get("/", response_model=QuotesListResponse)
async def get_quotes(
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(10, ge=1, le=100, description="Items per page"),
    category: Optional[str] = Query(None, description="Filter by category"),
    author: Optional[int] = Query(None, description="Filter by author ID"),
    db: Session = Depends(get_db)
):
    """Get all quotes with pagination and filtering"""
    
    service = QuoteService(db)
    quotes, total = service.get_quotes(page, per_page, category, author)
    
    return QuotesListResponse(
        success=True,
        message=f"Retrieved {len(quotes)} quotes",
        data=quotes,
        total=total,
        page=page,
        per_page=per_page
    )


@router.get("/{quote_id}", response_model=QuoteResponse)
async def get_quote(quote_id: int, db: Session = Depends(get_db)):
    """Get a specific quote by ID"""
    
    service = QuoteService(db)
    quote = service.get_quote_by_id(quote_id)
    
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    
    return QuoteResponse(
        success=True,
        message="Quote retrieved successfully",
        data=quote
    )


@router.put("/{quote_id}", response_model=QuoteResponse)
async def update_quote(quote_id: int, quote_update: QuoteUpdate, db: Session = Depends(get_db)):
    """Update a specific quote"""
    
    service = QuoteService(db)
    updated_quote = service.update_quote(quote_id, quote_update)
    
    if not updated_quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    
    return QuoteResponse(
        success=True,
        message="Quote updated successfully",
        data=updated_quote
    )


@router.delete("/{quote_id}", response_model=QuoteResponse)
async def delete_quote(quote_id: int, db: Session = Depends(get_db)):
    """Delete a specific quote"""
    
    service = QuoteService(db)
    deleted_quote = service.delete_quote(quote_id)
    
    if not deleted_quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    
    return QuoteResponse(
        success=True,
        message="Quote deleted successfully",
        data=deleted_quote
    )
