import React, { useState } from 'react';
import { Clock, ShieldCheck, Lock } from 'lucide-react';
import NextButton from './NextButton';
import { useAudio } from '../hooks/useAudio';
import { AudioVisualizer } from './AudioVisualizer';

const DeploymentTimeline = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const phases = [
    {
      phase: "1",
      time: "Días 1 - 30",
      title: "Arquitectura y Mapeo",
      desc: "Auditoría de infraestructura. Detección de fugas de caja y diseño del modelo Outbound asimétrico alineado a tu margen operativo.",
      icon: Clock,
      audio: "/audio/timeline-1.mp3"
    },
    {
      phase: "2",
      time: "Días 31 - 60",
      title: "Despliegue y Blindaje",
      desc: "Instalación del sistema Quant in-house. Aislamiento de procesos manuales, automatización SDR cruzada y pruebas de estrés P&L.",
      icon: ShieldCheck,
      audio: "/audio/timeline-2.mp3"
    },
    {
      phase: "3",
      time: "Días 61 - 90",
      title: "Transferencia & Propiedad",
      desc: "Validación de caja neta. Entrega de IPs, frameworks de calificación y manuales tácticos. Quedan operando sin depender de Quant Partners nunca más.",
      icon: Lock,
      isFinal: true,
      audio: "/audio/timeline-3.mp3"
    }
  ];

  const current = phases[step];
  const Icon = current.icon;
  const { isFinished } = useAudio(current.audio);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-5 duration-500 mt-[-5vh]">
      <div className="mb-6 md:mb-10 text-center">
        <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-white mb-2 md:mb-4">
          Ejecución en <span className="text-signals text-glow">90 Días</span>
        </h2>
        <p className="text-gray-400 font-mono text-xs md:text-sm">
           Hito Táctico {step + 1} de {phases.length}
        </p>
      </div>

      <div className={`w-full bg-[#0a0a0a] border ${current.isFinal ? 'border-signals/60 shadow-[0_0_40px_rgba(0,255,136,0.08)]' : 'border-structure/50'} p-8 md:p-12 flex flex-col items-center text-center relative transition-colors duration-500`}>
        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full border mb-6 flex items-center justify-center transition-colors duration-500 ${current.isFinal ? 'bg-signals text-background border-signals shadow-[0_0_20px_rgba(0,255,136,0.4)]' : 'bg-[#111] text-gray-400 border-structure'}`}>
          <Icon size={32} />
        </div>
        
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-4">
          <div className="text-[10px] md:text-xs font-mono text-signals uppercase tracking-widest">Fase {current.phase}</div>
          <div className="text-[10px] md:text-xs font-mono text-gray-500 border border-structure px-2 py-1">{current.time}</div>
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold mb-4 text-white uppercase tracking-wider">{current.title}</h3>
        <p className={`font-mono text-sm md:text-base leading-relaxed ${current.isFinal ? 'text-gray-300' : 'text-gray-400'}`}>
          {current.desc}
        </p>
      </div>

      <div className="h-[96px] md:h-[116px] w-full mt-4 md:mt-2 transition-all">
        {isFinished ? (
          <NextButton 
            onClick={() => step < phases.length - 1 ? setStep(step + 1) : onComplete()} 
            text={step < phases.length - 1 ? "Siguiente Hito de Despliegue" : "Siguiente > Toma de Decisión"} 
          />
        ) : (
          <AudioVisualizer />
        )}
      </div>
    </div>
  );
};

export default DeploymentTimeline;
