"use client"
import React, { useEffect, useState } from 'react';

const Bat = ({ style }: { style: React.CSSProperties }) => (
  <div className="flying-creature" style={style}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full text-foreground">
        <path d="M12 2a1 1 0 0 1 1 1v5.535a1 1 0 0 1-.483.858L9.412 11.5l-2.122 4.243a1 1 0 0 1-1.789-.894l.895-3.578a1 1 0 0 1 .633-.78l3.11-1.414A1 1 0 0 0 11 8.465V3a1 1 0 0 1 1-1z"/>
        <path d="M12 2a1 1 0 0 0-1 1v5.535a1 1 0 0 0 .483.858l3.105 2.137 2.122 4.243a1 1 0 0 0 1.789-.894l-.895-3.578a1 1 0 0 0-.633-.78l-3.11-1.414A1 1 0 0 1 13 8.465V3a1 1 0 0 0-1-1z"/>
        <path d="M7 16l-2-2"/>
        <path d="M17 16l2-2"/>
    </svg>
  </div>
);

const Bird = ({ style }: { style: React.CSSProperties }) => (
  <div className="flying-creature" style={style}>
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full text-foreground">
        <path d="M16 3.01s-2 1.3-4 2.6c-2.3 1.4-4.7 2.9-7 2.9A2.5 2.5 0 0 0 3 11a2.5 2.5 0 0 0 2 2.5 4.8 4.8 0 0 0 4-2.5c2-2.3 3.5-4.5 3.5-4.5s2.5 2.5 5 5c.5.5 1.2.5 1.7 0l2.8-2.8c.5-.5.5-1.2 0-1.7C21 6.01 16 3.01 16 3.01z"/>
        <path d="M11 15.5s-1.5 1.5-3 3c-1.5 1.5-3 3-3 3"/>
    </svg>
  </div>
);

interface FlyingCreaturesProps {
  type: 'bats' | 'birds';
  count?: number;
}

export function FlyingCreatures({ type, count = 15 }: FlyingCreaturesProps) {
  const [creatures, setCreatures] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const newCreatures = Array.from({ length: count }).map((_, i) => {
      const style = {
        left: `${Math.random() * 100}vw`,
        animationDelay: `${Math.random() * 2}s`,
        transform: `scale(${Math.random() * 0.5 + 0.5})`,
      };
      
      const key = `${type}-${i}-${Date.now()}`;

      if (type === 'bats') {
        return <Bat key={key} style={style} />;
      }
      return <Bird key={key} style={style} />;
    });

    setCreatures(newCreatures);
  }, [type, count]);

  return <>{creatures}</>;
}
