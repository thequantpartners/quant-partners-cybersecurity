import React, { useState } from 'react';
import { ChevronRight, Lock, Calendar } from 'lucide-react';

const countryCodes = [
  { code: '+51', flag: '🇵🇪', name: 'PE' },
  { code: '+52', flag: '🇲🇽', name: 'MX' },
  { code: '+34', flag: '🇪🇸', name: 'ES' },
  { code: '+57', flag: '🇨🇴', name: 'CO' },
  { code: '+54', flag: '🇦🇷', name: 'AR' },
  { code: '+56', flag: '🇨🇱', name: 'CL' },
  { code: '+1',  flag: '🇺🇸', name: 'US' },
];

const BookingForm = () => {
  const [step, setStep] = useState(0); // 0 = form, 1 = calendar
  const [formData, setFormData] = useState({ phoneCode: '+51' });
  const [errors, setErrors] = useState({});

  const set = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  const validate = () => {
    const e = {};
    if (!formData.name || formData.name.trim().length < 2) e.name = 'Nombre requerido.';
    if (!formData.email || !formData.email.includes('@')) e.email = 'Correo inválido.';
    if (!formData.phone || formData.phone.replace(/\s/g, '').length < 7) e.phone = 'Teléfono requerido.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (validate()) setStep(1);
  };

  const calUrl = `https://cal.com/the-quant-partners/demo-vsl?name=${encodeURIComponent(formData.name || '')}&email=${encodeURIComponent(formData.email || '')}&phone=${encodeURIComponent((formData.phoneCode || '') + (formData.phone || ''))}`;

  // Calendar visual data
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthName = new Date(year, month, 1).toLocaleString('es', { month: 'long', year: 'numeric' });
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = now.getDate();
  // Build grid cells: nulls for padding + day numbers
  const calCells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  // Simulate some "available" days (not weekends, not past)
  const available = new Set(calCells.filter(d => {
    if (!d) return false;
    const dow = (firstDay + d - 1) % 7;
    return d > today && dow !== 0 && dow !== 6;
  }).slice(0, 8));

  return (
    <div className="w-full max-w-5xl flex flex-col bg-[#0a0a0a] border border-structure font-mono overflow-hidden shadow-[0_0_60px_rgba(0,255,136,0.05)]">

      {/* Step indicator bar */}
      <div className="flex items-center justify-center gap-6 border-b border-structure bg-[#0d0d0d] py-2 px-4 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${step === 0 ? 'bg-signals' : 'bg-signals/40'}`} />
          <span className={`text-xs md:text-sm uppercase tracking-widest ${step === 0 ? 'text-signals' : 'text-gray-600'}`}>
            Identificación Directiva
          </span>
        </div>
        <div className="h-px w-6 bg-structure/50" />
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-signals' : 'bg-structure'}`} />
          <span className={`text-[10px] md:text-xs uppercase tracking-widest ${step === 1 ? 'text-signals' : 'text-gray-600'}`}>
            Reserva tu sesión
          </span>
        </div>
      </div>

      {/* Two-panel body */}
      <div className="flex-1 flex min-h-0 divide-x divide-structure">

        {/* LEFT — Contact form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-7 py-6 gap-4 overflow-y-auto">

          <div>
            <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
              Quant Partners{' '}
              <span className="text-structure font-normal">|</span>{' '}
              <span className="text-signals">Sesión Estratégica C-Level</span>
            </h3>
            <p className="text-sm md:text-base text-gray-500 mt-1">
              Si no encuentra disponibilidad,{' '}
              <a
                href="https://wa.me/message/XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="text-signals underline hover:text-emerald-400 transition-colors"
              >
                escríbenos por WhatsApp
              </a>.
            </p>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <div className={`flex bg-[#111] border ${errors.phone ? 'border-red-600' : 'border-structure'} focus-within:border-signals transition-colors`}>
              <select
                className="bg-transparent text-white px-2 py-3 outline-none border-r border-structure cursor-pointer text-base shrink-0"
                value={formData.phoneCode}
                onChange={e => set('phoneCode', e.target.value)}
              >
                {countryCodes.map(c => (
                  <option key={c.code} value={c.code} className="bg-[#111]">
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={e => set('phone', e.target.value.replace(/[^0-9\s]/g, ''))}
                placeholder="Teléfono / WhatsApp *"
                className="w-full bg-transparent text-white px-3 py-3 focus:outline-none font-sans text-base min-w-0 placeholder-gray-600"
              />
            </div>
            {errors.phone && <span className="text-red-500 text-[9px]">{errors.phone}</span>}
          </div>

          {/* Name */}
          <div className="flex flex-col gap-1">
            <input
              type="text"
              value={formData.name || ''}
              onChange={e => set('name', e.target.value)}
              placeholder="Nombre completo *"
              className={`w-full bg-[#111] border ${errors.name ? 'border-red-600' : 'border-structure'} focus:border-signals text-white px-3 py-3 focus:outline-none transition-colors font-sans text-base placeholder-gray-600`}
            />
            {errors.name && <span className="text-red-500 text-[9px]">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <input
              type="email"
              value={formData.email || ''}
              onChange={e => set('email', e.target.value)}
              placeholder="Correo corporativo *"
              className={`w-full bg-[#111] border ${errors.email ? 'border-red-600' : 'border-structure'} focus:border-signals text-white px-3 py-3 focus:outline-none transition-colors font-sans text-base placeholder-gray-600`}
            />
            {errors.email && <span className="text-red-500 text-[9px]">{errors.email}</span>}
          </div>

          {/* Privacy note */}
          <p className="text-sm text-gray-600 leading-relaxed">
            Al continuar, aceptas que tus datos sean procesados conforme a nuestra{' '}
            <span className="underline cursor-pointer text-gray-500 hover:text-signals transition-colors">Política de Privacidad</span>
            {' '}y{' '}
            <span className="underline cursor-pointer text-gray-500 hover:text-signals transition-colors">Términos de Uso</span>.
          </p>

          {/* Submit */}
          <button
            onClick={handleContinue}
            className="flex items-center justify-center gap-2 bg-signals text-background px-4 py-3.5 font-bold uppercase tracking-widest text-base hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(0,255,136,0.15)] hover:shadow-[0_0_25px_rgba(0,255,136,0.35)]"
          >
            Continuar
            <ChevronRight size={14} />
          </button>
        </div>

        {/* RIGHT — Calendar */}
        <div className="hidden md:flex md:w-1/2 flex-col relative overflow-hidden">
          {step === 1 ? (
            <iframe
              src={calUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              title="Reserva tu sesión"
              className="flex-1"
            />
          ) : (
            /* Locked calendar — real visual + overlay */
            <div className="flex-1 flex flex-col bg-[#0d0d0d] relative overflow-hidden">

              {/* Calendar visual (blurred + dimmed) */}
              <div className="absolute inset-0 flex flex-col p-4 blur-[0.5px] opacity-65 pointer-events-none select-none">
                {/* Month header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-widest capitalize">{monthName}</span>
                  <div className="flex gap-2">
                    <span className="text-gray-600 text-xs">‹</span>
                    <span className="text-gray-600 text-xs">›</span>
                  </div>
                </div>
                {/* Day headers */}
                <div className="grid grid-cols-7 mb-1">
                  {['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'].map(d => (
                    <div key={d} className="text-center font-mono text-[9px] text-gray-600 py-1">{d}</div>
                  ))}
                </div>
                {/* Day cells */}
                <div className="grid grid-cols-7 gap-y-1 flex-1">
                  {calCells.map((day, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-center text-[11px] font-mono rounded-sm py-1.5 ${
                        !day ? '' :
                        day === today ? 'text-white' :
                        available.has(day) ? 'text-gray-400' :
                        'text-gray-600'
                      }`}
                    >
                      {day || ''}
                    </div>
                  ))}
                </div>
              </div>

              {/* Lock overlay — sin fondo general, solo el texto tiene backdrop */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
                <div className="flex flex-col items-center gap-3 bg-[#0d0d0d]/80 px-6 py-4 border border-structure/30">
                  <div className="w-10 h-10 border border-structure/60 bg-[#111] flex items-center justify-center">
                    <Lock size={18} className="text-gray-500" />
                  </div>
                  <p className="font-mono text-sm text-gray-400 text-center leading-relaxed">
                    Complete el formulario para<br />
                    <span className="text-signals font-bold">desbloquear su franja horaria</span>.
                  </p>
                  <div className="flex items-center gap-1.5 text-[9px] text-gray-600 uppercase tracking-widest font-mono">
                    <Calendar size={10} />
                    Agenda protegida · Acceso restringido
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer bar */}
      <div className="shrink-0 border-t border-structure bg-[#0d0d0d] px-4 py-1.5 flex items-center justify-between">
        <span className="text-[8px] md:text-[9px] text-gray-700 uppercase tracking-widest">// Quant Partners · Acceso C-Level</span>
        <span className="flex items-center gap-1 text-[8px] md:text-[9px] text-signals/60 uppercase tracking-widest">
          <span className="w-1 h-1 rounded-full bg-signals/60 animate-pulse" />
          Encriptación P2P activa
        </span>
      </div>
    </div>
  );
};

export default BookingForm;
