import React, { useState, useEffect, useRef } from 'react';
import { TerminalLine } from './ui/TerminalLine';
import { useAudio } from '../hooks/useAudio';

const RealTimeScan = ({ isScanActive, onScanComplete }) => {
  const [linesShown, setLinesShown] = useState(0);
  const sectionRef = useRef(null);
  
  const { isFinished } = useAudio(isScanActive ? '/audio/scan.mp3' : null);

  const scanSequence = [
    { text: "Running acquisition surface scan...", delay: 200, type: "normal" },
    { text: "Authenticating modules... OK", delay: 900, type: "normal" },
    { text: "Scanning dependency tree...", delay: 1800, type: "alert" },
    { text: "[ALERT] Unsecured referral dependency detected", delay: 2600, type: "alert" },
    { text: "[ALERT] No pipeline observability found in layer 2", delay: 3500, type: "alert" },
    { text: "[ERROR] 14 intentos de venta rebotados este mes por fatiga de canal", delay: 4500, type: "error" },
    { text: "[FATAL] 87% del esfuerzo impactando contra ruido comercial", delay: 5800, type: "error" },
    { text: "----------------------------------------", delay: 6500, type: "normal" },
    { text: "RISK LEVEL: CRITICAL", delay: 7200, type: "error" },
    { text: "Tu sistema opera como una red sin segmentación ni control.", delay: 8500, type: "alert" },
    { text: "----------------------------------------", delay: 9500, type: "normal" },
  ];

  useEffect(() => {
    if (!isScanActive) return;
    
    // Stretch the animation times so it matches the audio length roughly
    const timers = scanSequence.map((line, index) => {
      return setTimeout(() => {
        setLinesShown(prev => Math.max(prev, index + 1));
      }, line.delay);
    });

    return () => timers.forEach(clearTimeout);
  }, [isScanActive]);

  useEffect(() => {
    if (isScanActive && isFinished) {
      if (onScanComplete) onScanComplete();
    }
  }, [isScanActive, isFinished, onScanComplete]);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-5 duration-500 mt-[-5vh] p-4">
      <div className="bg-[#0a0a0a] border border-structure rounded-sm p-1 shadow-2xl relative overflow-hidden group w-full">
        
        {/* Top Bar simulating a window */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#111111] border-b border-structure">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-structure"></div>
            <div className="w-3 h-3 rounded-full bg-structure"></div>
            <div className="w-3 h-3 rounded-full bg-structure"></div>
          </div>
          <p className="text-[10px] md:text-xs text-gray-500 font-mono ml-4 tracking-widest uppercase truncate">
            Quant_IDS_Terminal // {isScanActive ? 'ACTIVE' : 'STANDBY'}
          </p>
        </div>

        {/* Terminal Content */}
        <div className="p-6 md:p-12 min-h-[400px] font-mono relative">
          {/* Scanline overlay for the terminal */}
          <div className="absolute inset-0 scanline opacity-30 pointer-events-none"></div>
          
          <div className="flex flex-col gap-4 relative z-10">
            {!isScanActive && (
              <p className="text-structure text-sm mb-4">
                El mercado Enterprise fluye de largo frente a tus narices. Extermina la esperanza y conecta telemetría absoluta.
              </p>
            )}

            {scanSequence.map((line, index) => (
              linesShown > index && (
                <TerminalLine 
                  key={index} 
                  text={line.text} 
                  type={line.type}
                />
              )
            ))}

            {isScanActive && !isFinished && (
              <div className="w-3 h-5 bg-signals animate-pulse mt-4"></div>
            )}
            
            {isScanActive && !isFinished && (
               <p className="text-signals text-xs mt-8 opacity-50 animate-pulse">// ESCUCHANDO FEED DE AUDIO MULTIRUTA...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeScan;
