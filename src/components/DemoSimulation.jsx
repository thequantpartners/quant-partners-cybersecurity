import React, { useState } from 'react';
import { TerminalLine } from './ui/TerminalLine';

const DemoSimulation = () => {
  const [targetType, setTargetType] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleScan = () => {
    if (!targetType) return;
    setIsScanning(true);
    setScanComplete(false);

    setTimeout(() => {
      setScanComplete(true);
      setIsScanning(false);
    }, 4500);
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-24 border-y border-structure bg-[#030303]">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        
        <div className="flex-1 w-full space-y-8">
          <div>
            <span className="font-mono text-xs text-signals uppercase tracking-widest">[ Simulación ]</span>
            <h2 className="text-3xl font-bold mt-2">Prueba el protocolo.</h2>
            <p className="text-gray-400 mt-2">Configura un objetivo y observa los vectores explotables en el mercado actual.</p>
          </div>

          <div className="space-y-4">
            <label className="block font-mono text-sm text-gray-500 uppercase">Target Categoria</label>
            <select 
              className="w-full bg-[#0A0A0A] border border-structure p-4 text-white font-mono focus:border-signals focus:outline-none appearance-none cursor-pointer"
              value={targetType}
              onChange={(e) => setTargetType(e.target.value)}
              disabled={isScanning}
            >
              <option value="" disabled>Seleccionar tipo de empresa...</option>
              <option value="b2b-tech">B2B Tech / SaaS Enterprise</option>
              <option value="mssp-soc">MSSP / SOC2 Providers</option>
              <option value="consulting">Cybersecurity Consulting</option>
              <option value="pentesting">Pentesting & Red Team</option>
            </select>
          </div>

          <button 
            onClick={handleScan}
            disabled={!targetType || isScanning}
            className="w-full px-6 py-4 bg-signals text-background font-mono font-bold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-400 transition-colors"
          >
            {isScanning ? 'Executing Initial Scan...' : 'Deploy Scan Protocol'}
          </button>
        </div>

        <div className="flex-1 w-full bg-[#050505] border border-structure min-h-[350px] flex flex-col scanline">
          <div className="border-b border-structure p-2 flex justify-between items-center text-xs font-mono text-gray-600">
            <span>TERMINAL OUTPUT</span>
            <span>PORT: 443</span>
          </div>
          
          <div className="p-6 font-mono text-sm flex-1">
            {!isScanning && !scanComplete && (
              <span className="text-gray-600">{'>'} Waiting for parameters...</span>
            )}
            
            {isScanning && (
              <div className="flex flex-col gap-1">
                <TerminalLine text={`Target initialized: ${targetType.toUpperCase()}`} delay={100} />
                <TerminalLine text="Interceptando vectores de adquisición de CISOs..." delay={800} />
                <TerminalLine text="Analizando dependencias de pipeline en la vertical..." delay={1500} />
                <TerminalLine text="Filtrando falsos positivos y tráfico de baja intención..." delay={2200} />
                <TerminalLine text="Extrayendo firmas de fricción comercial..." delay={3100} />
              </div>
            )}

            {scanComplete && (
              <div className="flex flex-col gap-2 animate-pulse" style={{ animationIterationCount: 1 }}>
                <span className="text-signals block mb-2">{'>'} SCAN COMPLETE</span>
                <div className="border border-signals p-4 bg-signals/10">
                  <p className="text-white font-bold mb-2">OUTPUT:</p>
                  <ul className="text-gray-300 space-y-2 text-xs">
                    <li>- <span className="text-red-500 font-bold">14</span> intentos de adquisición rebotados por fatiga de canal táctico.</li>
                    <li>- <span className="text-red-500 font-bold">87%</span> del esfuerzo de SDR impactando contra firmas de ruido comercial.</li>
                    <li>- <span className="text-red-500 font-bold">6</span> transiciones directas de C-Level totalmente ignoradas por el pipeline actual.</li>
                  </ul>
                  <p className="mt-4 text-signals font-bold">
                    "Esto existe. Simplemente no lo estás capturando."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSimulation;
