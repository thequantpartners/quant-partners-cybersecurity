import React, { useState, useEffect, useCallback, useRef } from "react";

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#';
    this.queue = [];
    this.frame = 0;
    this.frameRequest = 0;
    this.resolve = () => {};
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span class="text-signals opacity-70">${char}</span>`;
      } else {
        output += from;
      }
    }
    
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

const ScrambledTitle = () => {
  const elementRef = useRef(null);
  const scramblerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (elementRef.current && !scramblerRef.current) {
      scramblerRef.current = new TextScramble(elementRef.current);
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (mounted && scramblerRef.current) {
      const phrases = [
        'VULNERABILIDADES CRÍTICAS',
        'FALLO ESTRUCTURAL DETECTADO',
        'DEPENDENCIA EXTERNA ACTIVA',
        'TU SISTEMA ESTÁ EXPUESTO'
      ];
      
      let counter = 0;
      const next = () => {
        if (scramblerRef.current) {
          scramblerRef.current.setText(phrases[counter]).then(() => {
            setTimeout(next, 3000);
          });
          counter = (counter + 1) % phrases.length;
        }
      };

      next();
    }
  }, [mounted]);

  return (
    <span 
      ref={elementRef}
      className="text-signals text-glow uppercase block mt-2 whitespace-normal break-words text-2xl sm:text-3xl md:text-5xl lg:text-6xl"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      VULNERABILIDADES CRÍTICAS
    </span>
  );
}

const Hero = ({ onStartScan }) => {
  const [characters, setCharacters] = useState([]);
  const [activeIndices, setActiveIndices] = useState(new Set());

  const createCharacters = useCallback(() => {
    const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    const charCount = 300;
    const newCharacters = [];

    for (let i = 0; i < charCount; i++) {
      newCharacters.push({
        char: allChars[Math.floor(Math.random() * allChars.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: 0.1 + Math.random() * 0.3,
      });
    }

    return newCharacters;
  }, []);

  useEffect(() => {
    setCharacters(createCharacters());
  }, [createCharacters]);

  useEffect(() => {
    const updateActiveIndices = () => {
      const newActiveIndices = new Set();
      const numActive = Math.floor(Math.random() * 3) + 3;
      for (let i = 0; i < numActive; i++) {
        newActiveIndices.add(Math.floor(Math.random() * characters.length));
      }
      setActiveIndices(newActiveIndices);
    };

    const flickerInterval = setInterval(updateActiveIndices, 50);
    return () => clearInterval(flickerInterval);
  }, [characters.length]);

  useEffect(() => {
    let animationFrameId;

    const updatePositions = () => {
      setCharacters(prevChars => 
        prevChars.map(char => ({
          ...char,
          y: char.y + char.speed,
          ...(char.y >= 100 && {
            y: -5,
            x: Math.random() * 100,
            char: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"[
              Math.floor(Math.random() * "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?".length)
            ],
          }),
        }))
      );
      animationFrameId = requestAnimationFrame(updatePositions);
    };

    animationFrameId = requestAnimationFrame(updatePositions);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const executeDiagnostic = () => {
    if (onStartScan) onStartScan();
  };

  return (
    <section className="relative w-full h-screen bg-background overflow-hidden flex flex-col justify-center items-start pt-20">
      
      {/* Raining Characters Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {characters.map((char, index) => (
          <span
            key={index}
            className={`absolute transition-colors duration-100 ${
              activeIndices.has(index)
                ? "text-signals z-10 font-bold animate-pulse text-2xl md:text-3xl"
                : "text-gray-800 font-light text-xl md:text-2xl"
            }`}
            style={{
              left: `${char.x}%`,
              top: `${char.y}%`,
              transform: `translate(-50%, -50%) ${activeIndices.has(index) ? 'scale(1.25)' : 'scale(1)'}`,
              textShadow: activeIndices.has(index) 
                ? '0 0 8px rgba(0, 255, 136, 0.8), 0 0 12px rgba(0, 255, 136, 0.4)' 
                : 'none',
              opacity: activeIndices.has(index) ? 1 : 0.6,
              willChange: 'transform, top',
            }}
          >
            {char.char}
          </span>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 drop-shadow-lg leading-tight">
          Tu sistema de adquisición tiene 
          <ScrambledTitle />
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-12 font-mono drop-shadow-md">
          Tu tecnología es de élite, pero tu arquitectura comercial es un colador de papel. Estás perdiendo contratos Enterprise hoy mismo porque operas tu adquisición como un vendedor aficionado, no como un operador logístico.
        </p>
        
        <div className="text-sm font-mono text-gray-400 mb-8 border-l-2 border-signals pl-4 uppercase tracking-widest backdrop-blur-sm bg-background/30 max-w-fit pr-4 py-2">
          <p>No es falta de leads.</p>
          <p className="text-white mt-1">Es insolvencia técnica en la captación.</p>
        </div>
        
        <button 
          onClick={executeDiagnostic}
          className="group relative px-6 md:px-8 py-4 bg-background/80 backdrop-blur-sm border border-signals text-signals font-mono font-bold uppercase tracking-widest text-xs md:text-base whitespace-nowrap hover:bg-signals hover:text-background transition-all duration-300"
        >
          [ Ejecutar diagnóstico ]
          <span className="absolute inset-0 border border-signals scale-[1.05] opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></span>
        </button>
      </div>
    </section>
  );
};

export default Hero;
