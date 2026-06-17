import { httpClient } from "../httpClient";

export function login(email: string, password: string) {
  return httpClient.post("/login", {
    email,
    password,
  });
}
