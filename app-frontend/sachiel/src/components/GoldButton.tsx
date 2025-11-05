import React from 'react';

interface GoldButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function GoldButton({ children, onClick, className = '' }: GoldButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-8 py-4 
        bg-[#d3af37] 
        text-[#0e0e0e] 
        rounded-lg 
        transition-all 
        duration-300 
        hover:bg-[#e6c550] 
        hover:shadow-[0_0_30px_rgba(211,175,55,0.5)]
        hover:scale-105
        ${className}
      `}
    >
      {children}
    </button>
  );
}
