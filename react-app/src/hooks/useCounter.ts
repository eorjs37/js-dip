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
