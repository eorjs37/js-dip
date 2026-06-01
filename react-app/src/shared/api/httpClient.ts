import {
  BadRequestException,
  HttpException,
  InternalServerException,
  NotFoundException,
  RequestCancelledException,
  TimeoutException,
} from "./exceptions";

const BASE_URL = import.meta.env.VITE_API_URL;
const DEFAULT_TIMEOUT = 10_000;
type RequestOptions = Omit<RequestInit, "body"> & {
  query?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  signal?: AbortSignal;
};
function createHttpException(status: number, url: string, method: string, body?: unknown) {
  switch (status) {
    case 400:
      return new BadRequestException(url, method, body);

    case 404:
      return new NotFoundException(url, method, body);

    case 500:
      return new InternalServerException(url, method, body);

    default:
      return new HttpException(status, url, method, body);
  }
}
async function request<T>(url: string, options?: RequestOptions): Promise<T> {
  const { query, body, headers, ...rest } = options || {};

  const queryString = query ? `?${new URLSearchParams(query).toString()}` : "";
  const method = options?.method ?? "GET";
  const controller = new AbortController();
  const externalSignal = options?.signal;
  const timeoutId = window.setTimeout(() => {
    controller.abort("timeout");
  }, options?.timeout ?? DEFAULT_TIMEOUT);
  const abort = () => {
    controller.abort("cancel");
  };
  externalSignal?.addEventListener("abort", abort);
  try {
    const response = await fetch(`${BASE_URL}${url}${queryString}`, {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw createHttpException(response.status, url, method, body);
    }

    return response.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      if (externalSignal?.aborted) {
        throw new RequestCancelledException(url, method, body);
      }
      throw new TimeoutException(url, method, body);
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
    externalSignal?.removeEventListener("abort", abort);
  }
}

export const httpClient = {
  get: <T>(url: string, options?: RequestOptions) =>
    request<T>(url, {
      ...options,
      method: "GET",
    }),

  post: <T>(url: string, body?: unknown, options?: RequestOptions) =>
    request<T>(url, {
      ...options,
      method: "POST",
      body,
    }),

  put: <T>(url: string, body?: unknown, options?: RequestOptions) =>
    request<T>(url, {
      ...options,
      method: "PUT",
      body,
    }),

  patch: <T>(url: string, body?: unknown, options?: RequestOptions) =>
    request<T>(url, {
      ...options,
      method: "PATCH",
      body,
    }),

  delete: <T>(url: string, options?: RequestOptions) =>
    request<T>(url, {
      ...options,
      method: "DELETE",
    }),
};
