import React from 'react';
import DashboardContainer from '@/components/DashboardContainer';
import { fetchCourses } from '@/lib/supabase';

// Force dynamic server rendering (disable caching) to ensure fresh Supabase fetches on load
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function Page() {
  // Fetch courses from Supabase with local mock data fallback
  const { data, error, isFallback } = await fetchCourses();

  return (
    <DashboardContainer
      initialCourses={data}
      isFallback={isFallback}
      fetchError={error}
    />
  );
}
