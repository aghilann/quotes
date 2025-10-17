from fastapi import Request
from fastapi.responses import RedirectResponse
from sqladmin import Admin, ModelView, action
from src.quotes.core.database import engine
from src.quotes.models.database import Quote


class QuoteAdmin(ModelView, model=Quote):
    column_list = [Quote.id, Quote.text, Quote.author, Quote.category, Quote.created_at]
    column_searchable_list = [Quote.text, Quote.author, Quote.category]
    column_sortable_list = [Quote.id, Quote.author, Quote.category, Quote.created_at]
    form_columns = [Quote.text, Quote.author, Quote.category]
    
    @action(name="print_selected", label="Print Selected Quotes")
    async def print_selected_quotes(self, request: Request):
        print("Print selected quotes action executed!")
        
        # Redirect back to the admin page after action
        return RedirectResponse(url="/admin/quote/list", status_code=302)


def setup_admin(app):
    """Setup SQLAdmin for the FastAPI application"""
    admin = Admin(app, engine)
    admin.add_view(QuoteAdmin)
    return admin
