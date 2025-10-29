# 123Foods Front-end

Aplicação front-end reconstruída com [Vite](https://vitejs.dev/), [React](https://react.dev/) e [TypeScript](https://www.typescriptlang.org/), utilizando [Tailwind CSS](https://tailwindcss.com/) para estilização. A listagem de produtos foi adaptada para trabalhar com paginação no backend.

## Pré-requisitos

- Node.js 18+
- npm 9+

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

O servidor padrão será iniciado em `http://localhost:5173`.

## Build de produção

```bash
npm run build
```

## Preview da build

```bash
npm run preview
```

## Variáveis de ambiente

| Variável             | Descrição                                               | Padrão                  |
| -------------------- | -------------------------------------------------------- | ----------------------- |
| `VITE_API_BASE_URL`  | URL base do backend que fornece os recursos de produtos | `http://localhost:3000` |

Crie um arquivo `.env` (ou `.env.local`) com a variável acima para apontar para seu backend.

## Paginação no backend

A listagem de produtos (`Home` e `Admin > Produtos`) consome o endpoint `/products` enviando os parâmetros `page` e `pageSize`, além dos filtros opcionais (`search`, `categoryId`, `minPrice`, `maxPrice`). O backend deve retornar um objeto no formato:

```json
{
  "items": [
    {
      "id": 1,
      "name": "Produto",
      "price": 19.9
    }
  ],
  "page": 1,
  "pageSize": 12,
  "totalItems": 120,
  "totalPages": 10
}
```

Esses metadados alimentam o componente de paginação Tailwind, garantindo sincronização com a API.
