import React from 'react';
import { Check, X } from 'lucide-react';

const ResultsFilter = () => {
  return (
    <section className="w-full bg-[#020202] py-32 px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Resultado: Exposición a Control */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Pasas de exposición <br/><span className="text-signals text-glow">a control absoluto.</span>
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="text-signals bg-signals/10 p-2 border border-signals/30 h-fit">
                <Check size={20} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1 text-gray-200">Flujo de señales estructurado</h4>
                <p className="font-mono text-sm text-gray-500">Auditoría continua de cuentas objetivo. No dependes de variables externas o suerte.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-signals bg-signals/10 p-2 border border-signals/30 h-fit">
                <Check size={20} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1 text-gray-200">Reducción de incertidumbre</h4>
                <p className="font-mono text-sm text-gray-500">El margen de error humano en prospección desaparece mediante filtros asimétricos.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-signals bg-signals/10 p-2 border border-signals/30 h-fit">
                <Check size={20} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1 text-gray-200">Previsibilidad de Intent</h4>
                <p className="font-mono text-sm text-gray-500">Solo inviertes tiempo en C-Levels que demostraron señales matemáticas de interés.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtro: Descalificación */}
        <div className="flex-1 bg-[#050505] border border-structure p-8 md:p-12 relative scanline">
          <div className="absolute top-0 right-0 p-4 font-mono text-xs text-red-500">
            [ FIREWALL ACTIVE ]
          </div>
          
          <h3 className="text-2xl font-bold uppercase tracking-widest mb-2">No operamos con todos.</h3>
          <p className="font-mono text-gray-500 mb-8 max-w-sm">
            Este sistema requiere capacidad de asimilación. Aplicamos reglas estrictas de exclusión.
          </p>
          
          <ul className="space-y-4 font-mono text-sm">
            <li className="flex items-center gap-3 text-gray-400 group">
              <X size={18} className="text-red-500 group-hover:scale-110 transition-transform" />
              <span>No Startups en Early Stage.</span>
            </li>
            <li className="flex items-center gap-3 text-gray-400 group">
              <X size={18} className="text-red-500 group-hover:scale-110 transition-transform" />
              <span>No empresas sin capacidad técnica de cierre.</span>
            </li>
            <li className="flex items-center gap-3 text-gray-400 group">
              <X size={18} className="text-red-500 group-hover:scale-110 transition-transform" />
              <span>No para probar "qué funciona".</span>
            </li>
            <li className="flex items-center gap-3 text-gray-400 group">
              <X size={18} className="text-red-500 group-hover:scale-110 transition-transform" />
              <span>Ticket mínimo requerido de comercialización: <span className="text-white">$30K+</span></span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default ResultsFilter;
