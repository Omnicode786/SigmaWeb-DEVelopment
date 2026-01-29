import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExplanationBubble = ({ title, content, color, x, y }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        drag
        dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
        whileHover={{ scale: 1.1, cursor: 'pointer' }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), ${color})`,
          boxShadow: `0 10px 30px ${color}66, inset 0 0 20px rgba(255,255,255,0.5)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          zIndex: 10,
          backdropFilter: 'blur(5px)',
          border: '2px solid rgba(255,255,255,0.6)'
        }}
      >
        <span style={{ fontWeight: '800', fontSize: '1.2rem', color: '#fff' }}>{title}</span>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{
              position: 'absolute',
              top: '20%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              background: 'rgba(20, 20, 20, 0.95)',
              padding: '2rem',
              borderRadius: '25px',
              zIndex: 100,
              color: 'white',
              border: `2px solid ${color}`
            }}
          >
            <h3 style={{ color: color, marginTop: 0 }}>{title} 🧐</h3>
            <p style={{ whiteSpace: 'pre-line', fontSize: '1.1rem' }}>{content}</p>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ marginTop: '1rem', padding: '10px 20px', background: color, border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Samajh aa gaya boss!
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExplanationBubble;