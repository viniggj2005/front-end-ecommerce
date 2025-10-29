const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} 123Foods. Todos os direitos reservados.</p>
        <div className="flex gap-4">
          <a href="/privacy" className="hover:text-primary">
            Privacidade
          </a>
          <a href="/terms" className="hover:text-primary">
            Termos
          </a>
          <a href="mailto:contato@123foods.com" className="hover:text-primary">
            Contato
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
