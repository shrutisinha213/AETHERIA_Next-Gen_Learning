'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, Sparkles, ArrowRight } from 'lucide-react';

export default function HeroTile() {
  return (
    <motion.section
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glow-border grain-texture relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-6 lg:p-8 flex flex-col justify-between min-h-[260px] md:col-span-2 card-mesh-1 shadow-2xl backdrop-blur-md"
    >
      {/* Abstract Design Shape */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      {/* Greeting and Welcome */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="flex items-center justify-center px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wider uppercase">
            Pro Member
          </span>
          <span className="flex items-center gap-1 text-xs text-zinc-400">
            <Sparkles size={12} className="text-cyan-400" /> 2,450 XP
          </span>
        </div>
        
        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Welcome back, <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">User</span>
        </h1>
        <p className="text-zinc-400 mt-2 max-w-md text-sm lg:text-base">
          You're on track! Complete your daily React architecture module to maintain your perfect streak.
        </p>
      </div>

      {/* Streak and Achievement Badges */}
      <div className="mt-6 grid grid-cols-2 sm:flex sm:items-center gap-4 pt-6 border-t border-zinc-800/40">
        {/* Streak Indicator */}
        <div className="flex items-center gap-3 bg-zinc-950/50 px-4 py-3 rounded-2xl border border-zinc-800/60 shadow-inner">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500/30 rounded-full blur-md animate-pulse" />
            <div className="relative h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/30 text-orange-400">
              <Flame size={20} className="animate-bounce" style={{ animationDuration: '2s' }} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white tracking-tight leading-none">18</div>
            <div className="text-[10px] text-orange-300 font-bold uppercase tracking-wider mt-0.5">Day Streak</div>
          </div>
        </div>

        {/* Daily Goal Progress */}
        <div className="flex items-center gap-3 bg-zinc-950/50 px-4 py-3 rounded-2xl border border-zinc-800/60 shadow-inner">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-md" />
            <div className="relative h-10 w-10 rounded-xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30 text-yellow-400">
              <Trophy size={20} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white tracking-tight leading-none">85%</div>
            <div className="text-[10px] text-yellow-400 font-bold uppercase tracking-wider mt-0.5">Daily Goal</div>
          </div>
        </div>

        {/* Action Callout */}
        <button className="col-span-2 sm:col-span-1 sm:ml-auto flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-black px-5 py-3 rounded-2xl text-xs font-bold transition-all shadow-lg hover:shadow-white/5 cursor-pointer hover:translate-x-0.5 duration-200">
          Resume Learning <ArrowRight size={14} />
        </button>
      </div>
    </motion.section>
  );
}
