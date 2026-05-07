import { authService } from "./auth-service.js";
import { NetworkError, UnauthorizedError } from "./errors/error.js";

const loginBtn = document.querySelector("button#loginBtn");
const email = document.querySelector("input#email");
const password = document.querySelector("input#password");
function validate() {
  if (!email.value || !password.value) {
    throw new Error("값을 입력해주세요");
  }
}

loginBtn.addEventListener("click", async () => {
  try {
    validate();
    await authService.login(email.value, password.value);
    alert("로그인 성공");
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      alert("로그인 실패");
      return;
    }
    if (error instanceof NetworkError) {
      alert("네트워크 오류");
      return;
    }
    alert(error.message);
  }
});
