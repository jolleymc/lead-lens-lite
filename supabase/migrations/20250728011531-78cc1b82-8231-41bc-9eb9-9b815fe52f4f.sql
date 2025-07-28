-- Make email and contact_name nullable in leads table
ALTER TABLE leads ALTER COLUMN email DROP NOT NULL;
ALTER TABLE leads ALTER COLUMN contact_name DROP NOT NULL;