'use client';
import { useState, useRef, useEffect } from 'react';
import { useGame } from '@/context/GameContext';

const songs = [
    {
        title: "Love Song",
        artist: "Unknown",
        url: "/love.mp3"
    },
    {
        title: "Bad Romance",
        artist: "Unknown",
        url: "/bad.mp3"
    },
    {
        title: "Pink Elephants",
        artist: "Unknown",
        url: "/pink.mp3"
    }
];

export default function MusicPlayer() {
    const { isGameCompleted } = useGame();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Auto-play when game is completed
    useEffect(() => {
        if (isGameCompleted && audioRef.current) {
            playMusic();
        }
    }, [isGameCompleted]);

    const togglePlayer = () => setIsPlayerVisible(!isPlayerVisible);

    const playMusic = async () => {
        if (audioRef.current) {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (error) {
                console.log("Autoplay prevented:", error);
                setIsPlaying(false);
            }
        }
    };

    const pauseMusic = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const togglePlay = () => {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    };

    const nextSong = () => {
        const nextIndex = (currentSongIndex + 1) % songs.length;
        setCurrentSongIndex(nextIndex);
        setTimeout(() => playMusic(), 50);
    };

    const prevSong = () => {
        const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        setCurrentSongIndex(prevIndex);
        setTimeout(() => playMusic(), 50);
    };

    if (!isGameCompleted) return null;

    return (
        <>
            <audio 
                ref={audioRef} 
                src={songs[currentSongIndex].url} 
                loop 
                onEnded={nextSong}
            />

            <button 
                onClick={togglePlayer} 
                className="fixed bottom-6 right-6 z-[90] w-14 h-14 bg-white rounded-full shadow-lg border border-blue-100 flex items-center justify-center text-blue-500 hover:scale-110 hover:shadow-xl transition-all duration-300 group animate-fade-up"
            >
                <div className="absolute inset-0 bg-blue-50 rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
            </button>

            <div className={`fixed bottom-24 right-6 z-[90] w-64 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-blue-100 p-4 transition-all duration-300 ${isPlayerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                <div className="flex items-center gap-4">
                    <div 
                        className="music-disc w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-blue-100 relative shadow-inner animate-spin-slow"
                        style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-blue-50"></div>
                        <div className="w-4 h-4 bg-white rounded-full z-10 border border-gray-100"></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-700 text-sm truncate">{songs[currentSongIndex].title}</h4>
                        <p className="text-xs text-gray-500 truncate">{songs[currentSongIndex].artist}</p>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4 mt-3">
                    <button onClick={prevSong} className="text-gray-400 hover:text-blue-500 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                    </button>
                    
                    <button onClick={togglePlay} className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 shadow-md transition-colors">
                        {!isPlaying ? (
                            <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        ) : (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                        )}
                    </button>
                    
                    <button onClick={nextSong} className="text-gray-400 hover:text-blue-500 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                    </button>
                </div>
            </div>
        </>
    );
}