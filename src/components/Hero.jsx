import React, { useState, useEffect, useRef } from "react";

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
        'TU SISTEMA ESTÁ EXPUESTO',
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
      className="text-signals text-glow uppercase block whitespace-normal break-words text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      VULNERABILIDADES CRÍTICAS
    </span>
  );
};

const Hero = () => (
  <section className="relative z-10 w-full shrink-0 pt-10 pb-3 md:pt-7 md:pb-4 text-center">
    <div className="w-full max-w-3xl mx-auto px-4">

      {/* Brand */}
      <p className="font-mono text-sm md:text-base text-signals uppercase tracking-[0.3em] mb-1 md:mb-2">
        QUANT PARTNERS
      </p>

      {/* Social proof line */}
      <p className="font-mono text-xs md:text-sm text-gray-500 mb-3 md:mb-4 leading-relaxed">
        Luego de auditar{' '}
        <span className="text-white underline underline-offset-2">+120 firmas de ciberseguridad</span>{' '}
        y cerrar contratos Enterprise por{' '}
        <span className="text-white underline underline-offset-2">+$8M USD</span>...
      </p>

      {/* Big headline */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2 md:mb-3 leading-tight">
        Tu sistema de adquisición tiene
        <ScrambledTitle />
      </h1>

      {/* Subtitle */}
      <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto mb-10 md:mb-4 font-mono leading-relaxed">
        Sin pipeline predecible, sin targeting C-Level, sin arquitectura de cierre.{' '}
        <span className="text-white">Instalamos tu sistema en 90 días</span>{' '}
        — luego es 100% tuyo y lo controlas tú.
      </p>

      {/* PASO 1 — separado de titulares, pegado al video */}
      <div className="flex flex-col items-center gap-1.5 -mb-1 md:mb-0">
        <p className="font-mono text-sm md:text-xl font-bold text-gray-300 uppercase tracking-widest">
          PASO 1:{' '}
          <span className="text-white">MIRA EL VIDEO DE DIAGNÓSTICO</span>
        </p>
        <div className="h-0.5 w-40 md:w-64 bg-gradient-to-r from-transparent via-signals to-transparent" />
      </div>

    </div>
  </section>
);

export default Hero;
