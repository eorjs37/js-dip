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
