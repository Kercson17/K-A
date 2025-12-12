import type { Metadata } from "next";
import { Dancing_Script, Nunito } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import MusicPlayer from "@/components/MusicPlayer";
import { GameProvider } from "@/context/GameContext";

const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  variable: '--font-hand', // This matches the Tailwind config below
  display: 'swap',
})

const nunito = Nunito({ 
  subsets: ['latin'],
  variable: '--font-body', // This matches the Tailwind config below
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Happy Anniversary!",
  description: "A surprise for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 2. Add the variables to the body class */}
      <body
        className={`${dancingScript.variable} ${nunito.variable} bg-blue-50 text-gray-700 font-body min-h-screen flex flex-col relative`}
      >
        <GameProvider>
            {/* Hidden SVG Definitions */}
            <svg style={{ display: 'none' }}>
                <symbol id="gerbera-flower" viewBox="0 0 100 100">
                     <g transform="translate(50,50)">
                        <g className="flower-color-back" fill="currentColor" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5">
                            {[...Array(16)].map((_, i) => (
                                <ellipse key={`back-${i}`} cx="0" cy="-35" rx="4" ry="30" transform={`rotate(${i * 22.5})`} />
                            ))}
                        </g>
                        <g fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" transform="rotate(11.25) scale(0.9)">
                            {[...Array(16)].map((_, i) => (
                                <ellipse key={`front-${i}`} cx="0" cy="-35" rx="3.5" ry="28" transform={`rotate(${i * 22.5})`} />
                            ))}
                        </g>
                        <circle cx="0" cy="0" r="8" fill="#fde047" /> 
                        <circle cx="0" cy="0" r="4" fill="#374151" />
                    </g>
                </symbol>
            </svg>

            {/* Background Decoration */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
            </div>

            <Navigation />
            
            <main className="relative z-10 flex-grow w-full max-w-5xl mx-auto pt-20">
                {children}
            </main>

            <MusicPlayer />
        </GameProvider>
      </body>
    </html>
  );
}