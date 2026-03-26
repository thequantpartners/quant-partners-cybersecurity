import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from './components/Hero';
import RealTimeScan from './components/RealTimeScan';
import VulnerabilityMap from './components/VulnerabilityMap';
import RealityCheck from './components/RealityCheck';
import SystemOverride from './components/SystemOverride';
import SystemArchitecture from './components/SystemArchitecture';
import DemoSimulation from './components/DemoSimulation';
import DeploymentTimeline from './components/DeploymentTimeline';
import StructuralStrike from './components/StructuralStrike';
import ZeroDay from './components/ZeroDay';
import Exclusivity from './components/Exclusivity';
import ResultsFilter from './components/ResultsFilter';
import FinalCTA from './components/FinalCTA';
import QualificationWizard from './components/QualificationWizard';
import CostOfInaction from './components/CostOfInaction';
import InHouseVsQuant from './components/InHouseVsQuant';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showWizard, setShowWizard] = useState(false);

  useEffect(() => {
    const sections = gsap.utils.toArray('section:not(.gsap-initialized)');
    sections.forEach(sec => {
      sec.classList.add('gsap-initialized');
      gsap.fromTo(sec, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%',
          }
        }
      );
    });

    // Refresh ScrollTrigger
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  }, [currentPhase]);

  const advancePhase = (nextPhase) => {
    setCurrentPhase(nextPhase);
    setTimeout(() => {
      const el = document.getElementById(`phase-${nextPhase}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const NextPhaseButton = ({ onClick, text }) => (
    <div className="w-full flex justify-center py-16 px-4 bg-background">
      <button 
        onClick={onClick}
        className="group relative px-8 py-5 bg-signals text-background font-mono font-bold uppercase tracking-widest text-sm md:text-base overflow-hidden hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] transition-all"
      >
        <span className="relative z-10 flex items-center gap-3">
          {text} 
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background scanline relative flex flex-col w-full text-white overflow-x-hidden pt-4">
      {/* Network Graph Background Placeholder */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-depth to-background z-0" />
      
      {/* Base App Structure */}
      <main className="relative z-10 w-full mx-auto flex flex-col pb-24">
        
        {currentPhase === 0 && (
          <div id="phase-0">
            <Hero onStartScan={() => advancePhase(1)} />
          </div>
        )}
        
        {currentPhase >= 1 && (
          <div id="phase-1">
            <RealTimeScan 
              isScanActive={currentPhase === 1} 
              onScanComplete={() => {
                if (currentPhase === 1) advancePhase(2);
              }} 
            />
          </div>
        )}
        
        {currentPhase >= 2 && (
          <div id="phase-2" className="flex flex-col">
            <VulnerabilityMap />
            <RealityCheck />
            <SystemOverride />
            
            {currentPhase === 2 && (
               <NextPhaseButton 
                 onClick={() => advancePhase(3)} 
                 text="Analizar Impacto Financiero In-House >" 
               />
            )}
          </div>
        )}

        {currentPhase >= 3 && (
          <div id="phase-3" className="flex flex-col">
            <InHouseVsQuant />
            
            {currentPhase === 3 && (
               <NextPhaseButton 
                 onClick={() => advancePhase(4)} 
                 text="Evaluar Costo de Oportunidad >" 
               />
            )}
          </div>
        )}

        {currentPhase >= 4 && (
          <div id="phase-4" className="flex flex-col">
            <CostOfInaction />
            
            {currentPhase === 4 && (
               <NextPhaseButton 
                 onClick={() => advancePhase(5)} 
                 text="Ver Modelo de Despliegue (90 Días) >" 
               />
            )}
          </div>
        )}
        
        {currentPhase >= 5 && (
          <div id="phase-5" className="flex flex-col">
            <DeploymentTimeline />
            <FinalCTA onApply={() => setShowWizard(true)} />
          </div>
        )}

      </main>
      
      {showWizard && <QualificationWizard onClose={() => setShowWizard(false)} />}
    </div>
  );
}

export default App;
