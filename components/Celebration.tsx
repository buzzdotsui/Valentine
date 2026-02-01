import React, { useEffect, useState } from 'react';

export const Celebration: React.FC = () => {
    const [particles, setParticles] = useState<number[]>([]);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const count = 200; 
        const newParticles = Array.from({ length: count }, (_, i) => i);
        setParticles(newParticles);
        
        // Fade in content
        setTimeout(() => setShowContent(true), 500);
    }, []);

    return (
        <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 text-center relative w-full h-full">
            {/* Confetti */}
            {particles.map((i) => (
                <div
                    key={i}
                    className="fixed w-3 h-3 rounded-sm z-50 pointer-events-none"
                    style={{
                        backgroundColor: ['#ff0000', '#ff69b4', '#ff1493', '#ffd700', '#ffffff'][Math.floor(Math.random() * 5)],
                        left: `${Math.random() * 100}vw`,
                        top: `-20px`,
                        transform: `rotate(${Math.random() * 360}deg)`,
                        animation: `fall ${Math.random() * 3 + 2}s linear forwards`,
                        animationDelay: `${Math.random() * 1}s`
                    }}
                />
            ))}

            <div className={`transition-all duration-1000 transform ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} w-full flex flex-col items-center justify-center max-w-5xl mx-auto z-10 relative`}>
                
                <div className="mb-8 animate-bounce">
                    <h1 className="text-6xl md:text-8xl text-red-600 drop-shadow-xl romantic-font">
                        She said Yes!
                    </h1>
                </div>

                <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] shadow-xl max-w-lg w-full border-4 border-white transform hover:scale-[1.02] transition-transform duration-300">
                    <img 
                        src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" 
                        alt="Celebration Bear" 
                        className="w-full h-64 object-cover rounded-2xl mb-6 shadow-md"
                    />
                    <p className="text-3xl text-gray-800 romantic-font">
                        My heart is beating so fast! <br/>
                        <span className="text-rose-600 font-sans text-xl font-bold mt-4 block">
                            I can't wait to spend Valentine's Day with you.
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};