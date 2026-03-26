import React, { useState, useEffect, useRef } from 'react';
import { TerminalLine } from './ui/TerminalLine';

const RealTimeScan = ({ isScanActive, onScanComplete }) => {
  const [linesShown, setLinesShown] = useState(0);
  const sectionRef = useRef(null);

  const scanSequence = [
    { text: "Running acquisition surface scan...", delay: 200, type: "normal" },
    { text: "Authenticating modules... OK", delay: 500, type: "normal" },
    { text: "Scanning dependency tree...", delay: 800, type: "alert" },
    { text: "[ALERT] Unsecured referral dependency detected", delay: 1100, type: "alert" },
    { text: "[ALERT] No pipeline observability found in layer 2", delay: 1400, type: "alert" },
    { text: "[ERROR] 14 intentos de venta rebotados este mes por fatiga de canal", delay: 1700, type: "error" },
    { text: "[FATAL] 87% del esfuerzo impactando contra ruido comercial", delay: 2000, type: "error" },
    { text: "----------------------------------------", delay: 2200, type: "normal" },
    { text: "RISK LEVEL: CRITICAL", delay: 2400, type: "error" },
    { text: "Tu sistema opera como una red sin segmentación ni control.", delay: 2600, type: "alert" },
    { text: "----------------------------------------", delay: 2800, type: "normal" },
  ];

  useEffect(() => {
    if (!isScanActive) return;
    
    const timers = scanSequence.map((line, index) => {
      return setTimeout(() => {
        setLinesShown(prev => Math.max(prev, index + 1));
      }, line.delay);
    });

    return () => timers.forEach(clearTimeout);
  }, [isScanActive]);

  useEffect(() => {
    if (isScanActive) {
      const scrollTimer = setTimeout(() => {
        if (onScanComplete) onScanComplete();
        setTimeout(() => {
          document.getElementById('vulnerability-map')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }, 3000);
      return () => clearTimeout(scrollTimer);
    }
  }, [isScanActive, onScanComplete]);

  return (
    <section id="real-time-scan" ref={sectionRef} className="w-full max-w-5xl mx-auto px-6 py-24 min-h-[50vh]">
      <div className="bg-[#0a0a0a] border border-structure rounded-sm p-1 shadow-2xl relative overflow-hidden group">
        
        {/* Top Bar simulating a window */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#111111] border-b border-structure">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-structure"></div>
            <div className="w-3 h-3 rounded-full bg-structure"></div>
            <div className="w-3 h-3 rounded-full bg-structure"></div>
          </div>
          <p className="text-xs text-gray-500 font-mono ml-4 tracking-widest uppercase">
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

            {isScanActive && linesShown < scanSequence.length && (
              <div className="w-3 h-5 bg-signals animate-pulse mt-4"></div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealTimeScan;
