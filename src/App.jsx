import React from 'react';

import Hero from './components/Hero';
import RealTimeScan from './components/RealTimeScan';
import VulnerabilityMap from './components/VulnerabilityMap';
import RealityCheck from './components/RealityCheck';
import DeploymentTimeline from './components/DeploymentTimeline';
import FinalCTA from './components/FinalCTA';
import QualificationWizard from './components/QualificationWizard';
import CostOfInaction from './components/CostOfInaction';
import InHouseVsQuant from './components/InHouseVsQuant';

function App() {
  const [currentPhase, setCurrentPhase] = React.useState(0);

  const advancePhase = (nextPhase) => {
    setCurrentPhase(nextPhase);
  };

  return (
    <div className="h-[100dvh] w-full bg-background scanline flex flex-col text-white overflow-hidden relative">
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-depth to-background z-0" />
      
      <main className="relative z-10 flex-1 w-full h-full flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
        
        {currentPhase === 0 && <Hero onStartScan={() => advancePhase(1)} />}
        
        {currentPhase === 1 && (
          <RealTimeScan 
            isScanActive={currentPhase === 1} 
            onScanComplete={() => advancePhase(2)} 
          />
        )}
        
        {currentPhase === 2 && <VulnerabilityMap onComplete={() => advancePhase(3)} />}
        {currentPhase === 3 && <RealityCheck onComplete={() => advancePhase(4)} />}
        {currentPhase === 4 && <InHouseVsQuant onComplete={() => advancePhase(5)} />}
        {currentPhase === 5 && <CostOfInaction onComplete={() => advancePhase(6)} />}
        {currentPhase === 6 && <DeploymentTimeline onComplete={() => advancePhase(7)} />}
        {currentPhase === 7 && <FinalCTA onApply={() => advancePhase(8)} />}
        
        {currentPhase === 8 && (
          <div className="w-full h-full animate-in fade-in slide-in-from-right-5 duration-700 flex items-center justify-center">
            <QualificationWizard />
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
