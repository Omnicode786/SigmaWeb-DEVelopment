import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';

/*
  ============================================================
  📖 LECTURE NOTES: THE "SIDE-WALI-CYCLE" CONCEPT
  ============================================================

  Suno mere bhai/behan, useEffect ko samajhne ke liye 
  aik tasavvur karo (imagine karo):

  Bari si road he — Yeh hamari React Application ki main highway he.
  Is road pe aik bari truck chal rahi he — Yeh React ki UI Rendering he.
  Truck ka kaam simple he: "State change hui? Chalo bhai, UI dobara paint karo!"

  Lekin zindagi mein sirf truck nahi chalani hoti. 
  Kabhi kabhi hum kehte hain:
  "Bhai, truck to chalti rahegi, lekin side pe aik aur kaam bhi chalana he."

  useEffect = Side-wali cycle 🚲
  
  Yeh cycle truck ko disturb nahi karti. Truck (UI) apna kaam karti rehti he,
  lekin cycle apna alag raasta bana leti he. 

  KAAM KAB KARTI HE?
  1. Empty Array [] : Cycle tab chalti he jab road pehli baar banti he. 
     (Component Mount).
  
  2. With Dependencies [count] : Jab jab truck ka petrol (count) badle ga,
     cycle dobara race lagaye gi.
  
  3. No Array : Yeh to har waqt hi chalti rehti he, truck ke peeche peeche. 
     (Be careful with this one, engine garam ho jaye ga!)

  CLEANUP FUNCTION (Wapsi ka rasta):
  Jab aap road band karte ho (Component unmount), to cycle ko park karna zaroori he.
  Varna memory leak ho jaye ga, aur browser kahe ga "Yaar kya khichdi paka di!"

  Samjhe meri jaan ke tote? Side by side process chalega!
  ============================================================
*/

const UseEffectPage = () => {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState("Resting...");

  useEffect(() => {
    // Side wala kaam shuru!
    setStatus(" Cycle chal rahi he... (Effect Triggered)");
    
    const timer = setTimeout(() => {
        setStatus(" Cycle ne apna kaam kar lia!");
    }, 2000);

    // Cleanup: Jab component khatam ho, to timer bhi khatam karo
    return () => clearTimeout(timer);
  }, [count]); // Sirf tab chalega jab 'count' update hoga

  return (
    <PageWrapper title="useEffect" bgColor="#b79ced">
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ color: '#6c5ce7' }}>Side Effects ki Kahani</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
            Aap ne button dabaya, count barha (Main Truck). <br />
            Lekin peeche background mein jo notification aya ya data fetch hua... 
            wo <strong>useEffect</strong> tha (Side Cycle).
          </p>

          <div style={{ margin: '2rem 0', padding: '1rem', background: '#fff', borderRadius: '15px' }}>
            <h3 style={{ margin: 0 }}>Current Status:</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ff85a2' }}>{status}</p>
          </div>

          <button 
            onClick={() => setCount(count + 1)}
            style={{ backgroundColor: '#ff85a2', color: 'white', fontSize: '1.2rem' }}
          >
            Add Count: {count}
          </button>
        </div>

        <div style={{ 
          flex: 1, 
          background: '#2d3436', 
          color: '#fab1a0', 
          padding: '2rem', 
          borderRadius: '20px',
          fontFamily: 'monospace'
        }}>
          <p>// React code snippet</p>
          <p style={{ color: '#ffeaa7' }}>
            useEffect(() ={'>'} {'{'} <br />
            &nbsp;&nbsp;console.log("Cycle is running!"); <br />
            {'}'}, [count]);
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default UseEffectPage;