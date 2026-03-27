import React, { useState } from 'react';
import { DollarSign, AlertTriangle } from 'lucide-react';
import NextButton from './NextButton';
import { useAudio } from '../hooks/useAudio';
import { AudioVisualizer } from './AudioVisualizer';

const InHouseVsQuant = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const stepsAudio = ["/audio/inhouse-1.mp3", "/audio/inhouse-2.mp3"];
  const { isFinished } = useAudio(stepsAudio[step]);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="mb-6 md:mb-10 text-center mt-[-5vh]">
        <h2 className="text-2xl md:text-3xl font-mono font-bold text-white mb-2 tracking-tight uppercase">
          <span className="text-signals mr-3">{'>'}</span>
          LA FALACIA IN-HOUSE
        </h2>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          Comparativa financiera estructural
        </p>
      </div>

      <div className="relative w-full">
        {step === 0 && (
          <div className="bg-[#0a0a0a] border border-red-900/50 p-6 md:p-8 rounded-sm relative overflow-hidden animate-in fade-in duration-500">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <AlertTriangle size={80} className="text-red-500" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-red-500 mb-6 font-mono uppercase tracking-widest border-b border-red-900/50 pb-4">
              [ Modelo In-House ]
            </h3>
            
            <ul className="space-y-4 md:space-y-6 text-gray-300 text-sm md:text-base">
              <li className="flex justify-between items-end border-b border-structure/20 pb-2">
                <div>
                  <span className="block text-white font-bold">Director de Ventas</span>
                  <span className="text-xs text-red-400">Salario + Comisiones</span>
                </div>
                <span className="font-mono text-lg md:text-xl text-red-500">$150,000</span>
              </li>
              <li className="flex justify-between items-end border-b border-structure/20 pb-2">
                <div>
                  <span className="block text-white font-bold">Curva Ramp-Up</span>
                  <span className="text-xs text-red-400">6 meses improductivos</span>
                </div>
                <span className="font-mono text-lg md:text-xl text-red-500">$75,000</span>
              </li>
              <li className="flex justify-between items-end border-b border-structure/20 pb-2">
                <div>
                  <span className="block text-white font-bold">Rotación y Software</span>
                  <span className="text-xs text-red-400">Reclutamiento, licencias</span>
                </div>
                <span className="font-mono text-lg md:text-xl text-red-500">$45,000</span>
              </li>
              <li className="flex justify-between items-center pt-2">
                <span className="block text-white font-bold text-lg md:text-xl uppercase tracking-widest">Gasto Año 1:</span>
                <span className="font-mono text-xl md:text-3xl font-bold text-red-500">~$270,000</span>
              </li>
            </ul>
             <p className="mt-6 text-xs text-red-400/80 font-mono">
              *Riesgo Asimétrico: Todo el conocimiento se va cuando el empleado dimite. Costo hundido garantizado.
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-[#111] border border-signals p-6 md:p-8 rounded-sm relative overflow-hidden shadow-[0_0_30px_rgba(0,255,136,0.1)] animate-in fade-in duration-500">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <DollarSign size={80} className="text-signals" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-signals mb-6 font-mono uppercase tracking-widest border-b border-signals/30 pb-4">
              [ Sistema Quant ]
            </h3>
            
            <ul className="space-y-4 md:space-y-6 text-gray-300 text-sm md:text-base">
              <li className="flex justify-between items-end border-b border-structure/20 pb-2">
                <div>
                  <span className="block text-white font-bold">Infraestructura</span>
                  <span className="text-xs text-signals">Despliegue llave en mano</span>
                </div>
                <span className="font-mono text-lg md:text-xl text-signals">Inversión Fija</span>
              </li>
              <li className="flex justify-between items-end border-b border-structure/20 pb-2">
                <div>
                  <span className="block text-white font-bold">Time-to-Value</span>
                  <span className="text-xs text-signals">Producción en 90 días</span>
                </div>
                <span className="font-mono text-lg md:text-xl text-signals">Inmediato</span>
              </li>
              <li className="flex justify-between items-end border-b border-structure/20 pb-2">
                <div>
                  <span className="block text-white font-bold">Ownership Absoluto</span>
                  <span className="text-xs text-signals">IP y Códigos 100% Tuyos</span>
                </div>
                <span className="font-mono text-lg md:text-xl text-signals">Total</span>
              </li>
              <li className="flex justify-between items-center pt-2">
                <span className="block text-white font-bold text-lg md:text-xl uppercase tracking-widest">Inversión Fija:</span>
                <span className="font-mono text-xl md:text-3xl font-bold text-signals">+$40k</span>
              </li>
            </ul>
            <p className="mt-6 text-xs text-signals/80 font-mono leading-relaxed">
              *Ventaja Matemática: Heredas un activo táctico del cual tienes propiedad total. Blindaje frente a rotación.
            </p>
          </div>
        )}
      </div>

      <div className="h-[96px] md:h-[116px] w-full mt-4 md:mt-2 transition-all">
        {isFinished ? (
          <NextButton 
            onClick={() => step === 0 ? setStep(1) : onComplete()} 
            text={step === 0 ? "Revelar Solución Asimétrica" : "Siguiente > Simular Costos"} 
          />
        ) : (
          <AudioVisualizer />
        )}
      </div>
    </div>
  );
};

export default InHouseVsQuant;
