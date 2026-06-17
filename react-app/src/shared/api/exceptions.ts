export class HttpException extends Error {
  public readonly status: number;
  public readonly url: string;
  public readonly method: string;
  public readonly body?: unknown;

  constructor(status: number, url: string, method: string, body?: unknown, message?: string) {
    super(message ?? `[${method}] ${status} ${url}`);

    this.status = status;
    this.url = url;
    this.method = method;
    this.body = body;

    this.name = "HttpException";
  }
}

export class BadRequestException extends HttpException {
  constructor(url: string, method: string, body?: unknown, message?: string) {
    super(400, url, method, body, message ? message : `[${method}] 400 Bad Request: ${url}`);
    this.name = "BadRequestException";
  }
}
export class NotFoundException extends HttpException {
  constructor(url: string, method: string, body?: unknown, message?: string) {
    super(404, url, method, body, message ? message : `[${method}] 404 Not Found: ${url}`);

    this.name = "NotFoundException";
  }
}
export class InternalServerException extends HttpException {
  constructor(url: string, method: string, body?: unknown, message?: string) {
    super(500, url, method, body, message ? message : `[${method}] 500 Internal Server Error: ${url}`);
    this.name = "InternalServerException";
  }
}
export class TimeoutException extends HttpException {
  constructor(url: string, method: string, body?: unknown, message?: string) {
    super(504, url, method, body, message ? message : `[${method}] 504 Gateway Timeout: ${url}`);

    this.name = "TimeoutException";
  }
}

export class RequestCancelledException extends HttpException {
  constructor(url: string, method: string, body?: unknown, message?: string) {
    super(499, url, method, body, message ? message : `[${method}] Request Cancelled: ${url}`);

    this.name = "RequestCancelledException";
  }
}
