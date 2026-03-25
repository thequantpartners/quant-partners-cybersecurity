import React from 'react';
import { MapPin, Lock, Unlock } from 'lucide-react';

const Exclusivity = () => {
  return (
    <section className="w-full bg-[#050505] py-32 px-6 border-b border-structure relative overflow-hidden">
      {/* Background radial for focus */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-depth/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 bg-signals rounded-full animate-pulse"></span>
            <span className="font-mono text-xs text-signals uppercase tracking-widest">Protocolo de Exclusividad</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            1 Partner por categoría <br />y por región.
          </h2>
          <p className="text-gray-400 font-mono mb-8 max-w-lg leading-relaxed">
            Esto no es una herramienta SaaS masiva. Es una ventaja competitiva de despliegue controlado. No saturamos los canales con los mismos vectores de ataque para empresas competidoras.
          </p>
          
          <div className="flex flex-col gap-4 font-mono text-sm">
            <div className="flex items-center gap-3 border border-structure p-3 bg-[#0a0a0a]">
              <Lock size={16} className="text-red-500" />
              <span className="text-gray-300">Norteamérica: <span className="text-red-500 font-bold ml-2">CAPACIDAD ALCANZADA</span></span>
            </div>
            <div className="flex items-center gap-3 border border-signals p-3 bg-[#0a0a0a]">
              <Unlock size={16} className="text-signals" />
              <span className="text-gray-300">LATAM / España: <span className="text-signals font-bold ml-2">1 SLOT DISPONIBLE</span></span>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full bg-[#080808] border border-structure h-[400px] relative scanline overflow-hidden flex items-center justify-center">
          {/* Abstract Geo-Map Representation */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiMzMzMiLz48L3N2Zz4=')] opacity-30"></div>
          
          <div className="relative z-10 w-full h-full">
            {/* Dots representing regions */}
            <div className="absolute top-[30%] left-[25%] flex flex-col items-center group cursor-pointer">
              <span className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(255,0,0,0.8)]"></span>
              <span className="mt-2 font-mono text-[10px] text-red-500 uppercase opacity-0 group-hover:opacity-100 transition-opacity bg-black px-2 py-1 border border-red-500/30">LOCKED</span>
            </div>
            
            <div className="absolute top-[40%] right-[30%] flex flex-col items-center group cursor-pointer">
              <span className="w-3 h-3 bg-signals rounded-full shadow-[0_0_10px_rgba(0,255,136,0.8)] animate-pulse"></span>
              <span className="mt-2 font-mono text-[10px] text-signals uppercase border border-signals bg-black px-2 py-1">AVAILABLE</span>
              {/* Radar pulse effect */}
              <span className="absolute w-3 h-3 bg-signals rounded-full animate-ping opacity-20"></span>
            </div>

            <div className="absolute bottom-[40%] left-[45%] flex flex-col items-center group cursor-pointer">
              <span className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(255,0,0,0.8)]"></span>
            </div>
          </div>
          
          <div className="absolute bottom-4 right-4 text-[10px] font-mono text-gray-600">
            NETWORK TOPOLOGY // GEO-LOCK ACTIVE
          </div>
        </div>

      </div>
    </section>
  );
};

export default Exclusivity;
