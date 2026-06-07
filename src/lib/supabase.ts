import { createClient } from '@supabase/supabase-js';
import { Course } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return !!(supabaseUrl && supabaseAnonKey);
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const MOCK_COURSES: Course[] = [
  {
    id: 'mock-1',
    title: 'Advanced React Patterns',
    progress: 78,
    icon_name: 'Layers',
    created_at: new Date().toISOString(),
  },
  {
    id: 'mock-2',
    title: 'Hardware-Accelerated Animation',
    progress: 42,
    icon_name: 'Zap',
    created_at: new Date().toISOString(),
  },
  {
    id: 'mock-3',
    title: 'Database Systems & Supabase',
    progress: 95,
    icon_name: 'Database',
    created_at: new Date().toISOString(),
  },
  {
    id: 'mock-4',
    title: 'Design Systems & Tailwind CSS',
    progress: 60,
    icon_name: 'Palette',
    created_at: new Date().toISOString(),
  },
];

export interface FetchCoursesResult {
  data: Course[];
  error: string | null;
  isFallback: boolean;
}

export async function fetchCourses(): Promise<FetchCoursesResult> {
  // Check if env variables are set
  if (!supabase) {
    console.warn('Supabase URL or Anon Key is missing. Falling back to local high-fidelity mock data.');
    // Simulate a slight network delay for natural skeleton loader visualization
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return {
      data: MOCK_COURSES,
      error: null,
      isFallback: true,
    };
  }

  try {
    // Add artificial delay for loading state demo if desired, e.g., 800ms
    // To make skeleton loading animations feel premium, a slight delay helps.
    await new Promise((resolve) => setTimeout(resolve, 800));

    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase query error:', error.message);
      return {
        data: MOCK_COURSES,
        error: error.message,
        isFallback: true,
      };
    }

    if (!data || data.length === 0) {
      console.warn('No courses found in database. Seeding mock courses local-side.');
      return {
        data: MOCK_COURSES,
        error: null,
        isFallback: true,
      };
    }

    return {
      data: data as Course[],
      error: null,
      isFallback: false,
    };
  } catch (err: any) {
    console.error('Failed to fetch from Supabase:', err);
    return {
      data: MOCK_COURSES,
      error: err.message || 'Unknown network error',
      isFallback: true,
    };
  }
}
