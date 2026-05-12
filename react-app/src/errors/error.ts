export class AppError extends Error {
  constructor(message: string) {
    super(message);
  }
}
export class UnauthorizedError extends AppError {
  constructor() {
    super("로그인이 필요합니다");
  }
}
export class NetworkError extends AppError {
  constructor() {
    super("네트워크 오류");
  }
}
export class UnknownError extends AppError {
  constructor() {
    super("알 수 없는 오류가 발생했습니다.");
  }
}
