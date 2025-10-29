export class HttpError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

export async function http<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);
  if (!response.ok) {
    const message = await safeParseError(response);
    throw new HttpError(message, response.status);
  }

  return response.json() as Promise<T>;
}

async function safeParseError(response: Response): Promise<string> {
  try {
    const data = await response.json();
    if (typeof data === 'string') {
      return data;
    }

    if (typeof data?.message === 'string') {
      return data.message;
    }
  } catch (error) {
    // ignore parsing error
  }

  return `Falha na requisição (${response.status})`;
}
