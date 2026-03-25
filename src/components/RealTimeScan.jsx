import React, { useState, useEffect, useRef } from 'react';
import { TerminalLine } from './ui/TerminalLine';

const RealTimeScan = ({ isScanActive, onScanComplete }) => {
  const [linesShown, setLinesShown] = useState(0);
  const sectionRef = useRef(null);

  const scanSequence = [
    { text: "Running acquisition surface scan...", delay: 500, type: "normal" },
    { text: "Authenticating modules... OK", delay: 1500, type: "normal" },
    { text: "Scanning dependency tree...", delay: 2500, type: "alert" },
    { text: " ", delay: 3500, type: "normal" },
    { text: "[ALERT] Unsecured referral dependency detected", delay: 4000, type: "alert" },
    { text: "[ALERT] No pipeline observability found in layer 2", delay: 4800, type: "alert" },
    { text: "[ERROR] Low signal integrity. High noise ratio.", delay: 5500, type: "error" },
    { text: "[FATAL] External dependency exposure active on multiple vectors.", delay: 6200, type: "error" },
    { text: " ", delay: 6800, type: "normal" },
    { text: "----------------------------------------", delay: 7200, type: "normal" },
    { text: "RISK LEVEL: CRITICAL", delay: 7800, type: "error" },
    { text: "Tu sistema opera como una red sin segmentación ni control.", delay: 8400, type: "alert" },
    { text: "----------------------------------------", delay: 8600, type: "normal" },
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
      }, 8500);
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
              <p className="text-structure text-sm">Esperando inicialización...</p>
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
