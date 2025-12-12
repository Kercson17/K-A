'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PhotoModalProps {
    isOpen: boolean;
    onClose: () => void;
    imgSrc: string;
    caption: string;
}

export default function PhotoModal({ isOpen, onClose, imgSrc, caption }: PhotoModalProps) {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
        } else {
            const timer = setTimeout(() => setShouldRender(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!shouldRender) return null;

    return createPortal(
        <div 
            className={`fixed inset-0 z-[1000] flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            {/* Dark Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
            
            {/* Close Button */}
            <button 
                onClick={onClose} 
                className="fixed top-6 right-6 z-[1010] bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-all cursor-pointer backdrop-blur-sm shadow-lg border border-white/10"
                aria-label="Close"
            >
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            
            {/* Modal Content */}
            <div className={`photo-modal-content relative z-[1005] w-full max-w-5xl h-full max-h-screen p-4 flex flex-col items-center justify-center transform transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}>
                {/* Media Container */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {imgSrc.endsWith('.mp4') ? (
                        <video 
                            src={imgSrc} 
                            controls 
                            autoPlay 
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                        >
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                            id="modal-image" 
                            src={imgSrc} 
                            alt="Memory" 
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" 
                        />
                    )}
                </div>
                
                {/* Caption */}
                <p id="modal-caption" className="font-hand text-3xl md:text-4xl text-white text-center mt-4 drop-shadow-md">{caption}</p>
            </div>
        </div>,
        document.body
    );
}
