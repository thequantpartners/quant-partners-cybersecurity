import React from 'react';

const NextButton = ({ onClick, text }) => (
  <div className="w-full flex justify-center mt-6 md:mt-10">
    <button 
      onClick={onClick}
      className="group relative w-full md:w-auto px-6 md:px-10 py-5 bg-[#050505] border border-signals/40 text-signals font-mono font-bold uppercase tracking-widest text-xs md:text-sm overflow-hidden hover:bg-signals hover:text-background transition-all shadow-[0_0_15px_rgba(0,255,136,0.05)] hover:shadow-[0_0_30px_rgba(0,255,136,0.3)]"
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        {text} 
        <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
      </span>
    </button>
  </div>
);

export default NextButton;
