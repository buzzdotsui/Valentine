import React, { useState } from 'react';
import { ProposalCard } from './components/ProposalCard';
import { Celebration } from './components/Celebration';
import { DynamicBackground } from './components/DynamicBackground';
import { ProposalState } from './types';
import { sendProposalNotification } from './services/emailService';

const App: React.FC = () => {
  const [status, setStatus] = useState<ProposalState>(ProposalState.ASKING);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAccept = (noAttempts: number) => {
    // Start transition
    setIsTransitioning(true);
    
    // Send automated email in the background
    sendProposalNotification(noAttempts);

    // Wait for the heart wipe to cover the screen before switching content
    setTimeout(() => {
        setStatus(ProposalState.ACCEPTED);
    }, 800);

    // Reset transition state after animation completes
    setTimeout(() => {
        setIsTransitioning(false);
    }, 1600);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-[#ff9a9e] via-[#fad0c4] to-[#ffb1ff] animate-gradient-slow">
      {/* Dynamic Canvas Background */}
      <DynamicBackground />
      
      {/* Optional: Subtle Overlay Pattern */}
      <div className="absolute inset-0 bg-floating-hearts opacity-10 pointer-events-none z-0 mix-blend-overlay"></div>
      
      {/* Transition Overlay (Heart Wipe) */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden">
             <div className="text-rose-500 animate-heart-wipe origin-center drop-shadow-2xl">
                <svg viewBox="0 0 32 32" width="100" height="100" fill="currentColor">
                    <path d="M16 28.6l-1.76-1.6C8 21.4 4 17.7 4 12.8 4 8.6 7.2 5.5 11.2 5.5c2.3 0 4.5 1.1 6 2.8 1.5-1.7 3.7-2.8 6-2.8 4 0 7.2 3.1 7.2 7.3 0 4.9-4 8.6-10.24 14.2L16 28.6z"/>
                </svg>
             </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {status === ProposalState.ASKING ? (
          <div className={`transition-all duration-700 ease-out flex-1 flex flex-col ${isTransitioning ? 'animate-fade-out' : ''}`}>
             <ProposalCard onAccept={handleAccept} />
          </div>
        ) : (
          <div className="flex-1 flex flex-col animate-fadeIn">
            <Celebration />
          </div>
        )}
        
        <div className="text-center py-4 text-white/60 text-xs font-semibold tracking-widest uppercase pb-6">
           Built with ❤️ by TESTYTECH
        </div>
      </div>
    </div>
  );
};

export default App;