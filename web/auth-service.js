import { post } from "./app-client.js";

export const authService = {
  async login(email, password) {
    return await post("http://localhost:3000/login");
  },
};
