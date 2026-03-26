import React from 'react';
import { Clock, ShieldCheck, Lock } from 'lucide-react';

const Phase = ({ phase, title, desc, icon: Icon, time }) => (
  <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 group">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-full border border-structure bg-[#080808] flex items-center justify-center text-gray-500 group-hover:bg-signals group-hover:text-background group-hover:border-signals transition-all duration-300">
        <Icon size={28} />
      </div>
      <div className="w-px h-16 md:h-24 bg-structure group-hover:bg-signals transition-colors mt-4"></div>
    </div>
    <div className="flex-1 md:pt-3 pb-8 md:pb-0">
      <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
        <div className="text-xs font-mono text-signals uppercase tracking-widest">Fase {phase}</div>
        <div className="text-xs font-mono text-gray-500 border border-structure px-2 py-1">{time}</div>
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-lg">{desc}</p>
    </div>
  </div>
);

const DeploymentTimeline = () => {
  return (
    <section id="phase-5" className="w-full max-w-5xl mx-auto px-6 py-24 mb-16 border-b border-structure/30">
      <div className="mb-20 text-center border-l-0 md:border-l-2 md:border-signals pl-0 md:pl-6 text-left">
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-white mb-6">
          Ejecución Asimétrica en <span className="text-signals text-glow">90 Días</span>
        </h2>
        <p className="text-gray-400 font-mono text-lg max-w-3xl">
          Las agencias te venden humo porque su negocio se basa en tu ignorancia perpetua. Son chupasangres corporativos vestidos de partners. Nosotros somos arquitectos financieros. Extraemos el caos, ensamblamos un ecosistema de adquisición en 90 días y al Día 91 <strong className="text-white">te entregamos las llaves</strong>. 100% tuyo. Jamás pagarás un peaje mensual de agencia.
        </p>
      </div>

      <div className="flex flex-col mb-16 relative">
        <Phase 
          phase="1" 
          time="Días 1 - 30"
          title="Arquitectura y Mapeo" 
          desc="Auditoría de infraestructura. Detección de fugas de caja y diseño del modelo Outbound asimétrico alineado a tu margen operativo."
          icon={Clock} 
        />
        <Phase 
          phase="2" 
          time="Días 31 - 60"
          title="Despliegue y Blindaje" 
          desc="Instalación del sistema Quant in-house. Aislamiento de procesos manuales, automatización SDR cruzada y pruebas de estrés P&L."
          icon={ShieldCheck} 
        />
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 group">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border border-signals bg-signals text-background flex items-center justify-center shadow-[0_0_15px_rgba(0,255,136,0.3)]">
              <Lock size={28} />
            </div>
          </div>
          <div className="flex-1 md:pt-3">
             <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
              <div className="text-xs font-mono text-signals uppercase tracking-widest">Fase 3</div>
              <div className="text-xs font-mono text-signals border border-signals px-2 py-1">Días 61 - 90</div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Transferencia & Propiedad</h3>
            <p className="text-gray-300 font-mono text-sm leading-relaxed max-w-lg">
              Validación de caja neta. <strong className="text-signals">Entrega de IPs, frameworks de calificación y manuales tácticos</strong>. Quedan operando sin depender de Quant Partners nunca más.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeploymentTimeline;
