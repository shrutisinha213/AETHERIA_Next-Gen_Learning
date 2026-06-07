'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Sidebar from './Sidebar';
import HeroTile from './HeroTile';
import CourseTile from './CourseTile';
import ActivityTile from './ActivityTile';
import { Course } from '@/types';
import { Database, AlertTriangle, Cpu, Terminal, Compass, GraduationCap } from 'lucide-react';

interface DashboardContainerProps {
  initialCourses: Course[];
  isFallback: boolean;
  fetchError: string | null;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function DashboardContainer({
  initialCourses,
  isFallback,
  fetchError,
}: DashboardContainerProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [courses] = useState<Course[]>(initialCourses);

  return (
    <div className="min-h-screen flex bg-[#030303] text-zinc-100">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container Area */}
      <div className="flex-1 flex flex-col md:pl-20 lg:pl-64 min-w-0 pb-20 md:pb-0">
        
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-6 lg:px-12 border-b border-zinc-900/50 bg-[#030303]/40 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-semibold tracking-widest uppercase">
            <span>Platform</span>
            <span>/</span>
            <span className="text-purple-400 font-bold">{activeTab}</span>
          </div>

          <div className="flex items-center gap-4">
            {isFallback && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                <Database size={12} />
                <span>Demo Mode</span>
              </div>
            )}
            
            <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800/80 px-3.5 py-1.5 rounded-xl">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs text-zinc-400 font-medium">Systems Nominal</span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 lg:p-12 max-w-7xl w-full mx-auto overflow-y-auto">
          {/* Demo Fallback Alert Banner */}
          {isFallback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-5 rounded-3xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-md flex flex-col sm:flex-row items-start gap-4"
            >
              <div className="h-10 w-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 flex-shrink-0 border border-amber-500/20">
                <AlertTriangle size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-amber-200">Supabase Connection Notice</h4>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl">
                  Using local mock data. To fetch live server-side data, configure your Supabase variables in a 
                  <code className="text-amber-300 mx-1 bg-zinc-950 px-1 py-0.5 rounded">.env.local</code> file and seed the database using the 
                  <code className="text-amber-300 mx-1 bg-zinc-950 px-1 py-0.5 rounded">schema.sql</code> script.
                  {fetchError && <span className="text-red-400/80 block mt-1">Error detail: {fetchError}</span>}
                </p>
              </div>
            </motion.div>
          )}

          {/* Active View Router */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              {activeTab === 'dashboard' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                  {/* Hero Tile (2 Columns on MD+) */}
                  <motion.div variants={itemVariants} className="md:col-span-2">
                    <HeroTile />
                  </motion.div>

                  {/* Course Cards (Fetched dynamically from Server) */}
                  {courses.map((course, idx) => (
                    <motion.div variants={itemVariants} key={course.id}>
                      <CourseTile course={course} index={idx} />
                    </motion.div>
                  ))}

                  {/* Activity/Consistency Tile (3 Columns on LG+) */}
                  <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-3">
                    <ActivityTile />
                  </motion.div>
                </motion.div>
              )}

              {activeTab === 'courses' && (
                <div>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Active Curriculums</h2>
                    <p className="text-sm text-zinc-500 mt-1">Track and manage your registered learning paths.</p>
                  </div>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {courses.map((course, idx) => (
                      <motion.div variants={itemVariants} key={course.id}>
                        <CourseTile course={course} index={idx} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Learning Insights</h2>
                    <p className="text-sm text-zinc-500 mt-1">Detailed metrics on your cognitive efficiency and streaks.</p>
                  </div>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-3">
                      <ActivityTile />
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {activeTab === 'schedule' && (
                <div className="h-[400px] rounded-3xl border border-zinc-850 bg-zinc-900/20 backdrop-blur-xl flex flex-col items-center justify-center text-center p-8">
                  <div className="h-14 w-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 border border-purple-500/20">
                    <Compass size={24} className="animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Syncing Schedule...</h3>
                  <p className="text-zinc-500 text-sm max-w-sm mt-1">
                    Connecting to study planners and synchronizing mock calendars. Releasing shortly in next major sprint.
                  </p>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="h-[400px] rounded-3xl border border-zinc-850 bg-zinc-900/20 backdrop-blur-xl flex flex-col items-center justify-center text-center p-8">
                  <div className="h-14 w-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4 border border-cyan-500/20">
                    <Cpu size={24} className="animate-pulse" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Dashboard Preferences</h3>
                  <p className="text-zinc-500 text-sm max-w-sm mt-1">
                    Telemetry, dark-mode gradients, and rendering toggles configuration center is under hardware optimization.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
