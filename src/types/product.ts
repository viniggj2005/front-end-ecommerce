export interface ProductImage {
  id: number;
  path: string;
  alt?: string | null;
}

export interface CategorySummary {
  id: number;
  name: string;
  offer?: number | null;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  brand?: string;
  stock?: number;
  images?: ProductImage[];
  categories?: CategorySummary[];
  offer?: number | null;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface ProductFilters {
  search?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
}
