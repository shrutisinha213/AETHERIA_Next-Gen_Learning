# Aetheria // Next-Gen Learning Dashboard

A high-fidelity, responsive "Student Dashboard" prototype. Built for the **Frontend Intern Challenge**, featuring hardware-accelerated animations, zero layout shifts, and server-rendered data fetching with Supabase.

---

## 🚀 Key Features

*   **Bento Grid Architecture**: Custom grid structure that adapts beautifully across devices.
*   **Dark Mode Aesthetics**: Deep obsidian hues (`#030303`/`#0a0a0c`) accented with subtle, floating radial gradients and an SVG grain noise texture overlay.
*   **Zero Layout Shifts**: Fully optimized entry and hover animations using strictly `transform` and `opacity` to prevent browser repaints/reflows.
*   **Next.js Server Components (RSC)**: Secure, direct database query fetching on the server.
*   **Automatic Skeleton Loaders**: Fluid, pulsing grid skeletons triggered during database operations.
*   **Staggered Entrance & Spring Physics**: Bento tiles stagger-fade on load, and navigation items snap smoothly using Framer Motion springs.
*   **Dual-mode Database Fallback**: Detects missing configurations or connection issues, showing a helpful warning banner and falling back to local mock data automatically.

---

## 🛠️ Tech Stack

*   **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Database**: [Supabase](https://supabase.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Language**: TypeScript

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── error.tsx         # Graceful rendering error boundary
│   ├── globals.css       # Core design tokens, gradients, grain and glows
│   ├── layout.tsx        # App HTML wrapper, fonts, and dark theme configurations
│   ├── loading.tsx       # Automatic skeleton routing template
│   └── page.tsx          # Next.js Server Component (RSC) database entry
├── components/
│   ├── ActivityTile.tsx  # Heatmap calendar and study stats card
│   ├── CourseSkeleton.tsx# Grid layout pulsing skeletons
│   ├── CourseTile.tsx    # Course details, dynamic icon, and transform-scale progress bar
│   ├── DashboardContainer.tsx # Client orchestrator for tabs, alerts and stagger anims
│   ├── HeroTile.tsx      # Greeting & streak banner
│   ├── Sidebar.tsx       # Collapsible side navigation & mobile bottom pill nav
│   └── icons.tsx         # Dynamic string-to-Lucide icon mapper
├── lib/
│   └── supabase.ts       # Supabase client initialize & error fallback logic
└── types/
    └── index.ts          # TypeScript type contracts
```

---

## ⚡ The Server/Client Split

To maximize loading efficiency and maintain a high level of user interaction, we separated the components into:

1.  **Server Components (`src/app/page.tsx`)**:
    *   Initiates the database request to Supabase on the server side using the `@supabase/supabase-js` client.
    *   Prevents client bundle bloat by not shipping data-fetching packages to the browser.
    *   Uses `export const revalidate = 0` to disable caching, ensuring the dashboard displays real-time student stats on reload.

2.  **Client Components (Components under `src/components/` & `src/app/error.tsx`)**:
    *   Coordinates UI state (active navigation tab, sidebar toggle collapse).
    *   Manages hardware-accelerated user animations using Framer Motion (hover bounds, staggered page entrance, layout animations).
    *   Resolves dynamic icons inside `icons.tsx`.

---

## 🎯 Optimization: Zero Layout Shifts

We implemented strict rules to avoid browser paint re-calculations:

*   **Scale-X Progress Loading**: Standard progress bars animate their `width` from `0%` to `X%`, which triggers page reflows. We resolved this by keeping a fixed track width and animating the bar's `scaleX` property with `originX: 0`. This offloads the animation completely to the GPU.
*   **Translucent Hover Scaling**: When hovering a Bento Tile, the element elevates slightly using `whileHover={{ scale: 1.015 }}` with spring configuration. Since CSS scales are transform-based, the surrounding grid elements stay perfectly anchored.
*   **Absolute Highlight Snapping**: The active background slider for the navigation items uses Framer Motion's `layoutId` within an absolute-positioned container. Moving the highlight from one button to another happens completely independently of the text document flow.

---

## 💾 Database Setup

To hook the application up to your Supabase instance, follow these steps:

### 1. Execute SQL Schema
Log into your **Supabase Dashboard**, open the **SQL Editor** on your project, copy the contents of `schema.sql` in the project root, and execute it:

```sql
-- Create the 'courses' table
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    progress INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100),
    icon_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Create public read policy
CREATE POLICY "Allow public read access" ON courses
    FOR SELECT TO anon, authenticated USING (true);

-- Insert seed data
INSERT INTO courses (title, progress, icon_name) VALUES
('Advanced React Patterns', 78, 'Layers'),
('Hardware-Accelerated Animation', 42, 'Zap'),
('Database Systems & Supabase', 95, 'Database'),
('Design Systems & Tailwind CSS', 60, 'Palette');
```

### 2. Configure Environment Variables
Copy `.env.example` in the root folder to `.env.local`:

```bash
cp .env.example .env.local
```

Open `.env.local` and paste your project values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-api-key
```

---

## 🛠️ Run Locally

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Start development server**:
    ```bash
    npm run dev
    ```
3.  **Perform production build**:
    ```bash
    npm run build
    ```
