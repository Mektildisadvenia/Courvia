import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    "Missing Supabase environment variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY."
  );
}

let parsedSupabaseUrl;

try {
  parsedSupabaseUrl = new URL(supabaseUrl);
} catch {
  throw new Error(
    "VITE_SUPABASE_URL must be a valid HTTPS URL."
  );
}

if (parsedSupabaseUrl.protocol !== "https:") {
  throw new Error(
    "VITE_SUPABASE_URL must be a valid HTTPS URL."
  );
}

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);
