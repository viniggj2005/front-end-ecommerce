import { Fragment } from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

const range = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

const Pagination = ({ page, totalPages, onPageChange, disabled }: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const siblings = 1;

  const startPages = range(1, Math.min(2, totalPages));
  const endPages = range(Math.max(totalPages - 1, 1), totalPages);
  const middlePages = range(
    Math.max(page - siblings, 1),
    Math.min(page + siblings, totalPages),
  );

  const pages = new Map<number, true>();
  startPages.forEach((p) => pages.set(p, true));
  middlePages.forEach((p) => pages.set(p, true));
  endPages.forEach((p) => pages.set(p, true));

  const orderedPages = Array.from(pages.keys()).sort((a, b) => a - b);

  const handleClick = (targetPage: number) => {
    if (!disabled && targetPage !== page) {
      onPageChange(targetPage);
    }
  };

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Paginação">
      <button
        type="button"
        onClick={() => handleClick(page - 1)}
        disabled={disabled || page === 1}
        className="rounded-md border border-slate-300 px-3 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300"
      >
        Anterior
      </button>
      <div className="flex items-center gap-1">
        {orderedPages.map((pageNumber, index) => {
          const isActive = pageNumber === page;
          const previous = orderedPages[index - 1];
          const shouldInsertEllipsis = previous && pageNumber - previous > 1;

          return (
            <Fragment key={pageNumber}>
              {shouldInsertEllipsis && <span className="px-2 text-sm text-slate-400">...</span>}
              <button
                type="button"
                onClick={() => handleClick(pageNumber)}
                disabled={disabled}
                className={`rounded-md px-3 py-1 text-sm font-medium transition ${
                  isActive
                    ? 'bg-primary text-white shadow'
                    : 'border border-transparent text-slate-600 hover:border-slate-300 hover:bg-slate-100'
                } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
              >
                {pageNumber}
              </button>
            </Fragment>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => handleClick(page + 1)}
        disabled={disabled || page === totalPages}
        className="rounded-md border border-slate-300 px-3 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300"
      >
        Próxima
      </button>
    </nav>
  );
};

export default Pagination;
