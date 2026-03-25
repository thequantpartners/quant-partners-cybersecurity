import React from 'react';

const ContrastBox = ({ title, type, desc, isQuant = false }) => (
  <div className={`p-8 border ${isQuant ? 'border-signals bg-[#05150D]' : 'border-structure bg-[#0A0A0A]'} flex flex-col justify-between h-full group transition-all duration-300 hover:-translate-y-1`}>
    <div>
      <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">{type}</div>
      <h3 className={`text-2xl font-bold mb-4 ${isQuant ? 'text-signals' : 'text-white'}`}>{title}</h3>
      <p className={`font-mono text-sm leading-relaxed ${isQuant ? 'text-gray-300' : 'text-gray-400'}`}>
        {desc}
      </p>
    </div>
    {!isQuant && (
      <div className="mt-8 pt-4 border-t border-structure font-mono text-xs text-red-500 uppercase flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        Vector de Riesgo
      </div>
    )}
    {isQuant && (
      <div className="mt-8 pt-4 border-t border-signals/30 font-mono text-xs text-signals uppercase flex items-center gap-2 text-glow">
        <span className="w-2 h-2 rounded-full bg-signals"></span>
        Sistema Aislado
      </div>
    )}
  </div>
);

const StructuralStrike = () => {
  return (
    <section className="w-full bg-[#020202] py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Contratar más personal <br/><span className="text-gray-500">no corrige sistemas sin Hardening.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ContrastBox 
            type="Rol Clásico"
            title="VP de Ventas" 
            desc="Crea dependencia a una red de contactos finita. Alto impacto organizacional en caso de salida. Arquitectura construida sobre relaciones, no sistemas." 
          />
          <ContrastBox 
            type="Proveedor Externo"
            title="Agencia B2B" 
            desc="Externalización de una capa core del negocio. Modelo genérico aplicado a ciberseguridad. Dificultad para mantener discusiones altamente técnicas." 
          />
          <ContrastBox 
            isQuant={true}
            type="Infraestructura"
            title="Quant Partners" 
            desc="Implementación de control interno. El sistema, los datos y la matriz de operaciones pertenecen 100% a la empresa. Activo transferible." 
          />
        </div>
      </div>
    </section>
  );
};

export default StructuralStrike;
