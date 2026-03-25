-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the fuel_records table
CREATE TABLE fuel_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  route TEXT NOT NULL,
  fuel_type TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE fuel_records ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert new records
CREATE POLICY "Allow anonymous users to insert records"
ON fuel_records
FOR INSERT
TO public
WITH CHECK (true);

-- Note: No SELECT policy is created. 
-- This ensures only authenticated Service Role clients (e.g., our server API) can view data.
