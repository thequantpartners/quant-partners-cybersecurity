import React from 'react';
import { DollarSign, Users, Clock, AlertTriangle } from 'lucide-react';

const InHouseVsQuant = () => {
  return (
    <section id="phase-3" className="w-full min-h-screen py-24 px-4 flex flex-col items-center justify-center relative border-b border-structure/30">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-mono font-bold text-white mb-6 tracking-tight uppercase">
            <span className="text-signals mr-3">{'>'}</span>
            LA FALACIA DEL DEPARTAMENTO IN-HOUSE
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Eres competente ejecutando ciberseguridad, pero dependes de referidos. Construir un departamento interno de ventas a base de SDRs y RevOps te convierte en el rehén financiero de empleados que se marcharán en 6 meses con todo tu know-how.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* In-House Model */}
          <div className="bg-[#0a0a0a] border border-red-900/50 p-8 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <AlertTriangle size={100} className="text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-red-500 mb-6 font-mono uppercase tracking-widest border-b border-red-900/50 pb-4">
              [ Modelo In-House (1 Año) ]
            </h3>
            
            <ul className="space-y-6 text-gray-300">
              <li className="flex justify-between items-end border-b border-structure/20 pb-2">
                <div>
                  <span className="block text-white font-bold">Director de Ventas (VP / RevOps)</span>
                  <span className="text-xs text-red-400">Salario + Comisiones (Talento Senior)</span>
                </div>
                <span className="font-mono text-xl text-red-500">$150,000</span>
              </li>
              <li className="flex justify-between items-end border-b border-structure/20 pb-2">
                <div>
                  <span className="block text-white font-bold">Curva de Ramp-Up (SDRs)</span>
                  <span className="text-xs text-red-400">6 meses de improductividad comercial</span>
                </div>
                <span className="font-mono text-xl text-red-500">$75,000</span>
              </li>
              <li className="flex justify-between items-end border-b border-structure/20 pb-2">
                <div>
                  <span className="block text-white font-bold">Rotación y Fuego Cruzado</span>
                  <span className="text-xs text-red-400">Reclutamiento, licencias (ZoomInfo, Outreach)</span>
                </div>
                <span className="font-mono text-xl text-red-500">$45,000</span>
              </li>
              <li className="flex justify-between items-center pt-4">
                <span className="block text-white font-bold text-xl uppercase tracking-widest">Gasto Total 1er Año:</span>
                <span className="font-mono text-3xl font-bold text-red-500">~$270,000</span>
              </li>
            </ul>
             <p className="mt-8 text-sm text-red-400/80 font-mono">
              *Riesgo Asimétrico: Todo el conocimiento se va cuando el empleado dimite. Costo hundido garantizado.
            </p>
          </div>

          {/* Quant Model */}
          <div className="bg-[#111] border border-signals p-8 rounded-sm relative overflow-hidden shadow-[0_0_30px_rgba(0,255,136,0.1)]">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <DollarSign size={100} className="text-signals" />
            </div>
            <h3 className="text-2xl font-bold text-signals mb-6 font-mono uppercase tracking-widest border-b border-signals/30 pb-4">
              [ Sistema Quant (90 Días) ]
            </h3>
            
            <ul className="space-y-6 text-gray-300">
              <li className="flex justify-between items-end border-b border-structure/20 pb-2">
                <div>
                  <span className="block text-white font-bold">Infraestructura Definitiva</span>
                  <span className="text-xs text-signals">Despliegue táctico llave en mano</span>
                </div>
                <span className="font-mono text-xl text-signals">Inversión Fija</span>
              </li>
              <li className="flex justify-between items-end border-b border-structure/20 pb-2">
                <div>
                  <span className="block text-white font-bold">Time-to-Value</span>
                  <span className="text-xs text-signals">Produciendo resultados en 90 días</span>
                </div>
                <span className="font-mono text-xl text-signals">Inmediato</span>
              </li>
              <li className="flex justify-between items-end border-b border-structure/20 pb-2">
                <div>
                  <span className="block text-white font-bold">Ownership Absoluto</span>
                  <span className="text-xs text-signals">Propiedad de código e integración</span>
                </div>
                <span className="font-mono text-xl text-signals">100% Tuyo</span>
              </li>
              <li className="flex justify-between items-center pt-4">
                <span className="block text-white font-bold text-xl uppercase tracking-widest">Inversión Total:</span>
                <span className="font-mono text-3xl font-bold text-signals">+$30,000</span>
              </li>
            </ul>
            <p className="mt-8 text-sm text-signals/80 font-mono leading-relaxed">
              *Ventaja Matemática: Heredas un activo táctico del cual tienes propiedad matemática del 100%. Blindaje patrimonial permanente frente a la rotación.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InHouseVsQuant;
