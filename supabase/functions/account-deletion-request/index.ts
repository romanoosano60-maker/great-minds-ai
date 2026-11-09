// Great Minds AI — request-only endpoint. Never deletes an Auth user or app data.
import { createClient } from "npm:@supabase/supabase-js@2.57.0";
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://romanoosano60-maker.github.io",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};
const reply = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: corsHeaders });

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return reply({ error: "Method not allowed" }, 405);
  const url = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !anonKey || !serviceKey) return reply({ error: "Server configuration incomplete" }, 503);
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return reply({ error: "Sign in is required" }, 401);
  let body: { confirm?: boolean };
  try { body = await req.json(); } catch { return reply({ error: "Invalid request" }, 400); }
  if (body.confirm !== true) return reply({ error: "Explicit confirmation is required" }, 400);

  const authClient = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: { user }, error: authError } = await authClient.auth.getUser(token);
  if (authError || !user) return reply({ error: "Session could not be verified. Sign in again." }, 401);
  if (!user.email_confirmed_at) return reply({ error: "Verify your email before submitting an account request." }, 403);
  if (user.user_metadata?.account_purpose === "student") {
    return reply({ error: "A student account cannot submit an adult account-deletion request. A parent or legal guardian must contact support for a supervised review." }, 403);
  }

  const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const [teacher, guardian] = await Promise.all([
    admin.from("teacher_profiles").select("approved").eq("user_id", user.id).eq("approved", true).maybeSingle(),
    admin.from("guardian_relationships").select("student_id").eq("guardian_id", user.id).eq("relationship_status", "active").limit(1)
  ]);
  if (teacher.error || guardian.error) return reply({ error: "Could not verify adult account permissions. Contact support." }, 500);
  const isApprovedTeacher = !!teacher.data;
  const hasActiveGuardianLink = !!guardian.data?.length;
  if (!isApprovedTeacher && !hasActiveGuardianLink) {
    return reply({ error: "This account has no active guardian relationship or approved teacher profile. Please contact support for a manual review." }, 403);
  }

  const { data: classrooms, error: classroomError } = await admin.from("classrooms").select("id").eq("teacher_id", user.id).limit(1);
  if (classroomError) return reply({ error: "Could not check classroom ownership." }, 500);
  const initialStatus = classrooms?.length ? "needs_classroom_transfer" : "requested";

  const { data: existing, error: lookupError } = await admin.from("account_deletion_requests")
    .select("id,status").eq("requester_id", user.id)
    .in("status", ["requested","under_review","needs_classroom_transfer","approved"]).limit(1);
  if (lookupError) return reply({ error: "Could not check existing requests." }, 500);
  if (existing?.length) return reply({ request_id: existing[0].id, status: existing[0].status, message: "An open request already exists. No account data was deleted." });

  const { data, error } = await admin.from("account_deletion_requests")
    .insert({ requester_id: user.id, status: initialStatus })
    .select("id,status,requested_at").single();
  if (error) return reply({ error: "Request could not be recorded." }, 500);
  return reply({
    ...data,
    message: initialStatus === "needs_classroom_transfer"
      ? "Request received. Your classrooms must be transferred or formally closed before account deletion can be considered. No data was deleted."
      : "Request received for manual review. No account or learning data was deleted."
  }, 201);
});