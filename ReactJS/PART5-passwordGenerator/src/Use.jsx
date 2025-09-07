import { useState, useEffect, useCallback } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  // 🔴 Normal function = rebuilt every render
  const normalFn = () => count;

  // 🟢 Stable function = preserved across renders
  const stableFn = useCallback(() => count, [count]);

  // Just logging their identities
  useEffect(() => {
    console.log("stableFn identity:", stableFn);
  }, [count,stableFn]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Function Identity Demo</h1>
      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <br /><br />

      <button onClick={() => console.log("normalFn returns:", normalFn())}>
        Call Normal Fn
      </button>
      <button onClick={() => console.log("stableFn returns:", stableFn())}>
        Call Stable Fn
      </button>
    </div>
  );
}
