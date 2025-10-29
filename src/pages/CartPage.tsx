import PageContainer from '../components/layout/PageContainer';

const CartPage = () => {
  return (
    <PageContainer>
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Seu carrinho está vazio</h1>
        <p className="mt-3 text-sm text-slate-500">
          Adicione produtos à sua sacola e acompanhe os itens selecionados por aqui.
        </p>
      </div>
    </PageContainer>
  );
};

export default CartPage;
