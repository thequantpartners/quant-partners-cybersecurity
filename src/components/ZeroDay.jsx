import React from 'react';

const ZeroDay = () => {
  return (
    <section className="w-full bg-background relative overflow-hidden flex items-center justify-center min-h-[500px]">
      <div className="absolute inset-0 bg-repeating-linear-gradient(45deg, #050505 25%, transparent 25%, transparent 75%, #050505 75%, #050505), bg-repeating-linear-gradient(45deg, #050505 25%, #0a0a0a 25%, #0a0a0a 75%, #050505 75%, #050505) bg-background w-full h-full opacity-50" style={{ backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center border-y border-red-500/20 py-24 bg-background/80 backdrop-blur-sm shadow-[0_0_50px_rgba(255,0,0,0.05)]">
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-white mb-8">
          Tu crecimiento actual es un <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 glow-red inline-block mt-2">Zero Day</span> <br/>
          esperando ser explotado.
        </h2>
        
        <div className="max-w-2xl mx-auto px-6 py-4 border-l-4 border-red-500 bg-red-500/5 text-left inline-block">
          <p className="text-xl md:text-2xl font-mono text-gray-300">
            Dependes de factores que no controlas. <br/>
            <span className="text-white">Eso no es estrategia. Es exposición.</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        .glow-red {
          text-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
        }
      `}</style>
    </section>
  );
};

export default ZeroDay;
