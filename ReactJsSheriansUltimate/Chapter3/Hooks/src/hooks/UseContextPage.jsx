import React, { createContext, useContext, useState } from 'react';
import PageWrapper from '../components/PageWrapper';

/*
  ============================================================
  📖 LECTURE NOTES: WIRELESS DATA TRANSFER
  ============================================================

  Bhai, Prop Drilling kya hoti he?
  App -> Page -> Section -> Component -> Button.
  
  Data App ke paas he, lekin chahiye Button ko. 
  Ab kya hum har raste mein "Rishwat" (Props) dete jayen ge? Nahi!
  
  useContext aik "Global Tower" ki tarah he. 📡
  App Tower pe data laga deti he. 
  Ab chahe koi bhi component ho, wo apna radio on kare (useContext) 
  aur data catch kar le. 
  
  No middle-man. No drilling. Direct connection!
  ============================================================
*/

const ThemeContext = createContext();

const ThemeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button 
      onClick={() => setTheme(theme === '🌞' ? '🌙' : '🌞')}
      style={{ fontSize: '3rem', padding: '2rem' }}
    >
      Current Mood: {theme}
    </button>
  );
};

const UseContextPage = () => {
  const [theme, setTheme] = useState('🌞');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <PageWrapper title="useContext" bgColor="#f9ca24">
        <div style={{ textAlign: 'center' }}>
          <h2>Prop Drilling ko kaho Bye-Bye! 👋</h2>
          <div style={{ margin: '4rem', padding: '2rem', border: '5px dashed white', borderRadius: '30px' }}>
             <ThemeButton />
          </div>
          <p>Ye button aik nested component he, lekin is ne data direct Tower (Provider) se lia he!</p>
        </div>
      </PageWrapper>
    </ThemeContext.Provider>
  );
};

export default UseContextPage;