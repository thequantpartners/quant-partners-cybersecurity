import React from 'react';

export const AudioVisualizer = () => {
  return (
    <div className="w-full flex items-center justify-center mt-6 md:mt-10 animate-in fade-in duration-500 h-[64px] md:h-[72px]">
      <div className="flex items-center gap-2 md:gap-3 px-6 py-2 rounded-full opacity-80 backdrop-blur-sm">
        <div className="flex items-center gap-[2px] md:gap-1">
          <span className="w-[2px] md:w-[3px] h-3 md:h-4 bg-signals animate-[pulse_0.7s_ease-in-out_infinite]"></span>
          <span className="w-[2px] md:w-[3px] h-5 md:h-6 bg-signals animate-[pulse_0.9s_ease-in-out_infinite_0.1s]"></span>
          <span className="w-[2px] md:w-[3px] h-4 md:h-5 bg-signals animate-[pulse_0.6s_ease-in-out_infinite_0.2s]"></span>
          <span className="w-[2px] md:w-[3px] h-6 md:h-7 bg-signals animate-[pulse_0.8s_ease-in-out_infinite_0.3s]"></span>
          <span className="w-[2px] md:w-[3px] h-3 md:h-4 bg-signals animate-[pulse_0.5s_ease-in-out_infinite_0.4s]"></span>
        </div>
        <span className="ml-2 md:ml-3 text-signals font-mono text-[9px] md:text-[11px] uppercase tracking-widest animate-pulse">
          Sincronizando feed...
        </span>
      </div>
    </div>
  );
};
