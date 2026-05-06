import { NetworkError, UnauthorizedError } from "./errors/error.js";

export async function post(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      throw new UnauthorizedError();
    }

    if (!response.ok) {
      throw new NetworkError();
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    if (e instanceof UnauthorizedError) {
      throw e;
    }

    throw new NetworkError();
  }
}
