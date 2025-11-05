import React from 'react';

export function AppMockup() {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* App Window Container - Component: App Mockup */}
      <div className="backdrop-blur-2xl bg-[#1a1a1a]/90 border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
        {/* Window Title Bar */}
        <div className="bg-[#0e0e0e]/80 px-4 py-3 border-b border-white/10 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="flex-1 text-center text-[#f2f2f2]/50 text-sm">Sachiel - Untitled</div>
        </div>
        
        {/* Editor Content */}
        <div className="p-8 min-h-[400px] backdrop-blur-xl bg-gradient-to-br from-[#0e0e0e]/50 to-[#1a1a1a]/50">
          <div className="space-y-4 text-[#f2f2f2]/80">
            <p>The quick brown fox jumps over the lazy dog.</p>
            <p className="opacity-60">Focus on what matters.</p>
            <p className="opacity-40">No distractions. Just words.</p>
            <div className="mt-8 w-2 h-6 bg-[#d3af37] animate-pulse"></div>
          </div>
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#d3af37]/5 to-transparent pointer-events-none rounded-2xl"></div>
      </div>
    </div>
  );
}
