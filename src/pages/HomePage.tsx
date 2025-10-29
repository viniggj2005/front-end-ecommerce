import { useMemo } from 'react';
import PageContainer from '../components/layout/PageContainer';
import ProductFilters from '../components/products/ProductFilters';
import ProductGrid from '../components/products/ProductGrid';
import Pagination from '../components/pagination/Pagination';
import { useCategories } from '../hooks/useCategories';
import { usePaginatedProducts } from '../hooks/usePaginatedProducts';

const HomePage = () => {
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const {
    data,
    loading,
    error,
    page,
    totalPages,
    filters,
    setFilters,
    setPage,
  } = usePaginatedProducts({ pageSize: 12 });

  const products = useMemo(() => data?.items ?? [], [data]);

  return (
    <PageContainer>
      <section className="mb-10 rounded-3xl bg-gradient-to-r from-primary to-secondary p-10 text-white shadow-lg">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-white/70">Bem-vindo à 123Foods</p>
          <h1 className="text-3xl font-bold sm:text-4xl">Compre com descontos exclusivos e entrega rápida</h1>
          <p className="text-white/80">
            Explore nossa seleção de produtos, filtre por categorias e encontre as melhores ofertas para o seu dia a dia.
          </p>
        </div>
      </section>

      <div className="space-y-6">
        <ProductFilters filters={filters} categories={categories} onChange={setFilters} />

        {categoriesLoading && (
          <p className="text-sm text-slate-500">Carregando categorias...</p>
        )}
        {categoriesError && (
          <p className="text-sm text-red-500">{categoriesError}</p>
        )}

        {error && <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</p>}

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-2xl border border-slate-200 bg-white"
              >
                <div className="h-1/2 rounded-t-2xl bg-slate-100" />
                <div className="space-y-3 p-4">
                  <div className="h-4 w-2/3 rounded bg-slate-200" />
                  <div className="h-4 w-1/2 rounded bg-slate-200" />
                  <div className="h-10 w-full rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ProductGrid products={products} />
        )}

        <div className="flex justify-center pt-4">
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} disabled={loading} />
        </div>
      </div>
    </PageContainer>
  );
};

export default HomePage;
