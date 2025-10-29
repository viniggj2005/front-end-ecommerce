import type { PropsWithChildren } from 'react';

const PageContainer = ({ children }: PropsWithChildren) => {
  return (
    <main className="mx-auto min-h-[calc(100vh-120px)] w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {children}
    </main>
  );
};

export default PageContainer;
