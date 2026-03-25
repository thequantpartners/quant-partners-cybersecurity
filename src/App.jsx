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

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [scanStarted, setScanStarted] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
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

    // Refresh ScrollTrigger to recalculate dimensions since new elements mounted
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  }, [scanComplete]);

  return (
    <div className="min-h-screen bg-background scanline relative flex flex-col w-full text-white overflow-x-hidden pt-4">
      {/* Network Graph Background Placeholder */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-depth to-background z-0" />
      
      {/* Base App Structure */}
      <main className="relative z-10 w-full mx-auto flex flex-col">
        <Hero onStartScan={() => setScanStarted(true)} />
        
        {scanStarted && (
          <RealTimeScan isScanActive={scanStarted} onScanComplete={() => setScanComplete(true)} />
        )}
        
        {scanComplete && (
          <div className="flex flex-col">
            <VulnerabilityMap />
            <RealityCheck />
            <SystemOverride />
            <SystemArchitecture />
            <DemoSimulation />
            <DeploymentTimeline />
            <StructuralStrike />
            <ZeroDay />
            <Exclusivity />
            <ResultsFilter />
            <FinalCTA onApply={() => setShowWizard(true)} />
          </div>
        )}
      </main>
      
      {showWizard && <QualificationWizard onClose={() => setShowWizard(false)} />}
    </div>
  );
}

export default App;
