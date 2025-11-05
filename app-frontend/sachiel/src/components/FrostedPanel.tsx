import React from 'react';

interface FrostedPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function FrostedPanel({ children, className = '' }: FrostedPanelProps) {
  return (
    <div
      className={`
        backdrop-blur-xl 
        bg-white/5 
        border 
        border-white/10 
        rounded-2xl 
        p-8
        ${className}
      `}
    >
      {children}
    </div>
  );
}
