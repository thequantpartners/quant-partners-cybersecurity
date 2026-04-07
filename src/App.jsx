import React, { useState, useRef, useEffect } from 'react';

import Hero from './components/Hero';
import VslVideo from './components/VslVideo';
import MatrixRain from './components/MatrixRain';
import BookingForm from './components/BookingForm';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const formRef = useRef(null);

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
    setShowForm(true);
  };

  useEffect(() => {
    if (showForm && formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, [showForm]);

  return (
    <div className="w-full bg-background scanline text-white overflow-x-hidden">
      <MatrixRain />
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-depth to-background z-0" />

      <main className="relative z-10">

        {/* PASO 1: Hero + VSL — todo en un viewport, sin scroll */}
        <div className="h-[100dvh] flex flex-col overflow-hidden px-[11px] md:px-8">
          <div className={`shrink-0 transition-opacity duration-700 ${isVideoPlaying ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
            <Hero />
          </div>
          <div className="flex-1 min-h-0">
            <VslVideo
              onComplete={handleVideoEnd}
              onPlayStart={() => setIsVideoPlaying(true)}
            />
          </div>
        </div>

        {/* PASO 2: Header + Form en un viewport. Disclaimer visible al scrollear. */}
        {showForm && (
          <>
            {/* Viewport principal — header + form sin scroll */}
            <div ref={formRef} className="animate-in fade-in duration-700 h-[100dvh] flex flex-col overflow-hidden">

              {/* Header PASO 2 — mismo estilo que PASO 1 */}
              <div className="shrink-0 flex flex-col items-center pt-16 pb-4 px-4 gap-3">
                <div className="flex flex-col items-center gap-1.5">
                  <p className="font-mono text-base md:text-2xl font-bold text-gray-300 uppercase tracking-widest text-center">
                    PASO 2:{' '}
                    <span className="text-white">SOLICITA TU DIAGNÓSTICO C-LEVEL</span>
                  </p>
                  <div className="h-0.5 w-40 md:w-64 bg-gradient-to-r from-transparent via-signals to-transparent" />
                </div>
                <div className="w-full max-w-2xl border border-red-700/60 bg-red-950/20 px-5 py-2.5 font-mono text-sm md:text-lg text-red-400 text-center leading-snug">
                  <span className="text-red-300 font-bold">[AVISO]</span>{' '}
                  Si tu empresa NO opera contratos B2B de alto valor o no tienes autoridad financiera directiva, este protocolo{' '}
                  <span className="underline font-bold text-red-300">NO</span> es para ti.
                </div>
              </div>

              {/* Form — tarjeta centrada, más grande */}
              <div className="flex-1 min-h-0 flex items-center justify-center px-4 md:px-8 pb-6">
                <BookingForm />
              </div>
            </div>

            {/* Disclaimer footer — visible al scrollear */}
            <footer className="w-full bg-[#060606] border-t border-structure/40 px-6 md:px-16 py-10 font-mono text-gray-600 text-[10px] md:text-xs leading-relaxed">
              <div className="max-w-4xl mx-auto flex flex-col gap-5">
                <p className="text-center text-gray-500 text-xs md:text-sm tracking-widest uppercase border-b border-structure/30 pb-4">
                  2026 | Quant Partners |{' '}
                  <span className="hover:text-signals cursor-pointer transition-colors">Política de Privacidad</span>
                  {' '}|{' '}
                  <span className="hover:text-signals cursor-pointer transition-colors">Términos y Condiciones</span>
                </p>

                <p>
                  Este sitio web es operado y mantenido por <span className="text-gray-400">Quant Partners</span>. El uso de este sitio se rige por sus Términos de Servicio y Política de Privacidad. Quant Partners es una firma especializada en infraestructura de ciberseguridad y arquitectura comercial B2B de alto valor. No vendemos promesas de enriquecimiento rápido ni sistemas genéricos de captación. Todos los servicios, contenidos y materiales proporcionados tienen fines exclusivamente estratégicos y operativos.
                </p>

                <p>
                  No podemos garantizar tu capacidad para obtener resultados específicos derivados del uso de nuestras estrategias o infraestructura. Nada de lo expuesto en este sitio constituye una promesa o garantía de resultados, ingresos actuales o futuros. Los resultados individuales varían significativamente según la situación operativa, financiera y de mercado de cada organización.
                </p>

                <p>
                  Cualquier cifra financiera mencionada es únicamente ilustrativa de conceptos y no debe interpretarse como ingresos promedio, exactos o garantizados. No proporcionamos asesoramiento legal, fiscal ni regulatorio de ningún tipo. Siempre consulta con tus asesores profesionales antes de tomar decisiones basadas en información de este sitio.
                </p>

                <p>
                  El éxito de nuestros clientes varía significativamente. Aunque compartimos metodologías y arquitecturas que han funcionado para otros, los resultados dependen de múltiples factores, incluidos —pero no limitados a— la situación financiera, la autoridad ejecutiva, la madurez operativa y el compromiso real de implementación de cada organización. No garantizamos que obtendrás resultados similares a los casos de éxito mostrados.
                </p>

                <p>
                  Los testimonios y representaciones reflejan experiencias individuales de clientes reales y no representan resultados típicos ni predicen resultados futuros. Los resultados individuales pueden variar de manera significativa.
                </p>

                <p>
                  Todo el material es propiedad intelectual de <span className="text-gray-400">Quant Partners</span> y está protegido por derechos de autor. Cualquier duplicación, reproducción o distribución no autorizada está estrictamente prohibida.
                </p>

                <p>
                  Al utilizar este sitio y registrarte en nuestros servicios, reconoces que eres el único responsable de tus decisiones y resultados, y aceptas no intentar responsabilizar a Quant Partners bajo ninguna circunstancia.
                </p>

                <p className="text-center text-gray-700 pt-2 border-t border-structure/20">
                  // Este sitio no está afiliado ni respaldado por Meta, Google, LinkedIn ni ninguna plataforma de terceros. //
                </p>
              </div>
            </footer>
          </>
        )}

      </main>
    </div>
  );
}

export default App;
