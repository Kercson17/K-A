'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGame } from '@/context/GameContext';

export default function Navigation() {
    const pathname = usePathname();
    const { isGameCompleted } = useGame();

    const isActive = (path: string) => {
        return pathname === path ? 'active-link' : '';
    };

    if (!isGameCompleted) return null;

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm animate-fade-up">
            <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="font-hand text-2xl text-deep-blue font-bold">K & A</div>
                <div className="flex gap-6 md:gap-8">
                    <Link href="/" className={`nav-link text-gray-600 hover:text-deep-blue transition-colors ${isActive('/')}`}>
                        Home
                    </Link>
                    <Link href="/letters" className={`nav-link text-gray-600 hover:text-deep-blue transition-colors ${isActive('/letters')}`}>
                        Letters
                    </Link>
                    <Link href="/gallery" className={`nav-link text-gray-600 hover:text-deep-blue transition-colors ${isActive('/gallery')}`}>
                        Gallery
                    </Link>
                </div>
            </div>
        </nav>
    );
}
