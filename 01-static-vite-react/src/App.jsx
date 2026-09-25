import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      boxSizing: 'border-box'
    }}>
      <div style={{
        background: '#111111',
        border: '1px solid #222222',
        borderRadius: '16px',
        padding: '2.5rem',
        maxWidth: '520px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.8)'
      }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(0, 112, 243, 0.1)',
          color: '#0070f3',
          border: '1px solid rgba(0, 112, 243, 0.3)',
          borderRadius: '9999px',
          padding: '0.3rem 0.8rem',
          fontSize: '0.8rem',
          fontWeight: 700,
          marginBottom: '1rem'
        }}>
          ⚡ Static Web (MinIO S3 CDN)
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
          React + Vite SPA
        </h1>
        <p style={{ color: '#888888', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          Built by Java Build Server, deployed to MinIO S3 Object Storage, and served via Go Reverse Proxy.
        </p>

        <button
          onClick={() => setCount((c) => c + 2)}
          style={{
            background: '#ffffff',
            color: '#000000',
            border: 'none',
            borderRadius: '8px',
            padding: '0.65rem 1.4rem',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          Count is: {count}
        </button>
      </div>
    </div>
  );
}
