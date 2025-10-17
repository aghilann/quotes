import type { Quote, QuoteCreate, User, UserCreate, ApiResponse, ApiListResponse } from '../types';

const API_BASE_URL = 'http://localhost:8000';

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  // Quote endpoints
  async getQuotes(page = 1, perPage = 10, category?: string, author?: number): Promise<ApiListResponse<Quote>> {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
    });
    
    if (category) params.append('category', category);
    if (author) params.append('author', author.toString());
    
    return this.request<ApiListResponse<Quote>>(`/quotes/?${params}`);
  }

  async getQuote(id: number): Promise<ApiResponse<Quote>> {
    return this.request<ApiResponse<Quote>>(`/quotes/${id}`);
  }

  async createQuote(quote: QuoteCreate): Promise<ApiResponse<Quote>> {
    return this.request<ApiResponse<Quote>>('/quotes/', {
      method: 'POST',
      body: JSON.stringify(quote),
    });
  }

  async updateQuote(id: number, quote: Partial<QuoteCreate>): Promise<ApiResponse<Quote>> {
    return this.request<ApiResponse<Quote>>(`/quotes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(quote),
    });
  }

  async deleteQuote(id: number): Promise<ApiResponse<Quote>> {
    return this.request<ApiResponse<Quote>>(`/quotes/${id}`, {
      method: 'DELETE',
    });
  }

  // User endpoints
  async getUsers(page = 1, perPage = 10, name?: string, email?: string): Promise<ApiListResponse<User>> {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
    });
    
    if (name) params.append('name', name);
    if (email) params.append('email', email);
    
    return this.request<ApiListResponse<User>>(`/users/?${params}`);
  }

  async getUser(id: number): Promise<ApiResponse<User>> {
    return this.request<ApiResponse<User>>(`/users/${id}`);
  }

  async createUser(user: UserCreate): Promise<ApiResponse<User>> {
    return this.request<ApiResponse<User>>('/users/', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  }

  async updateUser(id: number, user: Partial<UserCreate>): Promise<ApiResponse<User>> {
    return this.request<ApiResponse<User>>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    });
  }

  async deleteUser(id: number): Promise<ApiResponse<User>> {
    return this.request<ApiResponse<User>>(`/users/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
