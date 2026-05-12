import useCounter from "../hooks/useCounter";

function Home() {
  const { count, increase, decrease, reset } = useCounter(0);
  return (
    <div className="container">
      홈 페이지
      <h1>{count}</h1>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
      <button onClick={reset}>reset</button>
    </div>
  );
}

export default Home;
