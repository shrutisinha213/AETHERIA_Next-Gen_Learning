import React from 'react';
import CourseSkeleton from '@/components/CourseSkeleton';

export default function Loading() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar spacing matching the final layout */}
      <div className="hidden md:block w-20 lg:w-64 flex-shrink-0" />
      
      <main className="flex-1 p-6 md:p-8 lg:p-12 pb-24 md:pb-8 max-w-7xl mx-auto w-full">
        {/* Header Skeleton */}
        <div className="mb-8 space-y-2.5 animate-pulse">
          <div className="h-4 bg-zinc-800/40 rounded-full w-28" />
          <div className="h-8 bg-zinc-800/50 rounded-xl w-60" />
        </div>
        
        {/* Bento Grid Skeleton */}
        <CourseSkeleton />
      </main>
    </div>
  );
}
