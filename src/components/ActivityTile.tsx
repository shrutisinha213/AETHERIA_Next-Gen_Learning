'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Award, Clock } from 'lucide-react';

// Generate seed contribution data (7 rows for days, 20 columns for weeks)
// Uses a deterministic hash based on coordinates to prevent SSR/Client hydration mismatches.
const generateActivityData = () => {
  const data: number[][] = [];
  // Activity levels: 0 (none), 1 (light), 2 (medium), 3 (high), 4 (intense)
  for (let day = 0; day < 7; day++) {
    const row: number[] = [];
    for (let week = 0; week < 20; week++) {
      // Deterministic coordinate-based pseudo-random hash (common in GLSL noise shaders)
      const dot = day * 12.9898 + week * 78.233;
      const hash = Math.abs(Math.sin(dot) * 43758.5453) % 1;
      
      let val = 0;
      if (hash > 0.82) val = 4;
      else if (hash > 0.6) val = 3;
      else if (hash > 0.4) val = 2;
      else if (hash > 0.18) val = 1;
      
      // Scale down slightly on weekends (days 5 and 6: Saturday & Sunday)
      if (day >= 5) {
        const reductionHash = Math.abs(Math.cos(day * 4.3 + week * 8.9) * 100) % 1;
        if (reductionHash > 0.3) {
          val = Math.max(0, val - 1);
        }
      }
      row.push(val);
    }
    data.push(row);
  }
  return data;
};

const activityLevels = [
  'bg-zinc-950/60 border-zinc-900', // Level 0
  'bg-purple-950/30 border-purple-900/20 text-purple-400', // Level 1
  'bg-purple-900/40 border-purple-800/30 text-purple-300', // Level 2
  'bg-purple-600/60 border-purple-500/40 text-purple-200', // Level 3
  'bg-cyan-500/80 border-cyan-400/50 text-black', // Level 4
];

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function ActivityTile() {
  const [activityGrid] = useState(generateActivityData());
  const [hoveredCell, setHoveredCell] = useState<{ value: number; day: number; week: number } | null>(null);

  // Stats summaries
  const stats = [
    { label: 'Weekly Average', value: '18.4 hrs', icon: Clock, color: 'text-cyan-400' },
    { label: 'Total Learning', value: '148 hrs', icon: Award, color: 'text-purple-400' },
    { label: 'Efficiency', value: '+12.4%', icon: TrendingUp, color: 'text-emerald-400' },
  ];

  return (
    <motion.section
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glow-border grain-texture relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-6 md:col-span-2 lg:col-span-3 flex flex-col justify-between shadow-lg backdrop-blur-md card-mesh-3 min-h-[300px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Calendar size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Study Consistency</h2>
            <p className="text-xs text-zinc-500">Tracked daily lessons over the past 20 weeks</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-medium">
          <span>Less</span>
          {activityLevels.map((lvlClass, idx) => (
            <div key={idx} className={`h-2.5 w-2.5 rounded-sm border ${lvlClass.split(' ')[0]} ${lvlClass.split(' ')[1]}`} />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Grid Container */}
      <div className="flex-1 flex flex-col justify-center min-w-0 py-4 overflow-x-auto select-none no-scrollbar">
        <div className="flex gap-3 min-w-[500px]">
          {/* Day of Week Labels */}
          <div className="flex flex-col justify-between text-[10px] text-zinc-500 font-bold py-1.5 h-28 w-8 text-right pr-2">
            <span>M</span>
            <span>W</span>
            <span>F</span>
            <span>S</span>
          </div>

          {/* Grid Cells */}
          <div className="flex-1 grid grid-rows-7 grid-flow-col gap-1 h-28">
            {activityGrid.flatMap((row, rIdx) =>
              row.map((val, cIdx) => (
                <div
                  key={`${rIdx}-${cIdx}`}
                  className={`w-3 h-3 rounded-[3px] border transition-colors duration-150 cursor-pointer ${activityLevels[val]}`}
                  onMouseEnter={() => setHoveredCell({ value: val, day: rIdx, week: cIdx })}
                  onMouseLeave={() => setHoveredCell(null)}
                />
              ))
            )}
          </div>
        </div>

        {/* Interactive Tooltip Status */}
        <div className="h-6 mt-3 text-xs text-zinc-400">
          {hoveredCell ? (
            <span className="bg-zinc-950/60 border border-zinc-800/80 px-2.5 py-1 rounded-md inline-block animate-fade-in">
              {dayLabels[hoveredCell.day]}, Week {20 - hoveredCell.week}:{' '}
              <span className="font-semibold text-white">
                {hoveredCell.value === 0 && 'No studies'}
                {hoveredCell.value === 1 && '1 lesson completed'}
                {hoveredCell.value === 2 && '2 lessons completed'}
                {hoveredCell.value === 3 && '3 lessons (1.5h studied)'}
                {hoveredCell.value === 4 && '4+ lessons (Productive day!)'}
              </span>
            </span>
          ) : (
            <span className="text-zinc-500 italic">Hover cells to view daily stats</span>
          )}
        </div>
      </div>

      {/* Bottom Metrics Bar */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-zinc-800/40">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 bg-zinc-950/20 px-3 py-2 rounded-xl border border-zinc-900/50">
            <div className={`h-8 w-8 rounded-lg bg-zinc-950/75 flex items-center justify-center border border-zinc-900 ${stat.color}`}>
              <stat.icon size={16} />
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{stat.label}</div>
              <div className="text-xs sm:text-sm font-black text-white">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
