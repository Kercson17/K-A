'use client';
import { useState } from 'react';
import PhotoModal from '@/components/modals/PhotoModal';

const memories = [
    {
        src: '/1.jpg',
        caption: 'Our first date',
        delay: '0.1s',
        aspect: 'aspect-[4/5]',
        rotate: 'group-hover:-rotate-1',
        type: 'image'
    },
    {
        src: '/2.jpg',
        caption: 'Making memories',
        delay: '0.2s',
        aspect: 'aspect-square',
        rotate: 'group-hover:rotate-2',
        type: 'image'
    },
    {
        src: '/3.jpg',
        caption: 'Adventures together',
        delay: '0.3s',
        aspect: 'aspect-[3/4]',
        rotate: 'group-hover:-rotate-2',
        type: 'image'
    },
    {
        src: '/4.jpg',
        caption: 'Everyday joys',
        delay: '0.4s',
        aspect: 'aspect-square',
        rotate: 'group-hover:rotate-1',
        type: 'image'
    },
    {
        src: '/5.mp4',
        caption: 'Special Moment',
        delay: '0.5s',
        aspect: 'aspect-video', // Video typically 16:9
        rotate: 'group-hover:scale-105', // Gentle zoom for video
        type: 'video'
    },
    {
        src: '/6.jpg',
        caption: 'Sweet times',
        delay: '0.6s',
        aspect: 'aspect-[4/5]',
        rotate: 'group-hover:rotate-2',
        type: 'image'
    },
    {
        src: '/7.jpeg',
        caption: 'Laughter',
        delay: '0.7s',
        aspect: 'aspect-square',
        rotate: 'group-hover:-rotate-1',
        type: 'image'
    },
    {
        src: '/8.jpeg',
        caption: 'Us',
        delay: '0.8s',
        aspect: 'aspect-[3/4]',
        rotate: 'group-hover:rotate-1',
        type: 'image'
    },
    {
        src: '/9.jpeg',
        caption: 'Forever',
        delay: '0.9s',
        aspect: 'aspect-square',
        rotate: 'group-hover:-rotate-2',
        type: 'image'
    },
    {
        src: '/10.jpeg',
        caption: 'Always',
        delay: '1.0s',
        aspect: 'aspect-[4/5]',
        rotate: 'group-hover:rotate-2',
        type: 'image'
    }
];

export default function GalleryPage() {
    const [modalState, setModalState] = useState({ isOpen: false, imgSrc: '', caption: '' });

    const openModal = (imgSrc: string, caption: string) => {
        setModalState({ isOpen: true, imgSrc, caption });
    };

    const closeModal = () => {
        setModalState(prev => ({ ...prev, isOpen: false }));
    };

    return (
        <section className="flex flex-col items-center py-10 px-4 active opacity-100 transition-opacity duration-500 w-full">
            <h2 className="font-hand text-4xl md:text-5xl text-center text-deep-blue mb-12">Our Memories</h2>
            {/* Switched to Grid for precise centering of the 5th item */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
                {memories.map((memory, index) => (
                    <div 
                        key={index}
                        onClick={() => openModal(memory.src, memory.caption)} 
                        className="bg-white p-2 rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 gallery-card animate-fade-up cursor-pointer" 
                        style={{ animationDelay: memory.delay }}
                    >
                        <div className={`${memory.aspect} bg-gray-200 rounded-lg overflow-hidden relative group`}>
                            {/* Dark Overlay on Hover */}
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                                <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            
                            {/* Media Content */}
                            {memory.type === 'video' ? (
                                <video 
                                    src={memory.src}
                                    className={`w-full h-full object-cover transition-transform duration-700 ${memory.rotate}`}
                                    muted
                                    loop
                                    playsInline
                                    onMouseOver={e => e.currentTarget.play()}
                                    onMouseOut={e => e.currentTarget.pause()}
                                />
                            ) : (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img 
                                    src={memory.src} 
                                    alt={memory.caption} 
                                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${memory.rotate}`} 
                                />
                            )}
                        </div>
                        <p className="font-hand text-2xl text-center mt-3 text-gray-600">{memory.caption}</p>
                    </div>
                ))}
            </div>

            <PhotoModal 
                isOpen={modalState.isOpen} 
                onClose={closeModal} 
                imgSrc={modalState.imgSrc} 
                caption={modalState.caption} 
            />
        </section>
    );
}
