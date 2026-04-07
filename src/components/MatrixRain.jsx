import React, { useState, useEffect, useCallback } from 'react';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

const MatrixRain = () => {
  const [characters, setCharacters] = useState([]);
  const [activeIndices, setActiveIndices] = useState(new Set());

  const createCharacters = useCallback(() => {
    return Array.from({ length: 300 }, () => ({
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.1 + Math.random() * 0.3,
    }));
  }, []);

  useEffect(() => {
    setCharacters(createCharacters());
  }, [createCharacters]);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = new Set();
      const count = Math.floor(Math.random() * 3) + 3;
      for (let i = 0; i < count; i++) {
        next.add(Math.floor(Math.random() * 300));
      }
      setActiveIndices(next);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let rafId;
    const tick = () => {
      setCharacters(prev =>
        prev.map(c => ({
          ...c,
          y: c.y >= 100 ? -5 : c.y + c.speed,
          ...(c.y >= 100 && {
            x: Math.random() * 100,
            char: CHARS[Math.floor(Math.random() * CHARS.length)],
          }),
        }))
      );
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {characters.map((c, i) => (
        <span
          key={i}
          className={`absolute transition-colors duration-100 ${
            activeIndices.has(i)
              ? 'text-signals font-bold animate-pulse text-xl md:text-3xl'
              : 'text-gray-800 font-light text-lg md:text-2xl'
          }`}
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            transform: `translate(-50%, -50%) ${activeIndices.has(i) ? 'scale(1.25)' : 'scale(1)'}`,
            textShadow: activeIndices.has(i)
              ? '0 0 8px rgba(0,255,136,0.8), 0 0 12px rgba(0,255,136,0.4)'
              : 'none',
            opacity: activeIndices.has(i) ? 1 : 0.6,
            willChange: 'transform, top',
          }}
        >
          {c.char}
        </span>
      ))}
    </div>
  );
};

export default MatrixRain;
