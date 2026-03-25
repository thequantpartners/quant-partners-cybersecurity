import React from 'react';
import { ArrowRight, Eye, Database } from 'lucide-react';

const RealityRow = ({ perception, reality }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 border-b border-structure py-6 group hover:bg-[#080808] transition-colors">
    <div className="flex flex-col gap-2 md:pr-8">
      <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Percepción Común</span>
      <p className="text-lg text-gray-300 font-medium">"{perception}"</p>
    </div>
    
    <div className="hidden md:flex items-center justify-center -ml-4 -mr-4 text-structure group-hover:text-signals transition-colors">
      <ArrowRight size={24} />
    </div>

    <div className="flex flex-col gap-2 md:pl-8">
      <span className="text-xs font-mono text-signals uppercase tracking-wider">Arquitectura Real</span>
      <p className="text-lg text-white font-mono border-l-2 border-signals pl-4 bg-signals/5 py-2">
        {reality}
      </p>
    </div>
  </div>
);

const RealityCheck = () => {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-24">
      <div className="bg-[#050505] border border-structure p-8 md:p-12 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-depth rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>

        <div className="flex items-center justify-between mb-12 border-b border-structure pb-6">
          <div className="flex items-center gap-4 text-signals">
            <Eye size={24} />
            <h2 className="text-2xl font-bold font-mono tracking-widest uppercase">Percepción vs Realidad</h2>
          </div>
          <Database size={24} className="text-gray-600" />
        </div>

        <div className="flex flex-col">
          <RealityRow 
            perception="Necesitamos más leads." 
            reality="No existe un sistema de adquisición definido. Solo tácticas aisladas." 
          />
          <RealityRow 
            perception="Las ventas son muy inestables este trimestre." 
            reality="Alta variabilidad en la entrada de señales y dependencia de referidos." 
          />
          <RealityRow 
            perception="El equipo de ventas no está cerrando suficiente." 
            reality="La capa de filtrado es inexistente. El SDR procesa ruido." 
          />
          <RealityRow 
            perception="Hay que rediseñar el web o cambiar el mensaje." 
            reality="Fallo en la Inteligencia de Señales operando sin targeting C-Level." 
          />
        </div>
      </div>
    </section>
  );
};

export default RealityCheck;
