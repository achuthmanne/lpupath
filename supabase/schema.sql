-- ==============================================================================
-- LPU PATH: Placement Stories & Verification Proofs Database Schema
-- ==============================================================================

-- 1. Create Placement Stories Table
CREATE TABLE IF NOT EXISTS public.placement_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- 1. Student & Company Details
  full_name TEXT NOT NULL,
  branch TEXT NOT NULL,
  passing_year TEXT NOT NULL,
  company_name TEXT NOT NULL,
  role TEXT NOT NULL,
  location TEXT,
  tier TEXT NOT NULL DEFAULT 'Super Dream',
  
  -- 2. Real Salary Figures
  total_ctc TEXT NOT NULL,
  fixed_base TEXT NOT NULL,
  bonus_stocks TEXT,
  internship_stipend TEXT,
  
  -- 3. Recruiter Eligibility Cutoffs
  min_cgpa TEXT,
  allowed_branches TEXT,
  backlog_policy TEXT,
  
  -- 4. Overall Difficulty & Dynamic Interview Rounds (Stored as JSONB array)
  difficulty TEXT DEFAULT 'Medium',
  rounds JSONB NOT NULL DEFAULT '[]'::jsonb,
  
  -- 5. Senior Tips & Mentorship
  what_to_prepare TEXT,
  key_resources TEXT,
  linkedin_url TEXT,
  
  -- 6. Verification Document (Proof of Offer / UMS Screenshot)
  proof_file_url TEXT,
  proof_file_name TEXT,
  
  -- 7. Verification & Moderation Status
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending' | 'verified' | 'rejected'
  is_verified BOOLEAN NOT NULL DEFAULT false,
  
  -- 8. Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Create Index for Fast Queries
CREATE INDEX IF NOT EXISTS idx_placement_stories_company ON public.placement_stories (company_name);
CREATE INDEX IF NOT EXISTS idx_placement_stories_status ON public.placement_stories (status);
CREATE INDEX IF NOT EXISTS idx_placement_stories_created ON public.placement_stories (created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.placement_stories ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies:
-- Allow anyone (public/students) to submit a placement story
DROP POLICY IF EXISTS "Allow public insert to placement_stories" ON public.placement_stories;
CREATE POLICY "Allow public insert to placement_stories"
ON public.placement_stories
FOR INSERT
TO public
WITH CHECK (true);

-- Allow public to read verified stories for placement feed
DROP POLICY IF EXISTS "Allow public view verified placement_stories" ON public.placement_stories;
CREATE POLICY "Allow public view verified placement_stories"
ON public.placement_stories
FOR SELECT
TO public
USING (status = 'verified' OR is_verified = true);

-- Allow service_role / admin complete access to manage all rows
DROP POLICY IF EXISTS "Allow service_role full access" ON public.placement_stories;
CREATE POLICY "Allow service_role full access"
ON public.placement_stories
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ==============================================================================
-- Storage Bucket Policies for 'placement-proofs'
-- ==============================================================================
-- Allow public uploads of verification proofs
DROP POLICY IF EXISTS "Allow public upload to placement-proofs" ON storage.objects;
CREATE POLICY "Allow public upload to placement-proofs"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'placement-proofs');

-- Allow public reads from placement-proofs
DROP POLICY IF EXISTS "Allow public read from placement-proofs" ON storage.objects;
CREATE POLICY "Allow public read from placement-proofs"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'placement-proofs');
