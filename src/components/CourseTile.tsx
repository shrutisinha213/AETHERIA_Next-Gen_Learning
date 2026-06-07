'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DynamicIcon } from './icons';
import { Course } from '@/types';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface CourseTileProps {
  course: Course;
  index: number;
}

export default function CourseTile({ course, index }: CourseTileProps) {
  const { title, progress, icon_name } = course;

  // Distribute different mesh gradients across cards based on index
  const meshClasses = [
    'card-mesh-1',
    'card-mesh-2',
    'card-mesh-3',
    'card-mesh-4',
  ];
  const selectedMesh = meshClasses[index % meshClasses.length];

  return (
    <motion.article
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`glow-border grain-texture relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-6 flex flex-col justify-between min-h-[200px] shadow-lg backdrop-blur-md ${selectedMesh}`}
    >
      {/* Top Bar: Icon and Status */}
      <div className="flex items-start justify-between">
        <div className="h-12 w-12 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 flex items-center justify-center text-purple-400">
          <DynamicIcon name={icon_name} size={24} />
        </div>
        
        {progress === 100 ? (
          <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full">
            <CheckCircle2 size={10} /> Complete
          </span>
        ) : (
          <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-full">
            In Progress
          </span>
        )}
      </div>

      {/* Main Details */}
      <div className="mt-6">
        <h3 className="text-lg font-bold text-white tracking-tight line-clamp-2 hover:text-purple-300 transition-colors cursor-pointer group flex items-center gap-1.5">
          {title}
          <ArrowUpRight size={14} className="opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
        </h3>
        <p className="text-xs text-zinc-500 mt-1">
          {progress === 100 ? 'Module finished' : `${100 - progress}% remaining to complete`}
        </p>
      </div>

      {/* Progress Section */}
      <div className="mt-6 space-y-2">
        <div className="flex justify-between items-baseline text-xs">
          <span className="text-zinc-500 font-medium">Progress</span>
          <span className="text-zinc-300 font-bold">{progress}%</span>
        </div>
        
        {/* Progress bar with hardware accelerated transform scaling (scaleX) to prevent layout repaints */}
        <div className="h-2 w-full bg-zinc-950 rounded-full border border-zinc-800/50 overflow-hidden relative">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            style={{ originX: 0 }}
            transition={{
              type: 'spring',
              stiffness: 70,
              damping: 15,
              delay: 0.1 * index,
            }}
            className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 rounded-full"
          />
        </div>
      </div>
    </motion.article>
  );
}
