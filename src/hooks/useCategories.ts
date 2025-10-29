import { useEffect, useState } from 'react';
import type { Category } from '../types/category';
import { getApiBaseUrl } from '../utils/env';
import { HttpError } from '../utils/http';

export interface UseCategoriesResult {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export const useCategories = (): UseCategoriesResult => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${getApiBaseUrl()}/categories`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          const message = await response.text();
          throw new HttpError(message || 'Erro ao carregar categorias', response.status);
        }

        const payload = (await response.json()) as Category[];
        setCategories(payload);
      } catch (cause) {
        if ((cause as Error).name === 'AbortError') {
          return;
        }

        const message = cause instanceof HttpError ? cause.message : 'Falha ao carregar categorias';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => controller.abort();
  }, []);

  return { categories, loading, error };
};
