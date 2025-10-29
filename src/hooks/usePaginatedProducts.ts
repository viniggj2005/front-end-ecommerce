import { useCallback, useEffect, useMemo, useState } from 'react';
import { HttpError } from '../utils/http';
import { getApiBaseUrl } from '../utils/env';
import type { PaginatedResponse, Product, ProductFilters } from '../types/product';

export interface UsePaginatedProductsOptions {
  pageSize?: number;
  initialFilters?: ProductFilters;
}

export interface UsePaginatedProductsResult {
  data: PaginatedResponse<Product> | null;
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  filters: ProductFilters;
  setPage: (page: number) => void;
  setFilters: (filters: ProductFilters) => void;
  refetch: () => void;
}

export const usePaginatedProducts = (
  options?: UsePaginatedProductsOptions,
): UsePaginatedProductsResult => {
  const pageSize = options?.pageSize ?? 12;
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<ProductFilters>(options?.initialFilters ?? {});
  const [data, setData] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  const fetchProducts = useCallback(
    async (abortSignal: AbortSignal) => {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });

      if (filters.search?.trim()) {
        params.set('search', filters.search.trim());
      }

      if (typeof filters.categoryId === 'number') {
        params.set('categoryId', String(filters.categoryId));
      }

      if (typeof filters.minPrice === 'number') {
        params.set('minPrice', String(filters.minPrice));
      }

      if (typeof filters.maxPrice === 'number') {
        params.set('maxPrice', String(filters.maxPrice));
      }

      try {
        const response = await fetch(`${getApiBaseUrl()}/products?${params.toString()}`, {
          signal: abortSignal,
        });

        if (!response.ok) {
          const message = await response.text();
          throw new HttpError(message || 'Erro ao carregar produtos', response.status);
        }

        const payload = (await response.json()) as PaginatedResponse<Product>;
        setData(payload);
      } catch (cause) {
        if ((cause as Error).name === 'AbortError') {
          return;
        }

        const message = cause instanceof HttpError ? cause.message : 'Falha ao carregar produtos';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [filters, page, pageSize],
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchProducts, refreshIndex]);

  const totalPages = useMemo(() => data?.totalPages ?? 0, [data]);
  const totalItems = useMemo(() => data?.totalItems ?? 0, [data]);

  const safeSetPage = useCallback(
    (nextPage: number) => {
      setPage((previous) => {
        if (nextPage < 1) {
          return previous;
        }

        if (data?.totalPages && nextPage > data.totalPages) {
          return data.totalPages;
        }

        return nextPage;
      });
    },
    [data?.totalPages],
  );

  const safeSetFilters = useCallback((nextFilters: ProductFilters) => {
    setFilters(nextFilters);
    setPage(1);
  }, []);

  const refetch = useCallback(() => {
    setRefreshIndex((value) => value + 1);
  }, []);

  return {
    data,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    totalItems,
    filters,
    setPage: safeSetPage,
    setFilters: safeSetFilters,
    refetch,
  };
};
