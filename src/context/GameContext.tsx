'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface GameContextType {
    isGameCompleted: boolean;
    completeGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
    const [isGameCompleted, setIsGameCompleted] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    
    // Check local storage to persist game state if desired, 
    // or just default to false every refresh (as per design.html which resets on refresh).
    // For now, we'll keep it per-session (refresh resets it).

    useEffect(() => {
        if (!isGameCompleted && pathname !== '/') {
            router.replace('/');
        }
    }, [isGameCompleted, pathname, router]);

    const completeGame = () => {
        setIsGameCompleted(true);
    };

    return (
        <GameContext.Provider value={{ isGameCompleted, completeGame }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}
