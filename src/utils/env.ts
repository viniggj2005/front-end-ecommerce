const FALLBACK_API_URL = 'http://localhost:3000';

export const getApiBaseUrl = (): string => {
  const url = import.meta.env.VITE_API_BASE_URL ?? FALLBACK_API_URL;
  return url.endsWith('/') ? url.slice(0, -1) : url;
};
