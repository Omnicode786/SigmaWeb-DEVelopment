import React, { useRef } from 'react';
import PageWrapper from '../components/PageWrapper';

/*
  ============================================================
  📖 LECTURE NOTES: THE SPY IN THE DOM
  ============================================================

  Suno, React chahta he ke sab kuch uske raste (Virtual DOM) se ho kar jaye.
  Lekin kabhi kabhi hamein "Direct Attack" karna parta he.
  
  Normal Variable: Component re-render hota he to variable reset ho jata he.
  State Variable: Component re-render hota he (Truck chalti he).
  Ref (useRef): Yeh aik aisi tijori he jo render ke darmiyan values yaad rakhti he,
               LEKIN jab yeh badalti he, to UI re-render NAHI hoti.
  
  Asli Use Case? 
  DOM Elements ko pakarna! 
  
  Document.querySelector use kar sakte hain? Bilkul! 
  Lekin React ka tareeka 'useRef' he. Yeh aik pointer he.
  "Oye input field! Idhar dekh!" — useRef ne usko pakar lia.
  ============================================================
*/

const UseRefPage = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    // Direct DOM manipulation through the Ref
    inputRef.current.focus();
    inputRef.current.style.backgroundColor = "#fff9fb";
    inputRef.current.placeholder = "Focus ho gaya jaani!";
    console.log(inputRef.current.value)
  };


  return (
    <PageWrapper title="useRef" bgColor="#7bdff2">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <h3>Directly grabbing the DOM 🕵️‍♂️</h3>
        
        <input 
          ref={inputRef}
          type="text" 
          placeholder="Yahan kuch likho..." 
          style={{
            padding: '1.5rem',
            borderRadius: '15px',
            border: '4px solid #fff',
            fontSize: '1.5rem',
            width: '60%'
          }}
        />

        <button 
          onClick={focusInput}
          style={{ backgroundColor: '#2d3436', color: 'white' }}
        >
          Click to Focus Target!
        </button>

        <p style={{ maxWidth: '600px', textAlign: 'center' }}>
          Hum ne React ko bypass nahi kia, hum ne React se "Permission" li 
          ke "Bhai mujhe is input ka reference de do, mein ne focus karwana he."
        </p>
      </div>
    </PageWrapper>
  );
};

export default UseRefPage;