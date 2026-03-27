import React, { useState } from 'react';
import { Database, EyeOff, ShieldAlert } from 'lucide-react';
import NextButton from './NextButton';
import { useAudio } from '../hooks/useAudio';
import { AudioVisualizer } from './AudioVisualizer';

const RealityCheck = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const checks = [
    {
      perception: "Necesitamos generar más leads urgentes.",
      reality: "Tus agentes imploran por 'mejores leads' para tapar el hecho de que tu embudo no califica ni retiene autoridad.",
      audio: "/audio/reality-1.mp3"
    },
    {
      perception: "Las ventas son muy inestables este trimestre.",
      reality: "Creer que tu problema es 'rediseñar la web' o 'contratar otro SDR' es negligencia gerencial pura.",
      audio: "/audio/reality-2.mp3"
    },
    {
      perception: "El equipo de ventas no está cerrando suficiente.",
      reality: "Estás echando agua en una tubería rota. La capa de filtrado es inexistente.",
      audio: "/audio/reality-3.mp3"
    },
    {
      perception: "Hay que rediseñar el web o cambiar el mensaje.",
      reality: "Fallo en la Inteligencia de Señales operando sin targeting C-Level.",
      audio: "/audio/reality-4.mp3"
    }
  ];

  const current = checks[step];
  const { isFinished } = useAudio(current.audio);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="bg-[#050505] border border-structure p-6 md:p-12 relative overflow-hidden flex flex-col items-center text-center mt-[-10vh]">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-depth rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-signals mb-8 border-b border-structure w-full pb-6">
          <ShieldAlert size={28} />
          <h2 className="text-lg md:text-2xl font-bold font-mono tracking-widest uppercase">Percepción vs Realidad ({step + 1}/{checks.length})</h2>
        </div>

        <div className="flex flex-col w-full gap-6 md:gap-8 mb-4">
          <div className="flex flex-col gap-3">
             <div className="flex items-center justify-center gap-2 text-gray-500 uppercase font-mono tracking-widest text-xs mb-2">
               <EyeOff size={16} /> Falsa Percepción
             </div>
             <p className="text-lg md:text-xl text-gray-400 italic">"{current.perception}"</p>
          </div>

          <div className="h-4 w-px bg-structure mx-auto"></div>

          <div className="flex flex-col gap-3 bg-signals/5 p-6 border-l-2 border-signals text-left md:text-center">
             <div className="flex items-center justify-start md:justify-center gap-2 text-signals uppercase font-mono tracking-widest text-xs mb-2">
               <Database size={16} /> Arquitectura Real
             </div>
             <p className="text-base md:text-xl text-white font-medium">
               {current.reality}
             </p>
          </div>
        </div>
      </div>
      
      <div className="h-[96px] md:h-[116px] w-full mt-4 md:mt-2 transition-all">
        {isFinished ? (
          <NextButton 
            onClick={() => step < checks.length - 1 ? setStep(step + 1) : onComplete()} 
            text={step < checks.length - 1 ? "Siguiente Realidad" : "Siguiente > Comparativa Financiera"} 
          />
        ) : (
          <AudioVisualizer />
        )}
      </div>
    </div>
  );
};
export default RealityCheck;
