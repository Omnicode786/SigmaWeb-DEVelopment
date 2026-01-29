import { useCallback, useState } from "react";
import "../App.css";

export default function UseCallbackPage() {
  /*
  function ko yaad rakhna
  unnecessary re renders se bachna
  */

  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return (
    <div className="page">
      <h1>useCallback – Stable function</h1>

      <div className="comment">
        function ko yaad rakhna
        unnecessary re renders se bachna
      </div>

      <p>{count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
