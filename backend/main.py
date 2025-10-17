from contextlib import asynccontextmanager
from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.quotes.api.schemas import HealthCheckResponse
from src.quotes.api.quote_routes import router as quotes_router
from src.quotes.api.user_routes import router as users_router
from src.quotes.core.database import create_tables
from src.quotes.admin.admin import setup_admin


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

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the routers
app.include_router(quotes_router)
app.include_router(users_router)

# Setup SQLAdmin
setup_admin(app)


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