import React, { useState } from 'react';
import { Radio, Target, Filter, Zap } from 'lucide-react';

const Layer = ({ number, title, description, icon: Icon, active, onMouseEnter }) => (
  <div 
    className={`p-6 md:p-8 cursor-pointer border-l-4 transition-all duration-300 ${
      active 
        ? 'border-signals bg-[#0A0A0A]' 
        : 'border-structure hover:border-depth bg-[#050505] hover:bg-[#080808]'
    }`}
    onMouseEnter={onMouseEnter}
  >
    <div className="flex items-center gap-4 mb-4">
      <div className={`p-3 transition-colors ${active ? 'bg-signals text-background' : 'bg-structure text-gray-400'}`}>
        <Icon size={24} />
      </div>
      <h3 className={`font-mono text-xl ${active ? 'text-signals' : 'text-gray-300'} uppercase font-bold`}>
        {number}. {title}
      </h3>
    </div>
    <p className={`font-mono text-sm leading-relaxed ${active ? 'text-gray-300' : 'text-gray-500'}`}>
      {description}
    </p>
  </div>
);

const PipelineVisualizer = ({ activeIndex }) => {
  return (
    <div className="h-full min-h-[400px] border border-structure bg-[#020202] p-8 relative flex flex-col justify-between scanline font-mono">
      {/* Decorative */}
      <div className="absolute top-4 right-4 text-xs text-gray-600 tracking-widest uppercase">
        Data Pipeline // Active Status
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        {/* Simplified abstract data visualization based on active index */}
        {activeIndex === 0 && (
          <div className="flex flex-col items-center text-signals gap-4 animate-pulse">
            <Radio size={64} />
            <span className="text-sm border border-signals px-3 py-1">[ ANALYZING RAW SIGNALS ]</span>
          </div>
        )}
        {activeIndex === 1 && (
          <div className="flex flex-col items-center text-signals gap-4">
            <Target size={64} />
            <span className="text-sm border border-signals px-3 py-1">[ LOCKING TARGETS: C-LEVEL ]</span>
          </div>
        )}
        {activeIndex === 2 && (
          <div className="flex flex-col items-center text-signals gap-4">
            <Filter size={64} />
            <div className="flex gap-2 text-xs">
              <span className="text-red-500 line-through">NOISE</span>
              <span className="text-signals text-glow">SIGNAL</span>
            </div>
          </div>
        )}
        {activeIndex === 3 && (
          <div className="flex flex-col items-center text-signals gap-4">
            <Zap size={64} className="text-glow" />
            <span className="text-sm border border-signals bg-signals text-background px-3 py-1 font-bold">[ INTENT EXTRACTED ]</span>
          </div>
        )}
      </div>

      <div className="text-xs text-center border-t border-structure pt-4 mt-8 text-gray-500">
        System Processing Capability: 100% Structural Integrity
      </div>
    </div>
  );
};

const SystemArchitecture = () => {
  const [activeLayer, setActiveLayer] = useState(0);

  const layers = [
    {
      title: "Signal Intelligence",
      Icon: Radio,
      desc: "Detección de eventos relevantes. Monitoreamos triggers de cumplimiento, movimientos estructurales y cambios de stack en tiempo real."
    },
    {
      title: "Acquisition Layer",
      Icon: Target,
      desc: "Targeting controlado mediante Account-Based Engineering. Interceptamos rutas de atención exclusivas hacia C-Level (CISO, CTO)."
    },
    {
      title: "Filtering Protocol",
      Icon: Filter,
      desc: "Eliminación absoluta de ruido. Aplicamos barreras asimétricas de calificación antes de gastar ancho de banda humano."
    },
    {
      title: "Conversion Layer",
      Icon: Zap,
      desc: "Procesamiento de intención validada pura. Entregamos contextos estructurados, no 'leads'. Conversación técnica, no pitches."
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">
          Arquitectura <span className="text-transparent bg-clip-text bg-gradient-to-r from-signals to-emerald-800">Definida</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
        <div className="flex flex-col">
          {layers.map((layer, idx) => (
            <Layer 
              key={idx}
              number={`0${idx + 1}`}
              title={layer.title}
              description={layer.desc}
              icon={layer.Icon}
              active={activeLayer === idx}
              onMouseEnter={() => setActiveLayer(idx)}
            />
          ))}
        </div>
        
        <div className="hidden lg:block h-full">
          <PipelineVisualizer activeIndex={activeLayer} />
        </div>
      </div>
    </section>
  );
};

export default SystemArchitecture;
