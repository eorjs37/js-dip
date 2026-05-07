import { mapHttpError, mapUnknownError } from "./errors/error-mapper.js";
import { AppError, NetworkError, UnauthorizedError, UnknownError } from "./errors/error.js";

export async function post(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const error = mapHttpError(response);
    if (error) {
      throw error;
    }
    return await response.json();
  } catch (e) {
    throw mapUnknownError(e);
  }
}
