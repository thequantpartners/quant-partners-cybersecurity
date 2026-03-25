import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, AlertTriangle, ChevronRight, Check } from 'lucide-react';
import { jsPDF } from "jspdf";

const questionBlocks = [
  {
    step: 0,
    title: "IDENTIFICACIÓN DEL OBJETIVO",
    questions: [
      { id: 'name', type: 'text', label: 'Nombre Completo', placeholder: 'Ej: Ing. Carlos Mendoza' },
      { id: 'email', type: 'email', label: 'Correo Corporativo', placeholder: 'carlos@empresa.com' },
      { id: 'phone', type: 'phone', label: 'Teléfono Móvil (WhatsApp)' }
    ]
  },
  {
    step: 1,
    title: "BLOQUE 1: CONTEXTO EMPRESARIAL",
    questions: [
      { id: 'q1', type: 'textarea', label: '1. Describe tu empresa en una sola frase (como se la explicarías a un CISO).' },
      { id: 'q2', type: 'checkbox', label: '2. ¿Qué tipo de servicios ofreces actualmente?', options: ['MSSP (Seguridad gestionada)', 'Compliance (SOC2, ISO 27001, HIPAA, etc.)', 'Cloud Security', 'OT / Industrial Security', 'Incident Response / Forense', 'IAM / Identity', 'Otro'] }
    ]
  },
  {
    step: 2,
    title: "BLOQUE 1: CONTEXTO EMPRESARIAL",
    questions: [
      { id: 'q3', type: 'radio', label: '3. ¿Cuál es tu ticket promedio por contrato?', options: ['$10K – $30K', '$30K – $75K', '$75K – $150K', '$150K+'] },
      { id: 'q4', type: 'radio', label: '4. ¿Cuántos empleados tiene tu empresa actualmente?', options: ['1–10', '10–25', '25–50', '50+'] }
    ]
  },
  {
    step: 3,
    title: "BLOQUE 2: GENERACIÓN DE INGRESOS",
    questions: [
      { id: 'q5', type: 'textarea', label: '5. ¿De dónde vienen la mayoría de tus clientes hoy? (Sé específico)' },
      { id: 'q6', type: 'radio', label: '6. Si mañana dejaras de recibir referidos, ¿qué pasaría con tu pipeline?', options: ['Se detendría completamente', 'Bajaría significativamente', 'Se mantendría estable', 'No depende de referidos'] }
    ]
  },
  {
    step: 4,
    title: "BLOQUE 2: GENERACIÓN DE INGRESOS",
    questions: [
      { id: 'q7', type: 'radio', label: '7. ¿Tienes actualmente un sistema estructurado de ventas outbound?', options: ['Sí, funciona de forma predecible', 'Sí, pero es inconsistente', 'No, dependemos de inbound/referidos'] },
      { id: 'q8', type: 'number', label: '8. ¿Cuántas oportunidades calificadas (reuniones con decisores reales) generas al mes aprox?' }
    ]
  },
  {
    step: 5,
    title: "BLOQUE 3: MADUREZ COMERCIAL",
    questions: [
      { id: 'q9', type: 'radio', label: '9. ¿Tienes playbooks de ventas documentados y repetibles?', options: ['Sí', 'Parcialmente', 'No'] },
      { id: 'q10', type: 'radio', label: '10. ¿Quién lidera hoy la generación de ingresos?', options: ['Founder / CEO', 'Equipo comercial', 'Agencia externa', 'No hay responsable claro'] }
    ]
  },
  {
    step: 6,
    title: "BLOQUE 3 Y 4: DOLOR",
    questions: [
      { id: 'q11', type: 'radio', label: '11. ¿Has trabajado antes con agencias o freelancers de marketing/lead gen?', options: ['Sí (funcionó)', 'Sí (no funcionó)', 'No'] },
      { id: 'q12', type: 'textarea', label: '12. ¿Cuál es hoy tu mayor frustración en términos de crecimiento?' }
    ]
  },
  {
    step: 7,
    title: "BLOQUE 4: DOLOR REAL",
    questions: [
      { id: 'q13', type: 'radio', label: '13. ¿Qué tan predecible es tu revenue mes a mes?', options: ['Muy predecible', 'Moderadamente', 'Nada predecible'] },
      { id: 'q14', type: 'radio', label: '14. ¿Sientes que empresas "peores técnicamente" están creciendo más rápido que tú?', options: ['Sí', 'No', 'No estoy seguro'] }
    ]
  },
  {
    step: 8,
    title: "BLOQUE 5: AMBICIÓN Y EXPANSIÓN",
    questions: [
      { id: 'q15', type: 'radio', label: '15. ¿Estás interesado en expandirte a otros mercados (México, Colombia, España, etc.)?', options: ['Sí activamente', 'Sí, pero no sabemos cómo', 'No por ahora'] },
      { id: 'q16', type: 'textarea', label: '16. Si tuvieras un sistema predecible de adquisición, ¿cuál sería tu objetivo en 12 meses? (Ingresos / Clientes / Mercados)' }
    ]
  },
  {
    step: 9,
    title: "BLOQUE 6: EXCLUSIVIDAD",
    questions: [
      { id: 'q17', type: 'radio', label: '17. Trabajamos con un solo partner por categoría y región. Es decir, tus competidores quedarían fuera. ¿Qué tan valioso sería esto para ti?', options: ['Muy valioso', 'Interesante', 'No relevante'] },
      { id: 'q18', type: 'radio', label: '18. ¿Estás en posición de invertir en construir un sistema propio de adquisición si identificamos una oportunidad clara?', options: ['Sí', 'Depende', 'No'] }
    ]
  },
  {
    step: 10,
    title: "BLOQUE 7: CALIFICACIÓN FINAL",
    questions: [
      { id: 'q19', type: 'radio', label: '19. ¿Quién toma la decisión final en este tipo de iniciativas?', options: ['Yo', 'Socios', 'Directorio'] }
    ]
  }
];

