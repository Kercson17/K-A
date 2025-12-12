'use client';
import { useCallback } from 'react';

export default function useParticleEffects() {
    const createConfetti = useCallback((originX: number, originY: number) => {
        const particleCount = 40;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('flower-particle', 'animate-confetti');
            
            const isBlue = Math.random() > 0.5;
            const color = isBlue ? '#93c5fd' : '#ffffff';
            const size = Math.random() * 20 + 20;

            particle.innerHTML = `<svg class="w-full h-full" style="color: ${color}"><use href="#gerbera-flower"></use></svg>`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${originX}px`;
            particle.style.top = `${originY}px`;

            const tx = (Math.random() - 0.5) * 600; 
            const ty = (Math.random() - 0.7) * 600; 
            const rot = Math.random() * 720; 

            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            particle.style.setProperty('--rot', `${rot}deg`);

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1500);
        }
    }, []);

    const createFallingFlowers = useCallback(() => {
        const count = 30;
        const duration = 200;

        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.classList.add('flower-particle', 'animate-fall');
                
                const isBlue = Math.random() > 0.5;
                const color = isBlue ? '#93c5fd' : '#ffffff';
                const size = Math.random() * 30 + 15;

                particle.innerHTML = `<svg class="w-full h-full" style="color: ${color}"><use href="#gerbera-flower"></use></svg>`;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                const startX = Math.random() * window.innerWidth;
                particle.style.left = `${startX}px`;
                particle.style.top = `-50px`;

                const fallDuration = Math.random() * 3 + 2; 
                particle.style.animationDuration = `${fallDuration}s`;

                document.body.appendChild(particle);

                setTimeout(() => {
                    particle.remove();
                }, fallDuration * 1000);
            }, i * duration);
        }
    }, []);

    return { createConfetti, createFallingFlowers };
}
