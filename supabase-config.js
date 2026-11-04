
// Great Minds AI - Supabase Configuration

const SUPABASE_URL =
  "https://ryuchmmnyjyldwouidyy.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_M5TjIGaSv2LQ8vO4oAs13Q_BXK5l9jE";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

window.greatMindsDB = supabaseClient;
window.greatMindsSupabaseConfig = { url: SUPABASE_URL, publishableKey: SUPABASE_PUBLISHABLE_KEY };

console.log("Great Minds AI Supabase client ready");
