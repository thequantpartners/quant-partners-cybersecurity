import React from 'react';
import { Network, Pickaxe, ShieldCheck } from 'lucide-react';

const Phase = ({ phase, title, desc, icon: Icon, delay }) => (
  <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 group">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-full border border-structure bg-[#080808] flex items-center justify-center text-gray-500 group-hover:bg-signals group-hover:text-background group-hover:border-signals transition-all duration-300">
        <Icon size={28} />
      </div>
      <div className="w-px h-16 md:h-24 bg-structure group-hover:bg-signals transition-colors mt-4"></div>
    </div>
    <div className="flex-1 md:pt-3 pb-8 md:pb-0">
      <div className="text-xs font-mono text-signals uppercase tracking-widest mb-2">Fase {phase}</div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-lg">{desc}</p>
    </div>
  </div>
);

const DeploymentTimeline = () => {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-32">
      <div className="mb-20 text-center md:text-left border-l-2 border-signals pl-6">
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">Despliegue</h2>
        <p className="text-gray-500 font-mono mt-4">Protocolo de inyección en infraestructura existente.</p>
      </div>

      <div className="flex flex-col mb-16 relative">
        <Phase 
          phase="1" 
          title="Reconocimiento" 
          desc="Mapeo de arquitectura actual. Identificación de dependencias externas, pérdida de señal en CRM y puntos de fallo humano."
          icon={Network} 
        />
        <Phase 
          phase="2" 
          title="Implementación" 
          desc="Despliegue del stack tecnológico. Aislamiento del SDR, automatización de scripts de filtrado y activación de la matriz de señales C-Level."
          icon={Pickaxe} 
        />
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 group">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border border-signals bg-signals text-background flex items-center justify-center shadow-[0_0_15px_rgba(0,255,136,0.3)]">
              <ShieldCheck size={28} />
            </div>
          </div>
          <div className="flex-1 md:pt-3">
            <div className="text-xs font-mono text-signals uppercase tracking-widest mb-2">Fase 3</div>
            <h3 className="text-2xl font-bold mb-3 text-glow">Transferencia</h3>
            <p className="text-gray-300 font-mono text-sm leading-relaxed max-w-lg">Sistema completamente blindado y validado. Operación in-house bajo estrictos SLAs de adquisición.</p>
          </div>
        </div>
      </div>

      <div className="bg-[#050505] border border-structure p-8 text-center mt-12">
        <p className="text-xl md:text-2xl font-bold text-gray-300">
          Dejas de operar en <span className="text-white line-through decoration-red-500">modo reactivo</span>.
        </p>
      </div>
    </section>
  );
};

export default DeploymentTimeline;
