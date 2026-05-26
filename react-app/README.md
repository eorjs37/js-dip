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
