'use client';
import Link from 'next/link';
import SliderGame from '@/components/game/SliderGame';
import { useGame } from '@/context/GameContext';

export default function Home() {
    const { isGameCompleted } = useGame();

    return (
        <>
            <SliderGame />
            <section className={`flex flex-col items-center justify-center min-h-[80vh] transition-opacity duration-1000 ${isGameCompleted ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-center">
                    <h1 className="font-hand text-6xl md:text-8xl text-deep-blue mb-6 animate-float">Happy Anniversary</h1>
                    <p className="text-xl md:text-2xl text-gray-500 mb-8 max-w-lg mx-auto px-4">
                        To my favorite person. I have a surprise for you.
                    </p>
                    <Link 
                        href="/letters"
                        className="bg-white text-deep-blue font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all transform hover:-translate-y-1 border border-blue-100 flex items-center gap-2 mx-auto w-fit"
                    >
                        <span>Open Surprise</span>
                    </Link>
                </div>
            </section>
        </>
    );
}
