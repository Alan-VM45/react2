export interface Product {
  id: number;
  title: string;
  image?: string | null;
  description?: string | null;
  price: number;
  category: string;
  stock: number;
  top: boolean;
  suggestions: number[];
}

export interface CategoryOption {
  id?: number;
  name: string;
}

export interface CreateProductPayload {
  title: string;
  image: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  top: boolean;
  suggestions: number[];
}

const API_BASE = '/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...init,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error((data && typeof data === 'object' && 'error' in data ? String(data.error) : 'Error en la solicitud'));
  }

  return data as T;
}

export const productsApi = {
  async getProducts(filters?: { search?: string; category?: string }) {
    const params = new URLSearchParams();

    if (filters?.search) params.set('search', filters.search);
    if (filters?.category) params.set('category', filters.category);

    const query = params.toString();
    return request<Product[]>(`/products${query ? `?${query}` : ''}`);
  },

  async getProductById(id: string | number) {
    return request<Product>(`/products/${id}`);
  },

  async getCategories() {
    return request<CategoryOption[]>('/categories');
  },

  async createProduct(payload: CreateProductPayload) {
    return request<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
