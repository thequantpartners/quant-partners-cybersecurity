import React from 'react';
import { TrendingDown, Activity, AlertOctagon } from 'lucide-react';

const CostOfInaction = () => {
  return (
    <section id="phase-4" className="w-full min-h-screen py-24 px-4 flex flex-col items-center justify-center relative bg-[#030303] border-b border-structure/30">
      <div className="w-full max-w-5xl mx-auto">
        
        <div className="mb-16 text-center">
          <span className="text-red-500 font-mono text-sm tracking-widest uppercase mb-4 block">[ ALERTA DE RIESGO FINANCIERO ]</span>
          <h2 className="text-3xl md:text-5xl font-mono font-bold text-white mb-6 tracking-tight uppercase">
            [ RUTA DE COLAPSO INMINENTE ]
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Postergar la intervención estructrual hoy es amputarte cuota de mercado mañana. Blinda tu flujo de caja instalando canales de predictibilidad algorítmica. No esperes a que el colapso llegue a la junta directiva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-[#0a0a0a] border border-structure p-8 flex flex-col items-center text-center group hover:border-red-900/50 transition-colors">
            <TrendingDown size={40} className="text-gray-600 group-hover:text-red-500 transition-colors mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">Leads Esfumados</h3>
            <p className="text-gray-400 text-sm font-mono mb-6">
              Oportunidades High-Ticket perdidas por fricción técnica en tu embudo o total falta de autoridad B2B frente a competidores directos.
            </p>
            <div className="mt-auto">
              <span className="block text-2xl font-bold text-red-500 font-mono">~$25k - $50k</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest">Revenue Perdido / Mes</span>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-structure p-8 flex flex-col items-center text-center group hover:border-red-900/50 transition-colors">
            <AlertOctagon size={40} className="text-gray-600 group-hover:text-red-500 transition-colors mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">Ruleta Rusa de Dependencia</h3>
            <p className="text-gray-400 text-sm font-mono mb-6">
              Depender de 3 clientes ancla no es 'estabilidad', es jugar a la ruleta rusa con el P&L. Un solo churn destruirá el 40% de tu operatividad.
            </p>
            <div className="mt-auto">
              <span className="block text-2xl font-bold text-red-500 font-mono">Colapso del 40%</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest">En caso de retención fallida</span>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-structure p-8 flex flex-col items-center text-center group hover:border-red-900/50 transition-colors">
            <Activity size={40} className="text-gray-600 group-hover:text-red-500 transition-colors mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">Valoración Destruida</h3>
            <p className="text-gray-400 text-sm font-mono mb-6">
              Empresas basadas en el fundador (sin sistemas repetibles) se valoran a múltiplos ridículamente bajos ante posibles fusiones o ventas (M&A).
            </p>
            <div className="mt-auto">
              <span className="block text-2xl font-bold text-red-500 font-mono">-3x Múltiplo EBIT</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest">Penalización de M&A</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CostOfInaction;
