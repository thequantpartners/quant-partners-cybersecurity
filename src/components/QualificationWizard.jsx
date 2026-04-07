import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, AlertTriangle, ChevronRight, Check } from 'lucide-react';
import { jsPDF } from "jspdf";

const questionBlocks = [
  {
    step: 0,
    title: "IDENTIFICACIÓN DIRECTIVA",
    questions: [
      { id: 'name', type: 'text', label: 'Nombre Completo', placeholder: 'Ej: Ing. Carlos Mendoza' },
      { id: 'email', type: 'email', label: 'Correo Corporativo', placeholder: 'carlos@empresa.com' },
      { id: 'phone', type: 'phone', label: 'Teléfono Móvil (WhatsApp)' }
    ]
  },
  {
    step: 1,
    title: "FILTRO 1: AUTORIDAD CORPORATIVA",
    questions: [
      { id: 'q1', type: 'radio', label: '1. ¿Cuál es tu rol exacto y nivel de autoridad financiera corporativa?', options: ['CEO / Founder (Tengo control absoluto del P&L)', 'CISO / Director de IT (Con presupuesto aprobado)', 'Personal Operativo / Analista (No decido presupuestos)', 'Investigando opciones para reportar a mi superior'] },
      { id: 'q2', type: 'radio', label: '2. Sinceramente, ¿tienen hoy la liquidez reservada para invertir $+40k USD en la reestructuración de su infraestructura comercial si demostramos un ROI certero?', options: ['Sí, el capital está disponible para ejecución inmediata', 'No, actualmente operamos con flujo de caja crítico', 'Depende de la evaluación y aprobación de una junta'] }
    ]
  },
  {
    step: 2,
    title: "FILTRO 2: IMPACTO FINANCIERO / LTV",
    questions: [
      { id: 'q3', type: 'radio', label: '3. Si mañana tus 3 clientes ancla (Key Accounts) deciden no renovar contrato, ¿qué porcentaje de facturación desaparece y cuántos meses de runway (liquidez) te quedan?', options: ['Colapso inminente (Runway < 3 meses)', 'Impacto severo (Runway 3-6 meses)', 'Impacto mínimo (Runway > 12 meses)'] },
      { id: 'q4', type: 'radio', label: '4. ¿En qué rango se encuentra el Ticket Promedio (LTV estimado) de sus contratos actuales?', options: ['$10K – $30K (Bajo Riesgo)', '$30K – $75K', '$75K – $150K', 'Más de $150K (Infraestructuras Críticas)'] }
    ]
  },
  {
    step: 3,
    title: "FILTRO 3: PREVISIBILIDAD COMERCIAL",
    questions: [
      { id: 'q5', type: 'radio', label: '5. ¿Qué tan predecible es la métrica de tus nuevas oportunidades empresariales (SQLs calificados) mes a mes?', options: ['Control Absoluto (Sé que cerraremos X contratos el mes que viene)', 'Inconsistente (El crecimiento fluctúa por picos y valles)', 'Operación a ciegas (Dependemos 100% de la suerte o referidos)'] },
      { id: 'q6', type: 'textarea', label: '6. Sinceridad absoluta: ¿Cuántos cierres B2B reales lograste el mes pasado que NO provinieran de referidos orgánicos? (Explica la matemática de tu adquisición actual)' }
    ]
  },
  {
    step: 4,
    title: "FILTRO 4: CUELLO DE BOTELLA ESTRUCTURAL",
    questions: [
      { id: 'q7', type: 'textarea', label: '7. Sé crudo y directo: ¿Cuál es el punto único de fallo operativo (SPOF) o cuello de botella estructural logístico que está impidiendo a tu empresa facturar un 50% más este año sin colapsar?' },
      { id: 'q8', type: 'textarea', label: '8. Sincérate: ¿Cuántas horas a la semana de tus ingenieros o perfiles técnicos de élite se están desperdiciando hoy en llamadas de venta inútiles o atendiendo leads basura traídos por agencias genéricas?' }
    ]
  },
  {
    step: 5,
    title: "FILTRO 5: SANGRADO IN-HOUSE Y RENDIMIENTO",
    questions: [
      { id: 'q9', type: 'radio', label: '9. ¿Cuánto estimas que inviertes (y pierdes) anualmente en rotación, entrenamiento y errores de tu personal técnico o comercial in-house?', options: ['Más de $100k USD al año', 'Entre $30k y $100k USD', 'Menos de $30k USD', 'No tengo personal in-house relevante'] },
      { id: 'q10', type: 'radio', label: '10. Si audito a escondidas tus llamadas de venta comerciales de la última semana, ¿qué porcentaje sigue un playbook riguroso paso a paso?', options: ['0% al 20% (Todo es improvisación)', '20% al 60% (Inconsistente)', '60% al 90% (Mayormente estandarizado)', '100% Control de Calidad Estricto'] }
    ]
  },
  {
    step: 6,
    title: "FILTRO 6: COMPLIANCE Y MARGEN",
    questions: [
      { id: 'q11', type: 'textarea', label: '11. Poniendo los números sobre la mesa: ¿Cuál es el Costo de Adquisición de Clientes (CAC) blended que manejas hoy, y cuántos meses tardas en recuperar esa inversión (Payback Period) para alcanzar rentabilidad neta?' },
      { id: 'q12', type: 'radio', label: '12. ¿Cuál es el Gross Margin (Margen Bruto) operativo con el que trabajas después de costos de licencias SaaS e infraestructura base?', options: ['Menos del 30%', 'Entre 30% y 50%', 'Entre 50% y 70%', 'Más del 70%'] }
    ]
  },
  {
    step: 7,
    title: "FILTRO 7: RIESGO Y ESCALA",
    questions: [
      { id: 'q13', type: 'textarea', label: '13. El 80% de los MSSPs y firmas Tech no logran cruzar la barrera del $1M ARR por depender pasivamente del networking del fundador. ¿Qué estás haciendo HOY específicamente para abandonar esa dependencia y escalar orgánicamente?' },
      { id: 'q14', type: 'radio', label: '14. A nivel de Pipeline Comercial: Del 100% de las propuestas B2B High-Ticket que emites, ¿cuál es tu Win-Rate exacto, y qué porcentaje de tratos se caen por Ghosting o falta de autoridad frente al decisor?', options: ['Win Rate < 10% (Alto Ghosting)', 'Win Rate 10% - 25% (Fricción moderada)', 'Win Rate > 25% (Alta conversión)', 'No mido mi Win Rate ni el Ghosting'] }
    ]
  },
  {
    step: 8,
    title: "FILTRO 8: BOARD Y ESTRATEGIA DIRECTIVA",
    questions: [
      { id: 'q15', type: 'textarea', label: '15. ¿Cuáles son los 3 KPIs (Key Performance Indicators) exactos, numéricos y directos que le reportas a la junta directiva (o con los que evalúas tu propio éxito de CEO) cada 90 días?' },
      { id: 'q16', type: 'radio', label: '16. Si una métrica crítica revela que tus procesos actuales son basura y están perdiendo dinero, ¿tienes la autoridad de destruir esos procesos "legacy" de la noche a la mañana?', options: ['Sí, corto con la ineficiencia de inmediato', 'No, es un proceso burocrático cambiar algo', 'Típicamente intentamos parchar el proceso actual'] }
    ]
  },
  {
    step: 9,
    title: "FILTRO 9: VELOCIDAD Y COMPROMISO C-LEVEL",
    questions: [
      { id: 'q17', type: 'radio', label: '17. La construcción real requiere sudor táctico. ¿Dispones de 5 a 6 horas inamovibles a la semana, a nivel directivo, para supervisar arquitecturas P&L y corregir cuellos de botella?', options: ['Sí, lo agendo hoy mismo', 'Probablemente, depende de emergencias', 'No, delego completamente todo', 'Físicamente imposible en mi agenda actual'] },
      { id: 'q18', type: 'textarea', label: '18. La barrera final: ¿Por qué deberíamos invertir 90 días cerrados de nuestro equipo de ingeniería e infraestructura de $+40k en tu empresa y no irnos a trabajar con tu principal competidor? (Véndenos por qué valen la pena el riesgo operativo)' }
    ]
  },
  {
    step: 10,
    title: "FILTRO 10: TÁCTICA Y URGENCIA FINANCIERA",
    questions: [
      { id: 'q19', type: 'textarea', label: '19. El mercado IT se comoditiza rápidamente. Si busco a tus últimos 5 prospectos Enterprise que NO te compraron, ¿cuál dirían que fue tu objeción real a mis espaldas? (Ej: Falta de diferenciación, precio, incomprensión de la oferta).' },
      { id: 'q20', type: 'textarea', label: '20. ¿Por qué instalar una arquitectura de ventas predictiva es un proyecto de supervivencia corporativa para ESTE trimestre y no para el siguiente año? ¿Cuánto dinero perderás por costo de oportunidad si aplazas esta decisión 6 meses más?' }
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
  
  const REQUIRED_SCORE = 150; // Elevated given the massive amount of questions
  
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
  }, [booting, showCalendar, currentStep]);

  const calculateScore = () => {
    let score = 0;
    
    // Rol (C-Level Audit) - Bloqueo de técnicos
    if (formData.q1 && formData.q1.includes('CEO')) score += 30;
    if (formData.q1 && formData.q1.includes('CISO')) score += 20;
    if (formData.q1 && formData.q1.includes('Personal Operativo')) score -= 150; // Rechazo absoluto
    if (formData.q1 && formData.q1.includes('Investigando')) score -= 150; 

    // Presupuesto y Autoridad
    if (formData.q2 && formData.q2.includes('disponible')) score += 25;
    if (formData.q2 && formData.q2.includes('flujo de caja crítico')) score -= 60;
    if (formData.q2 && formData.q2.includes('junta')) score -= 15;

    // Dependencia y Riesgo Crítico
    if (formData.q3 && formData.q3.includes('Colapso')) score += 15; 
    if (formData.q3 && formData.q3.includes('severo')) score += 10;

    // Win Rate (Q14)
    if (formData.q14 && formData.q14.includes('No mido')) score -= 20; // Falta de profesionalismo
    if (formData.q14 && formData.q14.includes('< 10%')) score += 5; // Dolor alto

    // Ticket LTV
    if (formData.q4 && formData.q4.includes('Más de $150K')) score += 25;
    if (formData.q4 && formData.q4.includes('$75K')) score += 15;
    if (formData.q4 && formData.q4.includes('$30K')) score += 5;
    if (formData.q4 && formData.q4.includes('$10K')) score -= 20; // Basura B2B

    // Predictibilidad / KPIs
    if (formData.q5 && formData.q5.includes('ciegas')) score += 15; // Alto dolor
    if (formData.q5 && formData.q5.includes('Inconsistente')) score += 10;
    
    // Margenes y Nominas (Nuevas)
    if (formData.q9 && formData.q9.includes('Más de $100k')) score += 15; // Alto dolor in-house
    if (formData.q10 && formData.q10.includes('0% al 20%')) score += 10; // Caos
    if (formData.q12 && formData.q12.includes('Menos del 30%')) score += 10; // Margen Roto
    if (formData.q16 && formData.q16.includes('corto con la ineficiencia')) score += 10;
    if (formData.q17 && formData.q17.includes('agendo hoy')) score += 20; // Compromiso
    if (formData.q17 && formData.q17.includes('imposible')) score -= 100; // Rechazar si no tiene tiempo

    // Heurística Textual (Skin in the game - Requiere esfuerzo extremo)
    const textFields = ['q6', 'q7', 'q8', 'q11', 'q13', 'q15', 'q18', 'q19', 'q20'];
    textFields.forEach(field => {
      if (formData[field]) {
        if (formData[field].length > 200) score += 15;
        else if (formData[field].length > 80) score += 10;
        else if (formData[field].length < 20) score -= 10; // Penalización por respuestas flojas/vagas
      }
    });

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
      
      const nameLower = formData.name.toLowerCase();
      if (['test', 'asd', 'qwe', 'fake', 'pepito', '123'].some(spam => nameLower.includes(spam))) {
        return 'Entrada rechazada por filtros de integridad.';
      }
      if (/^(.)\1{4,}$/.test(formData.name) || /^(.)\1{5,}$/.test(formData.phone)) {
        return 'Patrón anómalo detectado en los datos.';
      }
    }

    // Generic Required validation
    for (let q of currentQuestions) {
      if (q.id === 'phone' || q.id === 'name' || q.id === 'email') continue;
      
      if (q.type === 'checkbox') {
        if (!formData[q.id] || formData[q.id].length === 0) {
          return 'Debes seleccionar al menos una opción obligatoria.';
        }
      } else {
        if (!formData[q.id] || formData[q.id].trim() === '') {
          return `El campo "${q.label}" requiere información veraz y exhaustiva para continuar.`;
        }
        
        // Anti-laziness check (evitar inputs como "ok", "asdsad", "no se")
        if (q.type === 'textarea' && formData[q.id].trim().length < 15) {
          return 'Detectamos respuestas incompletas. Una auditoría de $40k USD exige descripciones de negocio detalladas.';
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
        const payload = {
          lead_context: {
            name: formData.name,
            email: formData.email,
            phone: `${formData.phoneCode || ''} ${formData.phone || ''}`.trim()
          },
          financial_authority: {
            role: formData.q1,
            liquidity: formData.q2,
            availability: formData.q17,
            scale_conviction: formData.q18
          },
          business_metrics: {
            revenue_risk_if_breach: formData.q3,
            ticket_ltv: formData.q4,
            sales_predictability: formData.q5,
            gross_margin: formData.q12
          },
          business_bottleneck: {
            organic_closed_deals: formData.q6,
            structural_spof: formData.q7,
            sales_waste_hours: formData.q8,
            inhouse_payroll_loss: formData.q9
          },
          governance: {
            cac_payback: formData.q11,
            win_rate_ghosting: formData.q14,
            kpis_reported: formData.q15,
            legacy_destruction: formData.q16
          },
          urgency_and_tactics: {
            competitor_objections: formData.q19,
            opportunity_cost: formData.q20
          },
          qualification_score: {
            total: score,
            passed: true,
            submittedAt: new Date().toISOString()
          }
        };
        
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
      <div className="w-full min-h-full flex flex-col items-center justify-center font-mono">
        <div className="text-signals text-xl md:text-2xl animate-pulse">
          {'>'} Inicializando Matrix Confidencial (PDI-V15)...
        </div>
      </div>
    );
  }

  if (showCalendar) {
    return (
      <div className="w-full min-h-full flex flex-col items-center pt-12 px-4 scanline">
        <div className="w-full max-w-4xl bg-[#111] border border-structure rounded-lg shadow-2xl p-4 md:p-8 relative">

          <div className="text-center mb-8 pt-8 border-b border-signals/30 pb-6">
            <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-widest text-glow">Arquitectura Autorizada</h2>
            <p className="text-signals font-mono">Los flujos de caja y el dolor estructural indican alta probabilidad de éxito en 90 días.<br/>Reserva de inmediato tu sesión técnica obligatoria.</p>
          </div>
          
          <div className="w-full h-[600px] border border-structure rounded-sm overflow-hidden bg-background">
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
    doc.setFillColor(3, 3, 3); // Fondo #030303
    doc.rect(0, 0, 210, 297, 'F');
    
    doc.setTextColor(255, 60, 60); // Rojo punitivo
    doc.setFont("courier", "bold");
    doc.setFontSize(22);
    doc.text("QUANT: AUDITORÍA RECHAZADA", 105, 30, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text("ALERTA DE SEGURIDAD OPERATIVA Y FINANCIERA", 105, 45, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text(`Identificador: ${formData.name ? formData.name.toUpperCase() : 'UNKNOWN'} | TS: ${new Date().toISOString()}`, 105, 55, { align: 'center' });

    doc.setLineWidth(0.5);
    doc.setDrawColor(255, 60, 60);
    doc.line(20, 65, 190, 65);

    let yPos = 80;
    
    const addRecommendation = (title, analysis, action) => {
      if (yPos > 250) {
        doc.addPage();
        doc.setFillColor(3, 3, 3);
        doc.rect(0, 0, 210, 297, 'F');
        yPos = 30;
      }
      doc.setFont("courier", "bold");
      doc.setFontSize(13);
      doc.setTextColor(255, 60, 60);
      doc.text(`[ RIESGO DETECTADO ] ${title}`, 20, yPos);
      yPos += 7;
      
      doc.setFont("courier", "normal");
      doc.setFontSize(11);
      doc.setTextColor(200, 200, 200);
      const splitAnalysis = doc.splitTextToSize(`IMPACTO ACTUAL: ${analysis}`, 170);
      doc.text(splitAnalysis, 20, yPos);
      yPos += (splitAnalysis.length * 6) + 4;
      
      doc.setFont("courier", "bold");
      doc.setTextColor(0, 255, 136);
      const splitAction = doc.splitTextToSize(`PROTOCOLO SUGERIDO: ${action}`, 170);
      doc.text(splitAction, 20, yPos);
      yPos += (splitAction.length * 6) + 14;
    };

    let addedCount = 0;
    
    if (formData.q4 && (formData.q4.includes('$10K') || formData.q4.includes('$30K'))) {
      addRecommendation(
        "Empaquetamiento LTV Severamente Deficiente", 
        "Tus tickets promedio no soportan la responsabilidad técnica que asumes. Te estás comiendo el riesgo corporativo por honorarios de hora-hombre ineficientes.", 
        "Reestructura tu core offering hoy. Migra de soporte técnico a un Acuerdo de Continuidad de Negocio Asimétrico. Incrementa tu facturación un 300% o muere en el intento."
      );
      addedCount++;
    }

    if (formData.q5 && (formData.q5.includes('ciegas') || formData.q5.includes('Inconsistente'))) {
      addRecommendation(
        "Fallo Catastrófico en la Predicción de Revenue", 
        "Tu canal de captación Enterprise es pasivo o de suerte. La escasez de SQLs mensuales garantiza un estrangulamiento de la caja este mismo año.", 
        "Cierra temporalmente los esfuerzos orgánicos inútiles. Levanta un túnel Outbound quirúrgico hoy mismo enfocado en C-Levels de nichos sin saturación."
      );
      addedCount++;
    }

    if (formData.q2 && formData.q2.includes('flujo de caja crítico')) {
      addRecommendation(
        "Hemorragia de Caja Operativa", 
        "Trabajas sin reservas. El sistema está ahogado pagando talento In-House o licencias, en vez de reinvertir agresivamente directo en la adquisición de cuota de mercado.", 
        "Implementa un Protocolo de Destrucción de Gastos (Zero Based Budgeting). Corta clientes de mantenimiento de margen roto y enfoca esos ciclos en adquisición Pura."
      );
      addedCount++;
    }

    if (formData.q1 && (formData.q1.includes('Personal Operativo') || formData.q1.includes('Investigando'))) {
      addRecommendation(
        "Ausencia de Autoridad Directiva para Decisión", 
        "Mandaste a investigar herramientas en lugar de arreglar el embudo de ventas asumiendo riesgo y propiedad.", 
        "Saca las manos del teclado táctico. Eleva las decisiones al plano P&L y deja de gastar tiempo en reportes. Esto se resuelve firmando infraestructura definitiva."
      );
      addedCount++;
    }

    if (addedCount === 0) {
      addRecommendation(
        "Sub-Optimización Estructural Intensa", 
        "Mantienes ratios técnicos aceptables pero con debilidad fatal a nivel escalabilidad. No sobrevivirías una fuga de tus 3 clientes ancla (SPOF Corporativo).", 
        "Oblígate auditar métricas reales de ventas. Descontamina tu CRM. Empaqueta el riesgo B2B de tu cliente y cobra una prima brutal del 5% del tamaño de su corporación."
      );
    }

    doc.setFont("courier", "italic");
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text("REPORTE GENERADO AUTÓNOMAMENTE PARA FINES DE MITIGACIÓN. EL ACCESO AL SISTEMA QUANT HA SIDO DENEGADO.", 105, 280, { align: 'center' });

    doc.save("Diagnostico_y_Rechazo_Quant.pdf");
  };

  if (showRejection) {
    return (
      <div className="w-full min-h-full flex flex-col items-center pt-24 md:justify-center font-mono p-4 md:p-6 text-center scanline">
        <h2 className="text-3xl md:text-5xl font-bold text-red-500 mb-8 tracking-widest uppercase text-shadow-red animate-pulse">
           Denegación de Infraestructura
        </h2>
        
        <div className="w-full max-w-3xl border border-red-900/50 bg-[#0a0a0a] p-6 md:p-12 shadow-[0_0_50px_rgba(255,0,0,0.1)] relative">
          <p className="text-white text-lg md:text-2xl font-bold leading-relaxed text-left mb-6 font-sans">
            La auditoría financiera arrojó resultados concluyentes. No posees la estructura operativa, la predecibilidad comercial o la autoridad ejecutiva requerida para asimilar la infraestructura Quant de $+40k.
          </p>
          <div className="h-px w-full bg-red-900/50 mb-6"></div>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed text-left font-sans">
            Implementar un ecosistema rígido sobre un negocio con fugas graves en su liquidez o márgenes es matemáticamente irresponsable y quemaría tu empresa y nuestro tiempo. Como cortesía, nuestra IA táctica generó un{' '}
            <strong className="text-signals font-bold font-mono">Reporte Clínico de Falla</strong>
            {' '}que detalla los cortes exactos que debes aplicar mañana en tu operación.
          </p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center w-full max-w-xl">
          <button 
            onClick={handleDownloadDiagnostic}
            className="flex items-center justify-center gap-3 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-10 py-5 font-bold uppercase transition-all duration-300 cursor-pointer tracking-wider text-base md:text-lg w-full shadow-[0_0_15px_rgba(255,0,0,0.2)]"
          >
            [ Extraer Registro PDF ]
          </button>
        </div>
      </div>
    );
  }

  const currentBlock = questionBlocks[currentStep];

  return (
    <div className="w-full h-full bg-[#030303] flex flex-col items-center justify-center p-0 font-mono scanline">

      <div id="wizard-content" className="w-full h-full max-w-3xl bg-[#0a0a0a] border-0 md:border border-structure flex flex-col relative overflow-hidden">

        {/* Top Indicator */}
        <div className="w-full bg-[#111] border-b border-structure py-1 px-3 justify-between items-center text-[9px] text-gray-500 tracking-widest uppercase hidden md:flex shrink-0">
          <span>// VERIFICACIÓN HUMANA OBLIGATORIA</span>
          <span className="text-signals animate-pulse">IN-PROGRESS</span>
        </div>

        {/* Progress Bar */}
        <div className="absolute top-0 md:top-[24px] left-0 h-[2px] bg-signals shadow-[0_0_10px_rgba(0,255,136,0.6)] transition-all duration-700 ease-out z-10" style={{width: `${((currentStep + 1) / questionBlocks.length) * 100}%`}}></div>

        <div className="px-4 py-2 md:px-6 md:py-3 flex-1 flex flex-col justify-between h-full min-h-0">

          <div className="flex items-center justify-between border-b border-structure pb-2 mb-2 shrink-0">
            <div>
              <p className="text-signals text-[9px] font-bold uppercase tracking-widest mb-0.5 border-l-2 border-signals pl-2">
                [ FASE {String(currentStep + 1).padStart(2, '0')} / {String(questionBlocks.length).padStart(2, '0')} ]
              </p>
              <h2 className="text-xs md:text-sm text-white font-bold tracking-tight">{currentBlock.title}</h2>
            </div>
            <div className="text-structure text-[8px] hidden md:block opacity-40">// P2P ENC</div>
          </div>

          <div key={`step-${currentStep}`} className="flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-right-8 duration-500 overflow-y-auto pr-1 min-h-0">
            <div className="space-y-2 w-full">
              {currentBlock.questions.map(q => (
                <div key={q.id} className="flex flex-col gap-1">
                  <label className="text-gray-200 font-bold text-xs md:text-sm leading-snug">
                    {q.label}
                  </label>

                  {/* text, email, number */}
                  {q.type === 'text' || q.type === 'email' || q.type === 'number' ? (
                    <input
                      type={q.type}
                      value={formData[q.id] || ''}
                      onChange={(e) => handleInputChange(q.id, e.target.value)}
                      placeholder={q.placeholder || ''}
                      className="w-full bg-[#111] border border-structure text-white px-3 py-1.5 focus:outline-none focus:border-signals transition-colors placeholder-gray-700 font-sans text-xs md:text-sm"
                    />
                  ) : null}

                  {/* phone */}
                  {q.type === 'phone' ? (
                    <div className="flex bg-[#111] border border-structure focus-within:border-signals transition-colors">
                      <select
                        className="bg-transparent text-white px-2 py-1.5 outline-none border-r border-structure cursor-pointer text-xs md:text-sm"
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
                        placeholder="Número WhatsApp"
                        className="w-full bg-transparent text-white px-3 py-1.5 focus:outline-none font-sans text-xs md:text-sm min-w-0"
                      />
                    </div>
                  ) : null}

                  {/* textarea */}
                  {q.type === 'textarea' ? (
                    <div className="relative">
                      <textarea
                        rows={2}
                        value={formData[q.id] || ''}
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                        placeholder="Detalla tu operativa real aquí..."
                        className="w-full bg-[#111] border border-structure text-white px-3 py-1.5 focus:outline-none focus:border-signals transition-colors placeholder-gray-700 resize-none font-sans text-xs md:text-sm"
                      />
                      <div className="absolute bottom-1 right-2 text-[8px] font-mono text-gray-600">
                        {(formData[q.id] || '').length}/min 15
                      </div>
                    </div>
                  ) : null}

                  {/* radio */}
                  {q.type === 'radio' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                      {q.options.map(opt => {
                        const isSelected = formData[q.id] === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => handleInputChange(q.id, opt)}
                            className={`flex items-center text-left gap-2 px-2 py-1.5 border transition-all duration-200 ${
                              isSelected ? 'border-signals bg-signals/10 text-signals' : 'border-structure text-gray-400 hover:border-gray-500 bg-[#111]'
                            }`}
                          >
                            <div className={`w-3 h-3 rounded-sm border flex items-center justify-center shrink-0 ${isSelected ? 'border-signals bg-signals' : 'border-gray-600'}`}>
                              {isSelected && <Check size={8} className="text-background" />}
                            </div>
                            <span className="flex-1 font-sans text-xs md:text-sm leading-tight">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="mt-1.5 p-2 bg-red-950/50 border-l-4 border-red-600 text-red-500 flex items-center gap-2 animate-in fade-in shrink-0">
              <ShieldAlert size={12} className="shrink-0" />
              <span className="font-bold tracking-wide text-[9px] md:text-xs">{error}</span>
            </div>
          )}

          <div className="mt-2 flex justify-between items-center bg-[#050505] px-3 py-1.5 border border-structure shrink-0 w-full">
            <div className="text-gray-600 text-[8px] hidden sm:block uppercase tracking-widest">C-LEVEL CONFIDENTIALITY</div>
            <button
              id="wizard-next-btn"
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-1.5 bg-signals text-background px-5 py-2 font-bold uppercase tracking-widest transition-all hover:bg-emerald-400 disabled:opacity-50 text-xs whitespace-nowrap w-full sm:w-auto"
            >
              {isSubmitting ? 'ANALIZANDO...' : 'CONFIRMAR Y AVANZAR'}
              {!isSubmitting && <ChevronRight size={12} />}
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default QualificationWizard;
