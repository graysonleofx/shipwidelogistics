import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://cruonpkidlibuenzktgb.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNydW9ucGtpZGxpYnVlbnprdGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3ODM1ODMsImV4cCI6MjA3MzM1OTU4M30.eAg2VBi8NTFGN8Z_pgIvoIhVwGmcwdbcVEm5a92dssc"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;