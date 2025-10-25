-- Create analytics tables for tracking page views and resume downloads

-- Page views table
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resume downloads table
CREATE TABLE IF NOT EXISTS resume_downloads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
CREATE INDEX IF NOT EXISTS idx_resume_downloads_created_at ON resume_downloads(created_at DESC);

-- Enable Row Level Security
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_downloads ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public inserts and reads
CREATE POLICY "Allow public insert on page_views" ON page_views
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public read on page_views" ON page_views
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public insert on resume_downloads" ON resume_downloads
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public read on resume_downloads" ON resume_downloads
  FOR SELECT TO anon, authenticated
  USING (true);
