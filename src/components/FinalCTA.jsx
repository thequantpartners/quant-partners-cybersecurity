import React from 'react';

const FinalCTA = ({ onApply }) => {
  return (
    <section className="w-full bg-[#030303] py-32 px-6 border-t border-structure text-center relative flex flex-col items-center justify-center min-h-[60vh]">
      <div className="max-w-3xl mx-auto z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Tú mismo estás saboteando <br/>
          <span className="text-red-500 glow-red">tus finanzas al aferrarte a procesos comerciales rotos.</span>
        </h2>
        
        <p className="text-xl text-gray-400 font-mono mb-12 max-w-2xl mx-auto">
          Cada hora que pasa sin la infraestructura de Quant es lucro cesante masivo. Es tu responsabilidad fiduciaria detener el sangrado táctico hoy mismo.
        </p>

        <button 
          onClick={onApply}
          className="group relative px-8 py-4 bg-[#111111] border border-signals text-signals font-mono font-bold uppercase tracking-widest hover:bg-signals hover:text-background transition-all duration-300"
        >
          <span className="relative z-10">[ Ver si calificas ]</span>
          <span className="absolute inset-0 border border-signals scale-[1.03] opacity-0 group-hover:opacity-100 group-hover:border-white transition-all duration-300"></span>
        </button>
        
        <div className="mt-6 flex items-center justify-center gap-2 font-mono text-xs text-gray-500 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
          Acceso estrictamente limitado
        </div>
      </div>
      
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.5)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none"></div>
    </section>
  );
};

export default FinalCTA;
