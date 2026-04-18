-- SQL to create tables in Supabase for the 40 Days of Prayer app

-- 1. Emphases Lookup Table
CREATE TABLE IF NOT EXISTS emphases (
    id SERIAL PRIMARY KEY,
    label TEXT NOT NULL
);

-- 2. Instructions Lookup Table
CREATE TABLE IF NOT EXISTS instructions (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL
);

-- 3. Profiles Table (Extends Supabase Auth)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    current_day INTEGER DEFAULT 1,
    theme_preference TEXT DEFAULT 'day',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Prayer Targets Table
CREATE TABLE IF NOT EXISTS prayer_targets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    name_1 TEXT,
    name_2 TEXT,
    name_3 TEXT,
    name_4 TEXT,
    name_5 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Content Master Table
CREATE TABLE IF NOT EXISTS content_master (
    day_number INTEGER PRIMARY KEY,
    emphasis_id INTEGER REFERENCES emphases(id),
    title TEXT NOT NULL,
    instr_id INTEGER REFERENCES instructions(id),
    scripture_1 TEXT,
    devotional_body TEXT NOT NULL,
    scripture_2 TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_targets ENABLE ROW LEVEL SECURITY;

-- Simple RLS Policies
CREATE POLICY "Users can view their own profile" ON profiles 
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles 
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view their own prayer targets" ON prayer_targets 
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own prayer targets" ON prayer_targets 
    FOR ALL USING (auth.uid() = user_id);

-- Public access for content (read-only)
ALTER TABLE emphases ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructions ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_master ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for emphases" ON emphases FOR SELECT USING (true);
CREATE POLICY "Public read access for instructions" ON instructions FOR SELECT USING (true);
CREATE POLICY "Public read access for content_master" ON content_master FOR SELECT USING (true);
