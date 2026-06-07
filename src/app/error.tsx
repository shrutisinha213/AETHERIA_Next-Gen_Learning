'use client';

import React, { useEffect } from 'react';
import { ShieldAlert, RotateCcw } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to telemetry
    console.error('Captured dashboard render error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-3xl border border-red-500/25 bg-red-500/5 p-8 text-center backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-red-500/10 blur-2xl pointer-events-none" />

        <div className="h-14 w-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400 mx-auto mb-6 border border-red-500/20">
          <ShieldAlert size={28} className="animate-pulse" />
        </div>
        
        <h2 className="text-xl font-bold tracking-tight text-white mb-2">Something went wrong</h2>
        
        <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
          An error occurred while loading the dashboard components. We have recorded this event. You can attempt to reload the system state.
        </p>

        <button
          onClick={reset}
          className="w-full flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-black py-3 px-5 rounded-2xl text-xs font-bold transition-all shadow-lg hover:shadow-white/5 cursor-pointer"
        >
          <RotateCcw size={14} /> Reset State & Retry
        </button>
      </div>
    </div>
  );
}
