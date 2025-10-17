export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Quote {
  id: number;
  text: string;
  category?: string;
  author: number;
  created_at: string;
  updated_at: string;
}

export interface QuoteCreate {
  text: string;
  category?: string;
  author: number;
}

export interface UserCreate {
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ApiListResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  total: number;
  page: number;
  per_page: number;
}
