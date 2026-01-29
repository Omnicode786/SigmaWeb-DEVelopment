import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';

/*
  ============================================================
  📖 LECTURE NOTES: STATE KI TABDEELI
  ============================================================

  Bhai, State kya he? 
  Imagine karo aik Magic Box 📦. 
  
  Agar is box ke andar 1 likha he, to UI pe bhi 1 dikhe ga.
  Lekin React itna "ziddi" he ke agar aap aik normal variable (let x = 1) 
  ko 2 kar do ge, to React UI change nahi kare ga. 
  
  React ko batana parta he: "Oye! Kuch badal gaya he, dobara paint kar!"
  
  useState hamein do cheezein deta he:
  1. Value (Jo box ke andar he)
  2. Setter Function (Jo purana box phaink kar naya box rakhta he)

  Counter example:
  1 is a state -> transition -> 2 is a new state.
  In states ke darmyan jo bridge he, wo useState he.

  Agar count > 0 wali logic nahi lagao ge, to subtract karte karte 
  minus mein chale jao ge — aur gari khade mein gir jaye gi! 📉
  ============================================================
*/

const UseStatePage = () => {
  const [count, setCount] = useState(0);

  return (
    <PageWrapper title="useState" bgColor="#ff85a2">
      <div style={{ textAlign: 'center', marginTop: '5vh' }}>
        <h2 style={{ fontSize: '3rem' }}>The Magic Box: {count}</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '2rem' }}>
          <button 
            onClick={() => setCount(count + 1)}
            style={{ backgroundColor: '#7bdff2', color: '#2d3436', fontSize: '2rem' }}
          >
            Phao! (+1)
          </button>

          <button 
            onClick={() => count > 0 && setCount(count - 1)}
            style={{ backgroundColor: '#f9ca24', color: '#2d3436', fontSize: '2rem' }}
          >
            Ghatao! (-1)
          </button>
        </div>

        <p style={{ marginTop: '3rem', fontSize: '1.4rem', color: '#636e72' }}>
           Jab aap button dabate ho, React "Re-render" trigger karta he. <br />
           Naya data, naya chehra! 🎭
        </p>
      </div>
    </PageWrapper>
  );
};

export default UseStatePage;