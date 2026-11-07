// Great Minds AI - Shared Supabase Configuration
// Only the public project URL and publishable key belong in browser code.
const SUPABASE_URL =
  "https://ryuchmmnyjyldwouidyy.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_M5TjIGaSv2LQ8vO4oAs13Q_BXK5l9jE";

window.greatMindsSupabaseConfig = {
  url: SUPABASE_URL,
  publishableKey: SUPABASE_PUBLISHABLE_KEY
};

// Keep the app usable if the optional Supabase CDN library is temporarily unavailable.
if (window.supabase && typeof window.supabase.createClient === "function") {
  window.greatMindsDB = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );
} else {
  window.greatMindsDB = null;
  console.warn("Great Minds AI: Supabase SDK unavailable; online data features are not connected.");
}
