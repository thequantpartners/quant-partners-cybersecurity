import React, { useState } from 'react';
import { TrendingDown, Activity, AlertOctagon } from 'lucide-react';
import NextButton from './NextButton';
import { useAudio } from '../hooks/useAudio';
import { AudioVisualizer } from './AudioVisualizer';

const CostOfInaction = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const cards = [
    {
      icon: TrendingDown,
      title: "Leads Esfumados",
      desc: "Oportunidades High-Ticket perdidas mes a mes por fricción técnica en tu embudo o total falta de autoridad B2B frente a directivos competidores.",
      metric: "~$25k - $50k",
      sub: "Revenue Perdido / Mes",
      audio: "/audio/cost-1.mp3"
    },
    {
      icon: AlertOctagon,
      title: "Ruleta Rusa Operativa",
      desc: "Depender de 3 o 4 clientes ancla no es 'estabilidad comercial', es jugar a la ruleta rusa con el P&L de tu firma de ciberseguridad.",
      metric: "Colapso del 40%",
      sub: "Ante un solo churn crítico",
      audio: "/audio/cost-2.mp3"
    },
    {
      icon: Activity,
      title: "Valoración Destruida",
      desc: "Empresas basadas en el talento de los fundadores (sin sistemas automatizados repetibles) se valoran a múltiplos ridículamente bajos ante fusiones o inversión.",
      metric: "-3x Múltiplo EBIT",
      sub: "Penalización en M&A",
      audio: "/audio/cost-3.mp3"
    }
  ];

  const current = cards[step];
  const Icon = current.icon;
  const { isFinished } = useAudio(current.audio);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-5 duration-500 mt-[-5vh]">
      <div className="mb-6 md:mb-8 text-center">
        <span className="text-red-500 font-mono text-xs md:text-sm tracking-widest uppercase mb-2 md:mb-4 block">[ RIESGO FINANCIERO {step + 1}/{cards.length} ]</span>
        <h2 className="text-2xl md:text-3xl font-mono font-bold text-white tracking-tight uppercase">
          RUTA DE COLAPSO
        </h2>
      </div>

      <div className="bg-[#0a0a0a] border border-structure p-6 md:p-10 flex flex-col items-center text-center w-full border-red-900/30 shadow-[0_0_40px_rgba(255,0,0,0.03)]">
        <Icon size={48} className="text-red-500 mb-6 drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]" />
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 uppercase tracking-widest">{current.title}</h3>
        <p className="text-gray-400 text-sm md:text-base font-mono mb-6 md:mb-8 leading-relaxed">
          {current.desc}
        </p>
        <div className="mt-auto w-full border-t border-structure/50 pt-6">
          <span className="block text-2xl md:text-4xl font-bold text-red-500 font-mono mb-2">{current.metric}</span>
          <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">{current.sub}</span>
        </div>
      </div>

      <div className="h-[96px] md:h-[116px] w-full mt-4 md:mt-2 transition-all">
        {isFinished ? (
          <NextButton 
            onClick={() => step < cards.length - 1 ? setStep(step + 1) : onComplete()} 
            text={step < cards.length - 1 ? "Examinar Siguiente Riesgo" : "Siguiente > Roadmap de Ejecución"} 
          />
        ) : (
          <AudioVisualizer />
        )}
      </div>
    </div>
  );
};

export default CostOfInaction;
