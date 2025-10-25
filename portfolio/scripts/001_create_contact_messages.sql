-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contact messages (public contact form)
CREATE POLICY "Allow public inserts" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Only allow reading all messages (for admin dashboard)
-- In production, you might want to restrict this to authenticated admins only
CREATE POLICY "Allow public to read all messages" ON contact_messages
  FOR SELECT USING (true);
