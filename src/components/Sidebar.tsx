'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DynamicIcon } from './icons';
import { GraduationCap, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'courses', label: 'Courses', icon: 'BookOpen' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
  { id: 'schedule', label: 'Schedule', icon: 'Calendar' },
  { id: 'settings', label: 'Settings', icon: 'Settings' },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Sidebar for Desktop (> 1024px) & Tablet (768px - 1024px) */}
      <aside
        className={`hidden md:flex flex-col fixed left-0 top-0 h-screen z-30 transition-all duration-300 border-r border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl
          ${isCollapsed ? 'w-20' : 'w-20 lg:w-64'}
        `}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-zinc-800/50">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 shadow-lg shadow-purple-500/20 text-white flex-shrink-0">
              <GraduationCap size={22} className="animate-pulse" />
            </div>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-bold text-lg bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent tracking-wider"
              >
                AETHERIA
              </motion.span>
            )}
          </div>

          {/* Manual Collapse Button (Hidden on Tablet, only shown on Desktop size) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center h-8 w-8 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-colors cursor-pointer group
                  ${isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}
                `}
              >
                {/* Active Highlight (Framer Motion layoutId) */}
                {isActive && (
                  <motion.div
                    layoutId="activeHighlight"
                    className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-cyan-900/10 border-l-2 border-purple-500 rounded-xl"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                {/* Icon wrapper */}
                <div className={`relative z-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-purple-400' : 'text-zinc-400'}`}>
                  <DynamicIcon name={item.icon} size={20} />
                </div>

                {/* Label text */}
                {!isCollapsed && (
                  <span className="relative z-10 font-medium tracking-wide lg:block md:hidden">
                    {item.label}
                  </span>
                )}

                {/* Tooltip for collapsed mode */}
                {(isCollapsed || (typeof window !== 'undefined' && window.innerWidth < 1024)) && (
                  <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl z-50 whitespace-nowrap lg:hidden">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-zinc-800/50">
          <button
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium text-zinc-500 hover:text-red-400 transition-colors cursor-pointer group`}
          >
            <div className="group-hover:scale-110 transition-transform">
              <LogOut size={20} />
            </div>
            {!isCollapsed && (
              <span className="lg:block md:hidden tracking-wide">Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* Bottom Navigation for Mobile (< 768px) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-zinc-950/80 backdrop-blur-lg border-t border-zinc-850 z-40 flex items-center justify-around px-4 pb-safe">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative py-2 px-3 flex flex-col items-center justify-center gap-1 text-zinc-400 hover:text-zinc-200 cursor-pointer"
            >
              {/* Highlight background pill */}
              {isActive && (
                <motion.div
                  layoutId="activeMobileHighlight"
                  className="absolute inset-0 bg-purple-500/10 rounded-full"
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}

              <div className={`relative z-10 transition-transform duration-200 ${isActive ? 'text-purple-400 scale-110' : 'text-zinc-400'}`}>
                <DynamicIcon name={item.icon} size={20} />
              </div>
              
              <span className={`relative z-10 text-[10px] tracking-wide font-medium ${isActive ? 'text-purple-300' : 'text-zinc-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
