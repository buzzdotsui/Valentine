import React, { useEffect, useRef } from 'react';

export const DynamicBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        interface Particle {
            x: number;
            y: number;
            size: number;
            speedY: number;
            speedX: number;
            opacity: number;
            color: string;
            type: 'heart' | 'sparkle';
            wobble: number;
            wobbleSpeed: number;
        }

        let particles: Particle[] = [];
        let mouseX = 0;
        let mouseY = 0;

        // Soft, romantic colors
        const colors = ['#ffffff', '#ffe4e6', '#fecdd3', '#fda4af', '#fff1f2'];

        const createParticle = (x?: number, y?: number, type: 'heart' | 'sparkle' = 'heart'): Particle => ({
            x: x ?? Math.random() * width,
            y: y ?? height + 20,
            size: type === 'heart' ? Math.random() * 20 + 10 : Math.random() * 5 + 2,
            speedY: Math.random() * 1.5 + 0.5,
            speedX: Math.random() * 0.5 - 0.25,
            opacity: 0,
            color: colors[Math.floor(Math.random() * colors.length)],
            type: type,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: Math.random() * 0.05 + 0.02
        });

        // Initialize some particles
        for (let i = 0; i < 15; i++) {
            const p = createParticle(Math.random() * width, Math.random() * height);
            p.opacity = Math.random() * 0.5;
            particles.push(p);
        }

        const drawHeart = (x: number, y: number, size: number, color: string, opacity: number) => {
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.fillStyle = color;
            ctx.translate(x, y);
            // Draw heart shape
            ctx.beginPath();
            const topCurveHeight = size * 0.3;
            ctx.moveTo(0, topCurveHeight);
            ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
            ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size);
            ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
            ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        };

        const drawSparkle = (x: number, y: number, size: number, color: string, opacity: number) => {
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, size / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            // Randomly spawn new heart at bottom
            if (Math.random() < 0.03) {
                particles.push(createParticle());
            }

            particles.forEach((p, index) => {
                // Movement
                p.y -= p.speedY;
                p.x += Math.sin(p.wobble) * 1 + p.speedX;
                p.wobble += p.wobbleSpeed;

                // Fade in/out
                if (p.y > height - 100) {
                    p.opacity = Math.min(p.opacity + 0.01, 0.4);
                } else if (p.y < 100) {
                    p.opacity = Math.max(p.opacity - 0.01, 0);
                } else {
                    p.opacity = Math.min(p.opacity + 0.01, 0.4);
                }

                // Mouse interaction: particles slightly flee from mouse
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 150) {
                    const force = (150 - dist) / 150;
                    p.x += dx * force * 0.05;
                    p.y += dy * force * 0.05;
                }

                if (p.type === 'heart') {
                    drawHeart(p.x, p.y, p.size, p.color, p.opacity);
                } else {
                    drawSparkle(p.x, p.y, p.size, p.color, p.opacity);
                }

                if (p.y < -50 || p.opacity <= 0) {
                    if (p.y < height - 200) { // Only remove if it's moved up a bit or faded out naturally
                         particles.splice(index, 1);
                    }
                }
            });

            requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Spawn little sparkles on mouse move
            if (Math.random() < 0.2) {
                particles.push({
                    ...createParticle(mouseX, mouseY, 'sparkle'),
                    size: Math.random() * 4 + 1,
                    speedY: Math.random() * 2 - 1, // Random Y
                    speedX: Math.random() * 2 - 1, // Random X
                    opacity: 0.8
                });
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
};