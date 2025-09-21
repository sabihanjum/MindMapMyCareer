'use client';

import { Brain, HelpCircle, User } from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';

const icons = [
  <HelpCircle key="1" className="h-8 w-8 text-primary/50" />,
  <Brain key="2" className="h-8 w-8 text-accent/50" />,
  <User key="3" className="h-8 w-8 text-secondary-foreground/30" />,
  <svg key="4" className="h-8 w-8 text-primary/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M14.12 14.12a3 3 0 1 0-4.24-4.24" />
    <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/>
    <path d="M12 16.5c-2.5 0-5-1-5-2.5" />
  </svg>,
  <svg key="5" className="h-8 w-8 text-accent/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
];

const IconWrapper = ({ children, style }: { children: ReactNode; style: React.CSSProperties }) => (
  <div className="absolute" style={style}>
    {children}
  </div>
);

export default function AuthLayout({ children }: { children: ReactNode }) {
  const [iconStyles, setIconStyles] = useState<React.CSSProperties[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const generateStyles = () => {
        return [...Array(15)].map(() => ({
          animation: `move ${15 + Math.random() * 20}s linear infinite`,
          animationDelay: `${-Math.random() * 20}s`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          transform: `scale(${0.5 + Math.random()})`,
        }));
      };
      setIconStyles(generateStyles());
    }
  }, [isMounted]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        {isMounted && iconStyles.map((style, i) => (
          <IconWrapper key={i} style={style}>
            {icons[i % icons.length]}
          </IconWrapper>
        ))}
      </div>
      <style jsx>{`
        @keyframes move {
          0% { transform: translateY(20vh) translateX(10vw) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-20vh) translateX(-10vw) rotate(360deg); opacity: 0; }
        }
      `}</style>
      <div className="relative z-10 w-full flex items-center justify-center">
        {children}
      </div>
    </main>
  );
}
