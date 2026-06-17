import useForm from "../hooks/useForm";
import useLogin from "../hooks/useLogin";
type LoginForm = {
  email: string;
  password: string;
};
const initialValues: LoginForm = {
  email: "",
  password: "",
};
const validate = (values: LoginForm) => {
  const errors: Partial<LoginForm> = {};

  if (!values.email) {
    errors.email = "이메일 입력";
  }

  if (values.password.length < 6) {
    errors.password = "6자 이상";
  }

  return errors;
};
function Login() {
  const { values, errors, handleChange, handleSubmit } = useForm(initialValues, validate);
  const { login } = useLogin();
  const onSubmit = async (values: LoginForm) => {
    try {
      await login(values.email, values.password);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("알 수 없는 오류");
      }
    }
  };

  function handleLogin() {
    handleSubmit(onSubmit);
  }
  return (
    <>
      <label>이메일</label>
      <input type="email" name="email" value={values.email} onChange={handleChange} />
      <p>{errors?.email}</p>

      <label>패스워드</label>
      <input type="password" name="password" value={values.password} onChange={handleChange} />
      <p>{errors?.password}</p>
      <button onClick={handleLogin}>로그인</button>
    </>
  );
}

export default Login;
