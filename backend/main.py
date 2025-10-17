from contextlib import asynccontextmanager
from datetime import datetime
from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse
from sqladmin import Admin, ModelView, action
from src.quotes.api.schemas import HealthCheckResponse
from src.quotes.api.routes import router as quotes_router
from src.quotes.core.database import create_tables, engine
from src.quotes.models.database import Quote


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()
    yield


app = FastAPI(
    title="Quotes API",
    description="A simple API for managing quotes",
    version="1.0.0",
    lifespan=lifespan
)

# Include the quotes router
app.include_router(quotes_router)

# Configure SQLAdmin
admin = Admin(app, engine)

# Register models with SQLAdmin
class QuoteAdmin(ModelView, model=Quote):
    column_list = [Quote.id, Quote.text, Quote.author, Quote.category, Quote.created_at]
    column_searchable_list = [Quote.text, Quote.author, Quote.category]
    column_sortable_list = [Quote.id, Quote.author, Quote.category, Quote.created_at]
    form_columns = [Quote.text, Quote.author, Quote.category]
    
    @action(name="print_selected", label="Print Selected Quotes")
    async def print_selected_quotes(self, request: Request) :
        print("Print selected quotes action executed!")
        
        # Redirect back to the admin page after action
        return RedirectResponse(url="/admin/quote/list", status_code=302)

admin.add_view(QuoteAdmin)


@app.get("/", response_model=dict)
def read_root():
    """Root endpoint"""
    return {
        "message": "Welcome to the Quotes API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health", response_model=HealthCheckResponse)
def health_check():
    """Health check endpoint"""
    return HealthCheckResponse(
        status="healthy",
        timestamp=datetime.now(),
        version="1.0.0"
    )