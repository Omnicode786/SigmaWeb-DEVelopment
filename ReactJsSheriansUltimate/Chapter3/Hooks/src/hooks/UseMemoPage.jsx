import React, { useState, useMemo } from 'react';
import PageWrapper from '../components/PageWrapper';

/*
  ============================================================
  📖 LECTURE NOTES: RATTA NAHI LAGANA!
  ============================================================

  Hamara brain kitna smart he?
  Agar mein apse poochun: "2 + 2 kya hota he?" Aap forun bolo ge "4".
  Agar mein 10 second baad dobara poochun, to kya aap calculator nikalo ge?
  Nahi na! Aap ko "Yaad" he.
  
  useMemo yahi karta he.
  Agar koi calculation bohot bhari (expensive) he — jaise 1 se 1 billion tak loop chalana — 
  to React har re-render pe wo loop dobara chalaye ga. Pagal he kya?
  
  useMemo kehta he: "Bhai, mein purana result yaad rakhta hun. 
  Jab tak input change nahi hota, mein dobara mehnat nahi karun ga."

  Expensive Calculation = Bhari Pathar.
  useMemo = Forklift jo pathar utha ke side pe rakh deti he.
  ============================================================
*/

const UseMemoPage = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const expensiveCalculation = (num) => {
    console.log("🏃‍♂️ Bhari kaam ho raha he...");
    for(let i=0; i < 1000000000; i++) {} // Fake delay
    return num * 2;
  };

  // Memoize it!
  const memoizedValue = useMemo(() => expensiveCalculation(count), [count]);

  return (
    <PageWrapper title="useMemo" bgColor="#badc58">
      <div>
        <h2>Value: {memoizedValue}</h2>
        <button onClick={() => setCount(count + 1)}>Increase Count</button>
        
        <div style={{ marginTop: '2rem' }}>
          <input 
            type="text" 
            onChange={(e) => setText(e.target.value)} 
            placeholder="Type here..." 
            style={{ padding: '1rem' }}
          />
          <p>Agar aap yahan type karo ge, expensive calculation dobara NAHI chalegi! 🧠</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default UseMemoPage;