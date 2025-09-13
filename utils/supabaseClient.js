import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://gumaejsjmvhpgidhjqhv.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1bWFlanNqbXZocGdpZGhqcWh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNDU0MDMsImV4cCI6MjA2NzYyMTQwM30.tqHoglhrFRIAH2TWZx_0QIXR72pJ7e6PRTyWZTSw5ck"
export const supabase = createClient(supabaseUrl, supabaseKey);
