import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const cors = {
  "Access-Control-Allow-Origin": "https://romanoosano60-maker.github.io",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
  "Content-Type": "application/json",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: cors });

Deno.serve(async (req: Request) => {
  if (req.headers.get("origin") && req.headers.get("origin") !== "https://romanoosano60-maker.github.io") {
    return json({ error: "Origin not allowed." }, 403);
  }
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);

  const apiKey = Deno.env.get("OPENAI_API_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://ryuchmmnyjyldwouidyy.supabase.co";
  const publishableKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY");
  if (!apiKey || !publishableKey) {
    return json({ error: "The AI service is not fully configured. Please ask an administrator." }, 503);
  }

  const authorization = req.headers.get("authorization") || "";
  if (!authorization.startsWith("Bearer ")) return json({ error: "Please sign in before using AI Teacher." }, 401);
  const accessToken = authorization.slice(7);
  if (accessToken.length < 40 || accessToken.length > 5000) return json({ error: "Invalid sign-in session." }, 401);

  try {
    const authResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { apikey: publishableKey, Authorization: `Bearer ${accessToken}` }
    });
    if (!authResponse.ok) return json({ error: "Your sign-in session has expired. Please sign in again." }, 401);
    const user = await authResponse.json();
    const userId = String(user.id || "");
    if (!/^[0-9a-f-]{36}$/i.test(userId)) return json({ error: "Could not verify your account." }, 401);

    const restHeaders = { apikey: publishableKey, Authorization: `Bearer ${accessToken}` };
    const [teacherResponse, studentLinkResponse, guardianLinkResponse] = await Promise.all([
      fetch(`${supabaseUrl}/rest/v1/teacher_profiles?select=user_id&user_id=eq.${userId}&approved=eq.true&limit=1`, { headers: restHeaders }),
      fetch(`${supabaseUrl}/rest/v1/guardian_relationships?select=student_id&student_id=eq.${userId}&relationship_status=eq.active&limit=1`, { headers: restHeaders }),
      fetch(`${supabaseUrl}/rest/v1/guardian_relationships?select=student_id&guardian_id=eq.${userId}&relationship_status=eq.active&limit=1`, { headers: restHeaders })
    ]);
    if (![teacherResponse, studentLinkResponse, guardianLinkResponse].every(r => r.ok)) {
      return json({ error: "Account permission could not be checked. Please try again later." }, 503);
    }
    const [teachers, studentLinks, guardianLinks] = await Promise.all([
      teacherResponse.json(), studentLinkResponse.json(), guardianLinkResponse.json()
    ]);
    if (!(teachers.length || studentLinks.length || guardianLinks.length)) {
      return json({ error: "AI Teacher is available only to approved teachers and accounts with an active guardian link. Please ask a parent or administrator for help." }, 403);
    }

    // Enforce the limit on the actual body bytes, not only the optional Content-Length header.
    const rawBody = await req.text();
    if (new TextEncoder().encode(rawBody).byteLength > 12000) {
      return json({ error: "Your message is too long. Please shorten it." }, 413);
    }
    let body: any;
    try { body = JSON.parse(rawBody); } catch {
      return json({ error: "Invalid request format." }, 400);
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return json({ error: "Invalid request format." }, 400);
    }
    const question = String(body.question || "").trim().slice(0, 1000);
    const subject = String(body.subject || "Ask Anything").trim().slice(0, 80);
    const allowedSubjects = new Set(["English","Mathematics","Science","Social Studies","History","Geography","Computer Studies","General Knowledge","Home Science","IQ & Logical Reasoning","Ask Anything"]);
    const safeSubject = allowedSubjects.has(subject) ? subject : "Ask Anything";
    const allowedLanguages = new Set(["English","Hindi","Bengali","Tamil","Telugu","Marathi","Arabic","Urdu","Swahili","French","German","Chinese (Mandarin)"]);
    const requestedLanguage = String(body.language || "English").slice(0, 40);
    const language = allowedLanguages.has(requestedLanguage) ? requestedLanguage : "English";
    if (!question) return json({ error: "Please enter a question." }, 400);

    const history = Array.isArray(body.history) ? body.history.slice(-6).map((m: any) => ({
      role: m?.role === "assistant" ? "assistant" : "user",
      content: String(m?.content || "").slice(0, 800)
    })) : [];

    // Consume a free database-enforced daily quota before any paid AI request.
    const quotaResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/consume_ai_teacher_quota`, {
      method: "POST",
      headers: { ...restHeaders, "Content-Type": "application/json" },
      body: "{}"
    });
    if (!quotaResponse.ok) {
      return json({ error: "AI Teacher usage protection is temporarily unavailable. No AI request was sent; please try again later." }, 503);
    }
    const quota = await quotaResponse.json();
    if (quota?.allowed !== true) {
      if (quota?.reason === "daily_service_limit") {
        return json({ error: "AI Teacher has reached its daily shared limit. Please try again tomorrow." }, 429);
      }
      return json({ error: "This account has reached its daily AI Teacher limit. Please try again tomorrow." }, 429);
    }

    const instructions = `You are Great Minds AI, a safe and supportive learning tutor for children. Reply in ${language}. Learning area: ${safeSubject}. Explain in clear, age-appropriate language with examples; show maths steps. Ask no personal identifying details. Do not request names, addresses, school names, passwords, photos, contact details or exact locations. Never reveal private data or claim access to it. Do not provide sexual content, self-harm instructions, dangerous activity instructions, weapon guidance, or ways to evade adult supervision. For health, emergencies, abuse, bullying or immediate danger, tell the child to speak to a trusted adult and contact local emergency help if urgent. If uncertain, say so; do not invent facts. If a request is unsafe, briefly refuse and redirect to safe learning. Keep the answer focused and concise.`;
    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: Deno.env.get("OPENAI_MODEL") || "gpt-4.1-mini",
        instructions,
        input: [...history, { role: "user", content: question }],
        max_output_tokens: 650,
        store: false
      })
    });
    const result = await upstream.json();
    if (!upstream.ok) return json({ error: "The AI Teacher cannot answer right now. Please try again later." }, 502);
    const answer = String(result.output_text || "").trim();
    if (!answer) return json({ error: "The AI Teacher returned no answer. Please try again." }, 502);
    return json({ answer });
  } catch (_error) {
    // Unexpected upstream/network/runtime failures are server errors, not bad input.
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
});