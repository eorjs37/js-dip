import * as loginApi from "../shared/api/login/login.api";
type LoginApi = typeof loginApi;
class LoginService {
  private readonly api: LoginApi;
  constructor(api: LoginApi = loginApi) {
    this.api = api;
  }

  async login(email: string, password: string) {
    return await this.api.login(email, password);
  }
}

export const loginService = new LoginService();
