import React from 'react';

export default function CourseSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-6 lg:space-y-8">
      {/* Bento Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Hero Tile Skeleton (md:col-span-2) */}
        <div className="h-[260px] md:col-span-2 bg-zinc-900/20 border border-zinc-800/50 rounded-3xl p-6 lg:p-8 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="h-5 bg-zinc-800/60 rounded-full w-24" />
            <div className="h-9 bg-zinc-800/60 rounded-xl w-2/3" />
            <div className="h-4 bg-zinc-800/40 rounded-lg w-1/2" />
          </div>
          <div className="flex gap-4 pt-6 border-t border-zinc-800/30">
            <div className="h-14 bg-zinc-800/50 rounded-2xl w-36" />
            <div className="h-14 bg-zinc-800/50 rounded-2xl w-36" />
            <div className="h-12 bg-zinc-800/30 rounded-2xl w-28 ml-auto hidden sm:block" />
          </div>
        </div>

        {/* Course Tiles Skeletons (3 or 4 tiles) */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[200px] bg-zinc-900/20 border border-zinc-800/50 rounded-3xl p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="h-12 w-12 bg-zinc-800/60 rounded-2xl" />
              <div className="h-5 bg-zinc-800/40 rounded-full w-20" />
            </div>
            <div className="space-y-2">
              <div className="h-6 bg-zinc-800/60 rounded-lg w-4/5" />
              <div className="h-3.5 bg-zinc-800/40 rounded-lg w-1/2" />
            </div>
            <div className="space-y-2.5">
              <div className="h-3 bg-zinc-800/40 rounded-full w-full" />
            </div>
          </div>
        ))}

        {/* Activity Tile Skeleton (md:col-span-2 or lg:col-span-3) */}
        <div className="h-[300px] md:col-span-2 lg:col-span-3 bg-zinc-900/20 border border-zinc-800/50 rounded-3xl p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-zinc-800/60 rounded-xl" />
            <div className="space-y-2 flex-1">
              <div className="h-5 bg-zinc-800/60 rounded-lg w-40" />
              <div className="h-3.5 bg-zinc-800/40 rounded-lg w-64" />
            </div>
          </div>
          <div className="h-28 bg-zinc-800/30 rounded-2xl w-full my-4" />
          <div className="h-12 bg-zinc-800/40 rounded-xl w-full" />
        </div>

      </div>
    </div>
  );
}
