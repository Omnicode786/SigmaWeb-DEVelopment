import React from 'react';

const PageWrapper = ({ children, title, bgColor }) => {
  return (
    <div className="page-container" style={{ backgroundColor: bgColor }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: '#fff', textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}>
        {title}
      </h1>
      <div style={{ 
        backgroundColor: 'rgba(255,255,255,0.8)', 
        backdropFilter: 'blur(10px)', 
        padding: '3rem', 
        borderRadius: '30px', 
        flex: 1,
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
      }}>
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;