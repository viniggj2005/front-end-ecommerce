import { useMemo } from 'react';
import type { Category } from '../../types/category';
import type { ProductFilters } from '../../types/product';

interface ProductFiltersProps {
  filters: ProductFilters;
  categories: Category[];
  onChange: (filters: ProductFilters) => void;
}

const ProductFilters = ({ filters, categories, onChange }: ProductFiltersProps) => {
  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')),
    [categories],
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-[2fr,1fr,1fr] md:items-end">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Busca
          <input
            type="search"
            placeholder="Buscar por nome ou descrição"
            value={filters.search ?? ''}
            onChange={(event) => onChange({ ...filters, search: event.target.value })}
            className="rounded-lg border-slate-300 focus:border-primary focus:ring-primary"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Categoria
          <select
            value={filters.categoryId ?? ''}
            onChange={(event) =>
              onChange({ ...filters, categoryId: event.target.value ? Number(event.target.value) : undefined })
            }
            className="rounded-lg border-slate-300 focus:border-primary focus:ring-primary"
          >
            <option value="">Todas</option>
            {sortedCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
            Preço mín.
            <input
              type="number"
              min={0}
              inputMode="decimal"
              value={filters.minPrice?.toString() ?? ''}
              onChange={(event) =>
                onChange({
                  ...filters,
                  minPrice: event.target.value ? Number(event.target.value) : undefined,
                })
              }
              className="rounded-lg border-slate-300 focus:border-primary focus:ring-primary"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
            Preço máx.
            <input
              type="number"
              min={0}
              inputMode="decimal"
              value={filters.maxPrice?.toString() ?? ''}
              onChange={(event) =>
                onChange({
                  ...filters,
                  maxPrice: event.target.value ? Number(event.target.value) : undefined,
                })
              }
              className="rounded-lg border-slate-300 focus:border-primary focus:ring-primary"
            />
          </label>
        </div>
      </div>
    </section>
  );
};

export default ProductFilters;
