import { authService } from "./auth-service.js";
import { NetworkError, UnauthorizedError } from "./errors/error.js";

const loginBtn = document.querySelector("button#loginBtn");

loginBtn.addEventListener("click", async () => {
  try {
    await authService.login("test@test.com", "1234");
    alert("로그인 성공");
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      alert("로그인 실패");
      return;
    }
    if (error instanceof NetworkError) {
      alert("네트워크 오류");
    }
    alert(error.message);
  }
});
