# React APP

## React Custom Hook

```
React에서 Custom Hook(커스텀 훅) 은
여러 컴포넌트에서 반복되는 상태(state) 및 로직을 재사용하기 위해 만드는 함수

React의 기본 Hook(useState, useEffect 등)을 조합해서 직접 만드는 Hook이라고 생각하면 된다.
```

### useCounter를 통해 CustomHook 배우기

```typescript
// useCounter.ts
import { useState } from "react";

function useCounter(initialValue = 0) {
  const [counter, setCounter] = useState<number>(initialValue);

  const increase = () => setCounter((prev) => prev + 1);
  const decrease = () =>
    setCounter((prev) => {
      if (prev > 0) return prev - 1;
      return 0;
    });
  const reset = () => setCounter(initialValue);
  return {
    counter,
    increase,
    decrease,
    reset,
  };
}

export default useCounter;
```

```tsx
// User.tsx
import useCounter from "../hooks/useCounter";
function Home() {
  const { counter, increase, decrease, reset } = useCounter(0);
  return (
    <div className="container">
      카운터 커스텀 훅<p>값:{counter}</p>
      <button onClick={increase}>더하기</button>
      <button onClick={decrease}>빼기</button>
      <button onClick={reset}>리셋</button>
    </div>
  );
}

export default Home;
```

### useCounter를 둠으로써 이점

- 상태 관리 로직을 재사용할 수 있다
- 로직 재사용
- 컴포넌트가 깔끔해짐
- 관심사 분리

### useForm.ts

```
Form Validation(폼 검증) 하는 커스텀 훅
```

```typescript
import { useState } from "react";
type Errors<T> = {
  [K in keyof T]?: string;
};
// 확장성을 위해 제네릭으로 선언
function useForm<T>(initialValues: T, validate: (values: T) => Errors<T>) {
  const [values, setValues] = useState<T>(initialValues);

  const [errors, setErrors] = useState<Errors<T>>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (callback: (values: T) => void) => {
    const validationErrors = validate(values);

    setErrors(validationErrors);

    const hasError = Object.keys(validationErrors).length > 0;

    if (!hasError) {
      callback(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}
export default useForm;
```

```tsx
// 커스텀 훅을 통해
import useForm from "../hooks/useForm";

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
  const onSubmit = (values: LoginForm) => {
    console.log(values);
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
```
