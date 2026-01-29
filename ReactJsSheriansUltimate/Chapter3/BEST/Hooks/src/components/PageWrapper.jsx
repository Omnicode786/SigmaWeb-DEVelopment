import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PageWrapper = ({ children, title, bgColor, technicalBrief, advantage }) => {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", { opacity: 0, y: -50, duration: 1, ease: "back.out" });
      gsap.from(".glass-panel", { scale: 0.9, opacity: 0, duration: 1.2, delay: 0.3 });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="page-container" style={{ backgroundColor: bgColor, minHeight: '200vh' }}>
      {/* SECTION 1: THE INTERACTIVE EXPERIENCE */}
      <section style={{ height: '100vh', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        <h1 className="hero-text" style={{ fontSize: '5rem', color: '#fff', margin: 0 }}>{title}</h1>
        <div className="glass-panel" style={{ 
          backgroundColor: 'rgba(255,255,255,0.85)', 
          backdropFilter: 'blur(15px)', 
          padding: '3rem', 
          borderRadius: '40px', 
          flex: 1,
          boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          {children}
        </div>
      </section>

      {/* SECTION 2: THE "ASLI KAHANI" (Technical Deep Dive) */}
      <section style={{ 
        height: '100vh', 
        padding: '5rem', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.05)' 
      }}>
        <div style={{ maxWidth: '900px' }}>
          <h2 style={{ fontSize: '3rem', color: '#fff' }}>Actually, yeh hai kya? 🤔</h2>
          <p style={{ fontSize: '1.8rem', color: '#fff', lineHeight: '1.4' }}>{technicalBrief}</p>
          
          <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '20px' }}>
              <h3>Zabardast Advantage</h3>
              <p>{advantage}</p>
            </div>
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '20px' }}>
              <h3>Pro Tip</h3>
              <p>Hamesha dependencies array ka khayal rakhein, warna infinite loop apka wait kar raha hai!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageWrapper;