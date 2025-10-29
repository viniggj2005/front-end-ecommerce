import { Link, NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Início', to: '/' },
  { name: 'Produtos', to: '/admin/products' },
  { name: 'Carrinho', to: '/cart' },
];

const Header = () => {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-semibold text-primary">
          123Foods
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition-colors hover:text-primary ${isActive ? 'text-primary' : ''}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
