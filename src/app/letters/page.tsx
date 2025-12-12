'use client';
import { useState } from 'react';
import LetterModal from '@/components/modals/LetterModal';
import useParticleEffects from '@/hooks/useParticleEffects';

export default function LettersPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { createConfetti, createFallingFlowers } = useParticleEffects();

    const handleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;
        
        createConfetti(originX, originY);
        createFallingFlowers();
        
        setTimeout(() => {
            setIsModalOpen(true);
        }, 600);
    };

    return (
        <section className="flex flex-col items-center justify-center min-h-[70vh] py-10 px-4 active opacity-100 transition-opacity duration-500">
            <div className="text-center">
                <h2 className="font-hand text-4xl text-deep-blue mb-12">For My Qtie</h2>
                
                <div 
                    onClick={handleOpen} 
                    className="envelope-container w-[320px] h-[220px] relative mx-auto drop-shadow-xl hover:drop-shadow-2xl group"
                >
                    {/* Arrow Pointer (Bottom, Pointing Up) */}
                    <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce pointer-events-none z-10">
                        <svg className="w-12 h-12 text-deep-blue -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                        <span className="font-hand text-2xl text-deep-blue">Open it!</span>
                    </div>

                    {/* Back of Envelope */}
                    <div className="envelope-back absolute inset-0 bg-blue-800 rounded-lg shadow-xl"></div>
                    
                    {/* The Top Flap (Closed) */}
                    <div className="envelope-flap"></div>

                    {/* Letter Hint (White strip peaking out) */}
                    <div className="letter-preview absolute left-4 right-4 top-6 bottom-4 bg-white rounded shadow-sm transition-transform duration-300 group-hover:-translate-y-2"></div>

                    {/* Front Pocket */}
                    <div className="envelope-pocket absolute inset-0 pointer-events-none">
                         <svg className="w-full h-full" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Left Flap */}
                            <path d="M0 0L160 110L0 220V0Z" fill="#3b82f6"/>
                            {/* Right Flap */}
                            <path d="M320 0L160 110L320 220V0Z" fill="#2563eb"/>
                            {/* Bottom Flap */}
                            <path d="M0 220L160 100L320 220H0Z" fill="#60a5fa"/>
                            {/* Shadow for depth on bottom flap */}
                            <path d="M160 100 L0 220 H320 L160 100Z" fill="black" fillOpacity="0.05"/>
                         </svg>
                    </div>
                </div>
            </div>

            <LetterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
}
