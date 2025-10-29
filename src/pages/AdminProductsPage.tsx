import PageContainer from '../components/layout/PageContainer';
import Pagination from '../components/pagination/Pagination';
import { usePaginatedProducts } from '../hooks/usePaginatedProducts';

const AdminProductsPage = () => {
  const { data, loading, error, page, totalPages, setPage, refetch } = usePaginatedProducts({
    pageSize: 20,
  });

  const products = data?.items ?? [];

  return (
    <PageContainer>
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900">Gerenciamento de produtos</h1>
        <p className="text-sm text-slate-500">
          A paginação é controlada pelo backend. Utilize os controles para navegar entre as páginas.
        </p>
      </div>

      {error && <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</p>}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                ID
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Nome
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Marca
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Preço
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Estoque
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-500">
                  Carregando produtos...
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-500">#{product.id}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-700">{product.name}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-500">{product.brand ?? '-'}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-500">
                    {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-500">{product.stock ?? '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={refetch}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          Atualizar
        </button>
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} disabled={loading} />
      </div>
    </PageContainer>
  );
};

export default AdminProductsPage;
