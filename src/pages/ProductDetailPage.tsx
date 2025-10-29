import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import type { Product } from '../types/product';
import { getApiBaseUrl } from '../utils/env';
import { HttpError } from '../utils/http';

const buildImageUrl = (path: string) => {
  return path.startsWith('http')
    ? path
    : `${getApiBaseUrl()}${path.startsWith('/') ? '' : '/'}${path}`;
};

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setError('Produto não encontrado.');
      return;
    }

    const controller = new AbortController();

    const loadProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${getApiBaseUrl()}/products/${productId}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          const message = await response.text();
          throw new HttpError(message || 'Erro ao carregar produto', response.status);
        }

        const payload = (await response.json()) as Product;
        setProduct(payload);
      } catch (cause) {
        if ((cause as Error).name === 'AbortError') {
          return;
        }

        const message = cause instanceof HttpError ? cause.message : 'Falha ao carregar produto';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();

    return () => controller.abort();
  }, [productId]);

  const coverImageUrl = useMemo(() => {
    if (!product?.images?.[0]) {
      return null;
    }

    return buildImageUrl(product.images[0].path);
  }, [product?.images]);

  return (
    <PageContainer>
      {loading && <p className="text-sm text-slate-500">Carregando produto...</p>}
      {error && <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</p>}

      {product && (
        <div className="grid gap-10 lg:grid-cols-[1.2fr,1fr]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl bg-white shadow">
              {coverImageUrl ? (
                <img
                  src={coverImageUrl}
                  alt={product.images?.[0]?.alt ?? product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex aspect-square items-center justify-center text-sm text-slate-400">
                  Sem imagem
                </div>
              )}
            </div>
            <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-800">Descrição</h2>
              <p className="text-sm leading-relaxed text-slate-600">
                {product.description ?? 'Nenhuma descrição fornecida.'}
              </p>
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-primary/70">Produto</p>
              <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
              {product.brand && <p className="text-sm text-slate-500">Marca: {product.brand}</p>}
              <p className="text-2xl font-semibold text-primary">
                {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
              <button
                type="button"
                className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                Adicionar ao carrinho
              </button>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-800">Categorias</h2>
              {product.categories && product.categories.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {product.categories.map((category) => (
                    <li
                      key={category.id}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500">Nenhuma categoria informada.</p>
              )}
            </div>
          </aside>
        </div>
      )}
    </PageContainer>
  );
};

export default ProductDetailPage;
