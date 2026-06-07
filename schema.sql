-- Create the 'courses' table for the Next-Gen Student Dashboard
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    progress INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100),
    icon_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous/authenticated read access to courses
CREATE POLICY "Allow public read access" ON courses
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Clean up any existing data in the table (optional)
TRUNCATE TABLE courses;

-- Insert seed data for the dashboard
INSERT INTO courses (title, progress, icon_name) VALUES
('Advanced React Patterns', 78, 'Layers'),
('Hardware-Accelerated Animation', 42, 'Zap'),
('Database Systems & Supabase', 95, 'Database'),
('Design Systems & Tailwind CSS', 60, 'Palette');
