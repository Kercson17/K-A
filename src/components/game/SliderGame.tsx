'use client';
import { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';
import { useGame } from '@/context/GameContext';
import useParticleEffects from '@/hooks/useParticleEffects';

export default function SliderGame() {
    const { completeGame } = useGame();
    const { createConfetti } = useParticleEffects();
    
    const [isSuccess, setIsSuccess] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [translateX, setTranslateX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    
    const trackRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);
    const startX = useRef(0);
    const translateXRef = useRef(0); // Ref to track latest value for event listeners
    
    // Constants
    const HANDLE_WIDTH = 62;
    const PADDING = 8;

    useEffect(() => {
        if (isSuccess) {
            // Trigger confetti
            const rect = trackRef.current?.getBoundingClientRect();
            if (rect) {
                 createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
            
            // Wait for GIF to show (3 seconds) before completing game and hiding overlay
            const timer = setTimeout(() => {
                completeGame(); // Unlock content
                setIsVisible(false); // Start fade out of the whole overlay
            }, 3000);
            
            return () => clearTimeout(timer);
        }
    }, [isSuccess, completeGame, createConfetti]);

    const handleStart = (clientX: number) => {
        if (isSuccess) return;
        setIsDragging(true);
        // Use the ref value for start calculation to be safe, though state would work for inline handler
        startX.current = clientX - translateXRef.current;
    };

    const handleMove = (clientX: number) => {
        if (!isDragging || !trackRef.current) return;
        
        const trackWidth = trackRef.current.offsetWidth;
        const maxDrag = trackWidth - HANDLE_WIDTH - PADDING;
        
        let newX = clientX - startX.current;
        
        if (newX < 0) newX = 0;
        if (newX > maxDrag) newX = maxDrag;
        
        setTranslateX(newX);
        translateXRef.current = newX; // Sync ref
    };

    const handleEnd = () => {
        if (!isDragging || !trackRef.current) return;
        setIsDragging(false);
        
        const trackWidth = trackRef.current.offsetWidth;
        const maxDrag = trackWidth - HANDLE_WIDTH - PADDING;
        
        // Use Ref for current value check because closure might be stale
        if (translateXRef.current > maxDrag * 0.9) {
            setIsSuccess(true);
            setTranslateX(maxDrag);
            translateXRef.current = maxDrag;
        } else {
            setTranslateX(0);
            translateXRef.current = 0;
        }
    };

    // Global Event Listeners for drag
    useEffect(() => {
        const onMouseMove = (e: globalThis.MouseEvent) => handleMove(e.clientX);
        const onMouseUp = () => handleEnd();
        const onTouchMove = (e: globalThis.TouchEvent) => handleMove(e.touches[0].clientX);
        const onTouchEnd = () => handleEnd();

        if (isDragging) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('touchmove', onTouchMove, { passive: false });
            window.addEventListener('touchend', onTouchEnd);
        }

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDragging]); 

    if (!isVisible) return null;

    return (
        <section 
            id="intro-game" 
            className={`flex flex-col items-center justify-center min-h-[90vh] absolute inset-0 bg-blue-50 z-[100] px-4 transition-opacity duration-800 ${isSuccess && !isVisible ? 'opacity-0' : 'opacity-100'}`}
        >
            {/* Success GIF Overlay */}
            <div className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-500 pointer-events-none ${isSuccess ? 'opacity-100' : 'opacity-0'}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/picture.gif" alt="Success" className="w-64 h-64 object-contain shadow-2xl animate-pop-in" />
            </div>

            <div className={`text-center z-10 p-6 max-w-sm w-full transition-opacity duration-300 ${isSuccess ? 'opacity-0' : 'opacity-100'}`}>
                <h1 className="font-hand text-5xl md:text-6xl text-deep-blue mb-2 animate-float">Hey You!</h1>
                <p className="text-lg text-gray-600 mb-10">Slide to deliver my love ❤️</p>
                
                {/* The Slider Game */}
                <div id="slider-container" className={`w-full max-w-[320px] mx-auto relative ${isSuccess ? 'slider-success' : ''}`}>
                    <div ref={trackRef} id="slider-track" className="slider-track">
                        <span 
                            id="slider-text" 
                            className="slider-text" 
                            style={{ opacity: isSuccess ? 0 : 1 - (translateX / 200) }} // Approximate opacity fade
                        >
                            Slide to open &gt;&gt;
                        </span>
                    </div>
                    
                    {/* The Draggable Handle (Letter) */}
                    <div 
                        ref={handleRef}
                        id="slider-handle" 
                        className="slider-handle"
                        style={{ transform: `translateX(${translateX}px)`, transition: isDragging ? 'none' : 'transform 0.3s ease-out' }}
                        onMouseDown={(e) => handleStart(e.clientX)}
                        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
                    >
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    
                    {/* The Target (Heart) */}
                    <div id="slider-target" className="slider-target">
                        <svg className="w-10 h-10 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
