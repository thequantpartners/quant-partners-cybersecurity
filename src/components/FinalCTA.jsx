import React from 'react';
import { useAudio } from '../hooks/useAudio';
import { AudioVisualizer } from './AudioVisualizer';

const FinalCTA = ({ onApply }) => {
  const { isFinished } = useAudio("/audio/cta.mp3");

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-5 duration-500 mt-[-5vh]">
      <div className="z-10 bg-[#0a0a0a] border border-red-900/50 p-8 md:p-14 shadow-[0_0_50px_rgba(255,0,0,0.05)] relative w-full overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        
        <h2 className="text-2xl md:text-4xl font-bold mb-6 font-mono uppercase tracking-tight">
          Tú mismo estás saboteando <br className="hidden md:block"/>
          <span className="text-red-500">tus finanzas.</span>
        </h2>
        
        <p className="text-sm md:text-base text-gray-400 font-mono mb-10 max-w-xl mx-auto leading-relaxed border-l-2 border-structure pl-4">
          Cada hora que pasa sin la infraestructura de Quant es lucro cesante masivo. Es tu responsabilidad fiduciaria detener el sangrado táctico hoy mismo.
        </p>

        <div className="h-[96px] md:h-[116px] w-full transition-all">
          {isFinished ? (
            <button 
              onClick={onApply}
              className="group relative w-full md:w-auto mt-4 px-6 py-5 bg-[#050505] border border-signals text-signals font-mono font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-signals hover:text-background transition-all duration-300 shadow-[0_0_20px_rgba(0,255,136,0.1)] hover:shadow-[0_0_40px_rgba(0,255,136,0.4)] block mx-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                [ Iniciar Validación C-Level ]
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </span>
              <span className="absolute inset-0 border border-signals scale-[1.03] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></span>
            </button>
          ) : (
            <AudioVisualizer />
          )}
        </div>
        
        <div className="mt-8 flex items-center justify-center gap-2 font-mono text-[10px] md:text-xs text-red-500 uppercase tracking-widest opacity-80">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
          Sistema estricto de filtro
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;
