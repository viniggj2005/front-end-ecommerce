import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';

const NotFoundPage = () => {
  return (
    <PageContainer>
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Página não encontrada</h1>
        <p className="mt-3 text-sm text-slate-500">
          O endereço acessado não existe ou foi removido.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </PageContainer>
  );
};

export default NotFoundPage;
