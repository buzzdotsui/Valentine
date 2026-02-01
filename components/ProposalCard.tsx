import React, { useState, useRef, useEffect } from 'react';

interface ProposalCardProps {
    onAccept: (noAttempts: number) => void;
}

const NO_PHRASES = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
];

export const ProposalCard: React.FC<ProposalCardProps> = ({ onAccept }) => {
    const [noCount, setNoCount] = useState(0);
    const [noPosition, setNoPosition] = useState<{top: string, left: string, position: any}>({ top: 'auto', left: 'auto', position: 'static' });
    const [isFlashing, setIsFlashing] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Effect to ensure the button stays within bounds if window resizes
    useEffect(() => {
        const handleResize = () => {
            if (noPosition.position === 'fixed') {
                // If it's fixed, re-trigger a move to a safe spot
                 handleNoHover();
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [noPosition.position]);

    const handleNoHover = (e?: React.MouseEvent | React.TouchEvent) => {
        // Estimate dimensions or use defaults if event is not provided
        // We use a generous width estimate because the text length grows
        const buttonWidth = 320; 
        const buttonHeight = 80; 
        
        // Safety padding from screen edges
        const padding = 40;
        
        // Get viewport dimensions
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
        const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

        // Calculate safe boundaries
        const minX = padding;
        const maxX = Math.max(minX, viewportWidth - buttonWidth - padding);
        const minY = padding;
        const maxY = Math.max(minY, viewportHeight - buttonHeight - padding);

        const newX = Math.random() * (maxX - minX) + minX;
        const newY = Math.random() * (maxY - minY) + minY;

        setNoPosition({
            position: 'fixed',
            left: `${newX}px`,
            top: `${newY}px`,
        });
        
        setNoCount((prev) => prev + 1);

        // Trigger visual effects
        setIsFlashing(true);
        setShowTooltip(true);

        // Reset visual effects
        setTimeout(() => setIsFlashing(false), 300);
        setTimeout(() => setShowTooltip(false), 1500);
    };

    const getNoText = () => {
        return NO_PHRASES[Math.min(noCount, NO_PHRASES.length - 1)];
    };

    // Increase Yes button font size smoothly
    const yesScale = Math.min(1 + noCount * 0.1, 2.5); 

    return (
        <div ref={containerRef} className="flex-1 flex flex-col items-center justify-center p-4 relative">
            
            <div className="bg-white/40 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-2xl max-w-lg w-full text-center border border-white/50 relative overflow-visible transform transition-all duration-500 hover:scale-[1.02]">
                
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>

                {/* Main GIF */}
                <div className="mb-6 relative z-10">
                    <img 
                        src="https://media.tenor.com/fTTVgygHDZ8AAAAi/shy-fingers.gif" 
                        alt="Shy fingers" 
                        className="w-48 h-48 mx-auto object-contain drop-shadow-lg"
                    />
                    <div className="absolute -top-6 -right-6 animate-bounce">
                        <span className="text-4xl">🌹</span>
                    </div>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-red-600 mb-8 drop-shadow-sm leading-tight romantic-font">
                    Hey Nifemi,<br/>
                    <span className="text-3xl md:text-4xl text-gray-800 font-normal font-sans block mt-2">Will you be my Valentine?</span>
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 min-h-[120px] relative z-20">
                    <button
                        onClick={() => onAccept(noCount)}
                        style={{ transform: `scale(${yesScale})` }}
                        className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 animate-heartbeat whitespace-nowrap border-2 border-white/30"
                    >
                        Yes, I will! 💖
                    </button>

                    {/* Enhanced Tooltip for No button */}
                    {showTooltip && noPosition.position === 'fixed' && (
                        <div 
                            style={{
                                position: 'fixed',
                                top: `calc(${noPosition.top} - 70px)`,
                                left: `calc(${noPosition.left} + 10px)`,
                                zIndex: 60,
                                pointerEvents: 'none'
                            }}
                            className="animate-bounce transition-all duration-300 ease-in-out"
                        >
                            <div className="relative bg-white text-rose-500 border-2 border-rose-100 font-bold text-sm px-5 py-3 rounded-2xl shadow-xl whitespace-nowrap transform -rotate-3 origin-bottom-left">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl animate-pulse">💔</span>
                                    <span>Are you really sure?</span>
                                </div>
                                <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-b-2 border-r-2 border-rose-100 transform rotate-45"></div>
                            </div>
                        </div>
                    )}

                    <button
                        onMouseEnter={handleNoHover}
                        onTouchStart={handleNoHover}
                        onClick={handleNoHover}
                        style={{
                            ...noPosition,
                            transition: 'all 0.2s ease-out', // Faster transition for snappier evasion
                            zIndex: 50
                        }}
                        className={`
                            font-bold py-3 px-8 rounded-full shadow-md backdrop-blur-sm border border-gray-200 whitespace-nowrap
                            ${isFlashing 
                                ? 'bg-red-500 text-white scale-110 border-red-600' 
                                : 'bg-white/80 hover:bg-white text-gray-600'
                            }
                        `}
                    >
                        {getNoText()} 💔
                    </button>
                </div>
                
                {noCount > 0 && (
                    <div className="mt-8 text-rose-700 italic font-medium animate-pulse bg-white/30 p-2 rounded-lg inline-block backdrop-blur-sm">
                        "{getNoText()}" is trying to run away... <br/> Just click YES already! 😉
                    </div>
                )}
            </div>
        </div>
    );
};