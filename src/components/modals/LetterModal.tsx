'use client';
import { useEffect, useState } from 'react';

interface LetterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LetterModal({ isOpen, onClose }: LetterModalProps) {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
        } else {
            const timer = setTimeout(() => setShouldRender(false), 300); // match transition duration
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!shouldRender) return null;

    return (
        <div 
            className={`fixed inset-0 z-[60] flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
            
            {/* Modal Content */}
            <div className={`bg-white w-[90%] max-w-lg p-8 rounded-lg shadow-2xl relative transform transition-transform duration-300 ${isOpen ? 'scale-100 animate-pop-in' : 'scale-90'}`}>
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                {/* Content */}
                <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <h2 className="font-hand text-3xl text-deep-blue mb-4">My Love,</h2>
                    <h2 className="font-hand text-3xl text-deep-blue mb-4">Happy Anniversary.</h2>
                    <div className="prose prose-blue mx-auto text-gray-600 leading-relaxed max-h-[60vh] overflow-y-auto">
                        <p className="mb-4">
                            First of all, thank you for reaching our 2nd anniversary with me. Despite the challenges we faced—the arguments, misunderstandings, and even the moments when we almost gave up—we still chose to stay and fight for each other. For that, I am truly grateful.
                        </p>
                        <p className="mb-4">
                            Thank you for all the love you have given me, and for your understanding, especially during times when I have been stubborn. I sincerely apologize for the things I have done that may have hurt you. I know I am blessed to have someone as hardworking, patient, and dedicated as you.
                        </p>
                        <p className="mb-4">
                            Thank you for everything you do. I hope we continue to hold on to each other and never give up, until the day we finally reach the dreams we are building together.
                        </p>
                        <p className="mb-4">
                            And before I end this letter…
                        </p>
                        <p className="mb-4">
                            I want you to know that these two years with you made me realize I can’t “two” without you.
                        </p>
                        
                    </div>
                    <p className="font-hand text-xl mt-6 text-deep-blue">With all my love,</p>
                    <p className="font-hand text-3xl mt-0 text-deep-blue">Exon</p>
                </div>
            </div>
        </div>
    );
}
