import { useState } from "react";
import { loginService } from "../services/login.service";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await loginService.login(email, password);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    login,
  };
}

export default useLogin;
