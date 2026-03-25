import React from 'react';
import { ShieldAlert } from 'lucide-react';

const SystemOverride = () => {
  return (
    <section className="w-full bg-signals text-background py-32 relative overflow-hidden">
      {/* Background tape effect */}
      <div className="absolute inset-0 opacity-10 font-mono text-[5rem] sm:text-[6rem] md:text-[10rem] font-black -rotate-3 select-none pointer-events-none flex flex-col items-center justify-center leading-[0.85]">
        <span>SYSTEM</span>
        <span>OVERRIDE</span>
      </div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center justify-center p-4 rounded-full border-2 border-background mb-8 animate-pulse">
          <ShieldAlert size={48} className="text-background" />
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tighter mb-6 uppercase w-full break-words">
          Quant <br className="block sm:hidden" /> Infrastructure™
        </h2>
        
        <p className="text-lg md:text-3xl font-mono max-w-3xl font-bold leading-relaxed">
          Diseñada para aplicar <span className="underline decoration-4 decoration-background">Hardening</span> a cada capa del proceso de adquisición.
        </p>
      </div>
    </section>
  );
};

export default SystemOverride;
