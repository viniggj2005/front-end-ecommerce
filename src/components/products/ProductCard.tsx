import type { Product } from '../../types/product';
import { getApiBaseUrl } from '../../utils/env';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const coverImage = product.images?.[0];
  const coverImageUrl = coverImage
    ? coverImage.path.startsWith('http')
      ? coverImage.path
      : `${getApiBaseUrl()}${coverImage.path.startsWith('/') ? '' : '/'}${coverImage.path}`
    : null;

  const highestDiscount =
    product.offer ??
    product.categories?.reduce((max, category) => {
      const offer = category.offer ?? 0;
      return offer > max ? offer : max;
    }, 0) ?? 0;

  const hasDiscount = highestDiscount > 0;
  const discountedPrice = hasDiscount
    ? product.price * (1 - highestDiscount / 100)
    : product.price;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        {coverImageUrl ? (
          <img
            src={coverImageUrl}
            alt={coverImage?.alt ?? product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Sem imagem
          </div>
        )}
        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            -{highestDiscount}%
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="line-clamp-2 text-base font-semibold text-slate-800">{product.name}</h3>
          {product.brand && <p className="text-sm text-slate-500">{product.brand}</p>}
        </div>
        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            {hasDiscount && (
              <span className="text-sm text-slate-400 line-through">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            )}
            <span className="text-lg font-semibold text-primary">
              {discountedPrice.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onAddToCart?.(product)}
          className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
