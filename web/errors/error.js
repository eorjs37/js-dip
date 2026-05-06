export class AppError extends Error {
  constructor(message) {
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
