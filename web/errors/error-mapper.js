import { AppError, UnauthorizedError } from "./error.js";

const errorMap = {
  400: () => new AppError("존재하지 않는 회원입니다"),
  401: () => new UnauthorizedError(),
};

export function mapHttpError(response) {
  const createError = errorMap[response.status];
  if (createError) {
    return createError();
  }

  if (!response.ok) {
    return new NetworkError();
  }

  return null;
}

export function mapUnknownError(error) {
  if (error instanceof AppError) {
    return error;
  }

  return new UnknownError();
}
