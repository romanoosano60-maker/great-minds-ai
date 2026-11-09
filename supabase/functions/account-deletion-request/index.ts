// Great Minds AI — request-only endpoint. It NEVER deletes an Auth user or app data.
import { createClient } from "npm:@supabase/supabase-js@2.57.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://romanoosano60-maker.github.io",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: corsHeaders });

  const url = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !anonKey || !serviceKey) {
    return new Response(JSON.stringify({ error: "Server configuration incomplete" }), { status: 503, headers: corsHeaders });
  }

  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return new Response(JSON.stringify({ error: "Sign in is required" }), { status: 401, headers: corsHeaders });

  let body: { confirm?: boolean };
  try { body = await req.json(); } catch {
    return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400, headers: corsHeaders });
  }
  if (body.confirm !== true) {
    return new Response(JSON.stringify({ error: "Explicit confirmation is required" }), { status: 400, headers: corsHeaders });
  }

  const authClient = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: { user }, error: authError } = await authClient.auth.getUser(token);
  if (authError || !user) return new Response(JSON.stringify({ error: "Your session could not be verified. Please sign in again." }), { status: 401, headers: corsHeaders });

  const adminClient = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: existing, error: lookupError } = await adminClient
    .from("account_deletion_requests")
    .select("id,status")
    .eq("requester_id", user.id)
    .in("status", ["requested","under_review","needs_classroom_transfer","approved"])
    .limit(1);
  if (lookupError) return new Response(JSON.stringify({ error: "Could not check existing requests" }), { status: 500, headers: corsHeaders });
  if (existing?.length) return new Response(JSON.stringify({ request_id: existing[0].id, status: existing[0].status, message: "An open request already exists. No account data was deleted." }), { status: 200, headers: corsHeaders });

  const { data, error } = await adminClient.from("account_deletion_requests")
    .insert({ requester_id: user.id, status: "requested" })
    .select("id,status,requested_at")
    .single();
  if (error) return new Response(JSON.stringify({ error: "Request could not be recorded" }), { status: 500, headers: corsHeaders });
  return new Response(JSON.stringify({ ...data, message: "Request recorded for review. No account or learning data was deleted." }), { status: 201, headers: corsHeaders });
});