const countryCodes = [
  { code: '+52', flag: '🇲🇽', name: 'MX' },
  { code: '+34', flag: '🇪🇸', name: 'ES' },
  { code: '+57', flag: '🇨🇴', name: 'CO' },
  { code: '+54', flag: '🇦🇷', name: 'AR' },
  { code: '+56', flag: '🇨🇱', name: 'CL' },
  { code: '+51', flag: '🇵🇪', name: 'PE' },
  { code: '+1', flag: '🇺🇸', name: 'US' },
  { code: '+...', flag: '🌐', name: 'Otr' }
];

const QualificationWizard = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({ phoneCode: '+52' });
  const [error, setError] = useState('');
  const [booting, setBooting] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showRejection, setShowRejection] = useState(false);
  
  const REQUIRED_SCORE = 90;
  
  // Terminal Boot simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!booting && !showCalendar) {
      setTimeout(() => {
        document.getElementById('wizard-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [booting, showCalendar]);

  const calculateScore = () => {
    let score = 0;
    // Basic text length heuristics
    const textFields = ['q1', 'q5', 'q12', 'q16'];
    textFields.forEach(field => {
      if (formData[field] && formData[field].length > 50) score += 10;
      else if (formData[field] && formData[field].length > 15) score += 5;
    });

    // High value options
    if (formData.q3 === '$150K+') score += 20;
    if (formData.q3 === '$75K – $150K') score += 15;
    
    if (formData.q11 === 'Sí (no funcionó)') score += 10; // Pain point detected
    if (formData.q13 === 'Nada predecible') score += 10;
    
    if (formData.q17 === 'Muy valioso') score += 10;
    if (formData.q18 === 'Sí') score += 15;
    if (formData.q19 === 'Yo') score += 10;

    return score;
  };

  const validateStep = () => {
    setError('');
    const currentQuestions = questionBlocks[currentStep].questions;
    
    // Step 0 - Heavy Anti-Spam Validation
    if (currentStep === 0) {
      if (!formData.name || formData.name.length < 3) return 'Nombre inválido.';
      if (!formData.email || !formData.email.includes('@')) return 'Correo inválido.';
      if (!formData.phone || formData.phone.length < 7) return 'Teléfono inválido.';
      
      // Blacklist / Spam check
      const nameLower = formData.name.toLowerCase();
      if (['test', 'asd', 'qwe', 'fake', 'pepito', '123'].some(spam => nameLower.includes(spam))) {
        return 'Entrada rechazada por filtros de integridad.';
      }
      
      // Repeating chars check (aaaa, 111111)
      if (/^(.)\1{4,}$/.test(formData.name) || /^(.)\1{5,}$/.test(formData.phone)) {
        return 'Patrón anómalo detectado en los datos.';
      }
    }

    // Generic Required validation for standard questions
    for (let q of currentQuestions) {
      if (q.id === 'phone' || q.id === 'name' || q.id === 'email') continue;
      
      if (q.type === 'checkbox') {
        if (!formData[q.id] || formData[q.id].length === 0) {
          return 'Debes seleccionar al menos una opción.';
        }
      } else {
        if (!formData[q.id] || formData[q.id].trim() === '') {
          return 'Todos los campos de esta fase son obligatorios.';
        }
      }
    }
    
    return null;
  };

  const handleNext = async () => {
    const errorMsg = validateStep();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    if (currentStep < questionBlocks.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Final Step: Submit
      setIsSubmitting(true);
      const score = calculateScore();
      
      if (score >= REQUIRED_SCORE) {
        const payload = { ...formData, score, submittedAt: new Date().toISOString() };
        
        try {
          await fetch('https://hook.us2.make.com/swo7wp98ha9mmlkjla0zjz7csfi6mvw7', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        } catch (err) {
          console.error("Webhook submission error:", err);
        }
        
        setIsSubmitting(false);
        setShowCalendar(true);
      } else {
        // Disqualified Lead
        setIsSubmitting(false);
        setShowRejection(true);
      }
    }
  };

  const handleInputChange = (id, value, isCheckbox = false) => {
    if (isCheckbox) {
      const currentList = formData[id] || [];
      const newList = currentList.includes(value) 
        ? currentList.filter(item => item !== value)
        : [...currentList, value];
      setFormData(prev => ({ ...prev, [id]: newList }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  if (booting) {
    return (
      <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center font-mono">
        <div className="text-signals text-xl md:text-2xl animate-pulse">
          {'>'} Inicializando protocolo de pre-calificación...
        </div>
      </div>
    );
  }

  if (showCalendar) {
    return (
      <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center pt-12 px-4 overflow-y-auto scanline">
        <div className="w-full max-w-4xl bg-[#111] border border-structure rounded-lg shadow-2xl p-4 md:p-8 relative">

          
          <div className="text-center mb-8 pt-8">
            <h2 className="text-3xl font-bold text-white mb-2">Diagnóstico Aprobado</h2>
            <p className="text-signals font-mono">Reserva tu sesión estratégica a continuación.</p>
          </div>
          
          <div className="w-full h-[600px] border border-structure rounded overflow-hidden">
            <iframe 
              src={`https://cal.com/the-quant-partners/demo-vsl?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`}
              width="100%" 
              height="100%" 
              frameBorder="0"
              title="Cal.com Scheduling"
            ></iframe>
          </div>
        </div>
      </div>
    );
  }

  const handleDownloadDiagnostic = () => {
    const doc = new jsPDF();
    
    // Configuración estética
    doc.setFillColor(5, 5, 5); // Fondo #050505
    doc.rect(0, 0, 210, 297, 'F');
    
    doc.setTextColor(0, 255, 136); // Texto #00FF88
    doc.setFont("courier", "bold");
    doc.setFontSize(22);
    doc.text("QUANT INFRASTRUCTURE", 105, 30, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text("DOCUMENTO DE EJECUCIÓN CLAVE", 105, 45, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(`Lead ID: ${formData.name ? formData.name.toUpperCase() : 'UNKNOWN'} | Fecha: ${new Date().toLocaleDateString()}`, 105, 55, { align: 'center' });

    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 255, 136);
    doc.line(20, 65, 190, 65);

    let yPos = 80;
    
    const addRecommendation = (title, analysis, action) => {
      if (yPos > 250) {
        doc.addPage();
        doc.setFillColor(5, 5, 5);
        doc.rect(0, 0, 210, 297, 'F');
        yPos = 30;
      }
      // Título de la Falla
      doc.setFont("courier", "bold");
      doc.setFontSize(13);
      doc.setTextColor(255, 80, 80);
      doc.text(`[ ESTADO CRÍTICO ] ${title}`, 20, yPos);
      yPos += 7;
      
      // Análisis
      doc.setFont("courier", "normal");
      doc.setFontSize(11);
      doc.setTextColor(200, 200, 200);
      const splitAnalysis = doc.splitTextToSize(`DIAGNÓSTICO: ${analysis}`, 170);
      doc.text(splitAnalysis, 20, yPos);
      yPos += (splitAnalysis.length * 6) + 4;
      
      // Acción de mitigación
      doc.setFont("courier", "bold");
      doc.setTextColor(0, 255, 136);
      const splitAction = doc.splitTextToSize(`EJECUCIÓN: ${action}`, 170);
      doc.text(splitAction, 20, yPos);
      yPos += (splitAction.length * 6) + 14;
    };

    // Diagnostics logic based on answers
    let addedCount = 0;
    
    // 1. Ticket Mínimo (Q3)
    if (formData.q3 === '$10K – $30K' || formData.q3 === '$30K – $75K') {
      addRecommendation(
        "Empaquetamiento Carente de Valor Core", 
        "Tus tickets promedio no corresponden a la responsabilidad y riesgo corporativo que asumes en ciberseguridad. Cobrar por herramientas o soporte técnico frena tu escala radicalmente.", 
        "Reestructura tu modelo de pricing. Crea ofertas 'High-Ticket' empaquetando tus servicios alrededor del Resultado Final del cliente (Continuidad de Negocio y Compliance) para multiplicar drásticamente tu LTV."
      );
      addedCount++;
    }

    // 2. Dependencia o Inconsistencia (Q6 o Q7)
    if ((formData.q6 && (formData.q6.includes('Se detendría') || formData.q6.includes('Bajaría'))) || (formData.q7 && (formData.q7.includes('inconsistente') || formData.q7.includes('No, dependemos')))) {
      addRecommendation(
        "Infraestructura de Adquisición Expuesta", 
        "Tu canal de ventas depende orgánicamente de referencias y esfuerzos pasivos. Esperar que los clientes vengan a ti en el entorno B2B Enterprise te hace ceder el control matemático de tu negocio.", 
        "Instala un sistema Outbound in-house. Diseña secuencias hiper-personalizadas dirigidas exclusivamente a tu ICP, eliminando dependencias de tu network actual."
      );
      addedCount++;
    }

    // 3. Sistematicidad (Q9)
    if (formData.q9 === 'No' || formData.q9 === 'Parcialmente') {
      addRecommendation(
        "Carencia de Playbooks Comerciales", 
        "El talento y conocimiento de ventas está centralizado en el equipo fundador. Tu empresa escala basándose en la genialidad individual y no en los rieles controlables de un proceso documentado.", 
        "Detén la improvisación comercial. Detalla manuales de descubrimiento, manejo de objeciones lógicas y transiciones de cierre puro para desvincular a los líderes del proceso rutinario."
      );
      addedCount++;
    }

    // 4. Percepción del Mercado (Q14)
    if (formData.q14 === 'Sí') {
      addRecommendation(
        "Falla de Posicionamiento Competitivo", 
        "Empresas técnicamente inferiores te están arrebatando mercado. Esto ocurre porque su narrativa comercial está diseñada para C-Levels, mientras que tu mensaje solo atrae a técnicos y genera fricción.", 
        "Pivotea tu narrativa: aleja tu léxico de features o herramientas. Transiciona el 100% hacia reducción probabilística de riesgo, velocidad operativa y protección frente a reguladores."
      );
      addedCount++;
    }

    // 5. Predictibilidad (Q13)
    if (formData.q13 === 'Nada predecible' || formData.q13 === 'Moderadamente') {
      addRecommendation(
        "Previsión Constante en Nivel Crítico (MRR Inestable)", 
        "Operar sin una métrica de previsibilidad asfixia tu capacidad de reinversión. Tu crecimiento actual asume riesgos ciegos sin saber de dónde provendrá el siguiente cierre pesado.", 
        "Asume control estricto: incorpora variables medibles como SQLs generados vs SQLs cerrados. Debes saber a inicios de mes, con un margen ínfimo de error, cuánto capital vas a facturar."
      );
      addedCount++;
    }

    // 6. Ambición y Escala (Q15)
    if (formData.q15 === 'No por ahora' || formData.q15 === 'Sí, pero no sabemos cómo') {
      addRecommendation(
        "Bloqueo en Vehículos de Expansión Geográfica", 
        "Limitarte a tu esfera local reduce agresivamente tu mercado disponible, lo que permite a competidores ágiles consolidar fronteras de alto valor como México o España antes que tú.", 
        "La adquisición digital avanzada ignora las fronteras. Diseña ofertas desacopladas de geografía y activa un pipeline remoto enfocado en cerrar reuniones internacionales mañana mismo."
      );
      addedCount++;
    }

    if (addedCount === 0) {
      addRecommendation(
        "Sub-Optimización de Arquitectura B2B a Escala", 
        "Con un perfil operativo aceptable, el cruce general de tus métricas (fricción en decisión y bajo perfil de LTV) indica que no estás apalancándote al máximo para la hiper-escala.", 
        "Activa un proceso de 'hardening comercial'. Desecha métricas pasivas, audita exhaustivamente tus márgenes por contrato e implementa tácticas exclusivas B2B Enterprise para depurar tu base de prospectos."
      );
    }

    doc.setFont("courier", "italic");
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("Este documento fue generado automáticamente por el Sistema Quant.", 105, 280, { align: 'center' });

    doc.save("Diagnostico_Quant_Partners.pdf");
  };

  if (showRejection) {
    return (
      <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center pt-24 md:justify-center font-mono p-4 md:p-6 text-center scanline overflow-y-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-red-500 mb-8 tracking-widest uppercase">
          Lamentamos que no hayas aplicado
        </h2>
        
        <div className="w-full max-w-3xl border border-structure bg-[#111] p-6 md:p-12 shadow-2xl relative">
          <p className="text-white text-lg md:text-2xl font-bold leading-relaxed text-left mb-6 font-sans">
            Solo trabajamos con clientes muy calificados, porque queremos asegurarnos de darles resultados.
          </p>
          <div className="h-px w-full bg-structure mb-6"></div>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed text-left font-sans">
            Como compensación por tu tiempo invertido, te regalaremos un{' '}
            <strong className="text-signals font-bold font-mono">Documento de ejecución clave</strong>
            {' '}que puedes aplicar para que mejores en base a tus respuestas.
          </p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center w-full max-w-xl">
          <button 
            onClick={handleDownloadDiagnostic}
            className="flex items-center justify-center gap-3 bg-signals text-background px-10 py-5 font-bold uppercase transition-shadow hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] cursor-pointer tracking-wider text-base md:text-lg w-full"
          >
            [ Descarga tu diagnóstico ]
          </button>
        </div>
      </div>
    );
  }

  const currentBlock = questionBlocks[currentStep];

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex flex-col items-center pt-8 md:pt-16 px-4 overflow-y-auto font-mono scanline">
      {/* Red Banner Requirement */}
      <div className="w-full max-w-4xl border-2 border-dashed border-red-600 bg-red-950/30 p-4 text-center mb-12 flex items-center justify-center gap-4">
        <AlertTriangle className="text-red-500 hidden md:block" />
        <p className="text-red-500 font-bold text-sm md:text-base">
          Si tu empresa no pertenece al ecosistema de ciberseguridad o sus subnichos, este sistema no está diseñado para ti.
        </p>
      </div>

      <div id="wizard-content" className="w-full max-w-3xl bg-[#0a0a0a] border border-structure rounded-sm shadow-2xl flex flex-col">
        {/* Header Tabs Simulation */}
        <div className="flex border-b border-structure bg-[#111]">
          <div className="flex-1 text-center py-4 border-b-2 border-signals text-signals font-bold flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-signals rounded-full animate-pulse"></div>
            Llene el formulario
          </div>
          <div className="flex-1 text-center py-4 text-structure font-bold flex items-center justify-center gap-2 opacity-50">
            Reserva tu evento
          </div>
        </div>

        {/* Wizard Body */}
        <div className="p-6 md:p-12">
          <p className="text-signals text-xs font-bold mb-8 uppercase tracking-widest border-l-2 border-signals pl-2">
            ITERACIÓN: 0{currentStep + 1} / {questionBlocks.length}
            <br/><span className="text-structure">{currentBlock.title}</span>
          </p>

          <div className="space-y-10">
            {currentBlock.questions.map(q => (
              <div key={q.id} className="flex flex-col gap-4">
                <label className="text-white font-bold text-lg md:text-xl">
                  {q.label}
                </label>

                {q.type === 'text' || q.type === 'email' || q.type === 'number' ? (
                  <input 
                    type={q.type}
                    value={formData[q.id] || ''}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    placeholder={q.placeholder || ''}
                    className="w-full bg-[#111] border border-structure text-white px-4 py-4 focus:outline-none focus:border-signals transition-colors placeholder-gray-700"
                  />
                ) : null}

                {q.type === 'phone' ? (
                  <div className="flex bg-[#111] border border-structure focus-within:border-signals transition-colors">
                    <select 
                      className="bg-transparent text-white px-4 py-4 outline-none border-r border-structure cursor-pointer"
                      value={formData.phoneCode || '+52'}
                      onChange={(e) => handleInputChange('phoneCode', e.target.value)}
                    >
                      {countryCodes.map(c => (
                        <option key={c.code} value={c.code} className="bg-background">
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <input 
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value.replace(/[^0-9\s]/g, ''))}
                      placeholder="Número de celular"
                      className="w-full bg-transparent text-white px-4 py-4 focus:outline-none"
                    />
                  </div>
                ) : null}

                {q.type === 'textarea' ? (
                  <textarea 
                    rows={4}
                    value={formData[q.id] || ''}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    className="w-full bg-[#111] border border-structure text-white px-4 py-4 focus:outline-none focus:border-signals transition-colors placeholder-gray-700 resize-none"
                  />
                ) : null}

                {q.type === 'radio' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map(opt => {
                      const isSelected = formData[q.id] === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => handleInputChange(q.id, opt)}
                          className={`flex items-center text-left gap-3 p-4 border transition-all duration-200 ${
                            isSelected ? 'border-signals bg-signals/10 text-signals' : 'border-structure text-gray-400 hover:border-gray-500'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-signals bg-signals' : 'border-gray-600'}`}>
                            {isSelected && <div className="w-2 h-2 bg-background rounded-full"></div>}
                          </div>
                          <span className="flex-1">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                {q.type === 'checkbox' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map(opt => {
                      const isSelected = (formData[q.id] || []).includes(opt);
                      return (
                        <button
                          key={opt}
                          onClick={() => handleInputChange(q.id, opt, true)}
                          className={`flex items-center text-left gap-3 p-4 border transition-all duration-200 ${
                            isSelected ? 'border-signals bg-signals/10 text-signals' : 'border-structure text-gray-400 hover:border-gray-500'
                          }`}
                        >
                          <div className={`w-5 h-5 border flex items-center justify-center ${isSelected ? 'border-signals bg-signals' : 'border-gray-600'}`}>
                            {isSelected && <Check size={14} className="text-background" />}
                          </div>
                          <span className="flex-1">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : null}

              </div>
            ))}
          </div>

          {error && (
            <div className="mt-8 p-4 bg-red-950/50 border-l-4 border-red-600 text-red-500 flex items-center gap-3">
              <ShieldAlert size={20} />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-12 flex justify-between items-center border-t border-structure pt-8">
            <span className="text-structure text-sm">
              Análisis Heurístico Activo // ENCRIPTADO
            </span>
            
            <button 
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-signals text-background px-8 py-4 font-bold uppercase transition-shadow hover:shadow-[0_0_20px_rgba(0,255,136,0.4)]"
            >
              {isSubmitting ? 'Procesando...' : 'Siguiente Módulo'}
              {!isSubmitting && <ChevronRight size={20} />}
            </button>
          </div>
        </div>
      </div>
      <div className="h-24"></div>
    </div>
  );
};

export default QualificationWizard;
