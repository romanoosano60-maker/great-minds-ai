# Great Minds AI Teacher — Cloudflare Worker

This folder contains the server-side source for the Great Minds AI Teacher endpoint. The Worker is not live just because this source is stored in GitHub. It must be installed in the existing Cloudflare Worker and configured there.

## What the endpoint does

- Allows browser requests only from the Great Minds GitHub Pages origin.
- Exposes GET /health and POST /ask.
- Verifies the signed-in account with Supabase Auth.
- Requires the signed-in student to have an active guardian relationship before using live AI.
- Applies a per-user Cloudflare rate limit before calling OpenAI.
- Allows only the nine Great Minds subjects and twelve approved teaching languages, including Hindi, Bengali, Tamil, Telugu and Marathi, and limits each question to 500 characters.
- Calls the OpenAI Responses API from the server. The OpenAI API key is never placed in browser code.
- Uses store=false and does not send the child's email, account ID or profile fields to OpenAI.
- Accepts up to six recent text turns from the browser so a later frontend connection can support conversational context.

## Cloudflare configuration required

In the existing Worker named great-minds-ai-backend, configure:

Secret:
- OPENAI_API_KEY — use the existing OpenAI project key as a Cloudflare Worker secret. Never paste it into GitHub or a chat.

Environment variables:
- SUPABASE_URL = https://ryuchmmnyjyldwouidyy.supabase.co
- SUPABASE_PUBLISHABLE_KEY = the project's public publishable key, not a service-role or secret key.
- OPENAI_MODEL = gpt-5.4-mini (optional; the Worker uses this default if omitted).

Required Rate Limiting binding:
- Binding name: AI_RATE_LIMITER
- Suggested starting limit: 10 requests per 60 seconds per user.
- The Worker keys the limit by the verified Supabase user ID. Cloudflare describes this rate limit as approximate and local to each Cloudflare location, so it is a protective throttle, not a strict global billing cap.

If any required setting is missing, the Worker fails closed and does not call OpenAI.

## Install and test

1. Open Cloudflare Dashboard, then Workers & Pages, then great-minds-ai-backend.
2. Open the Worker editor and replace its code with the contents of cloudflare/worker.js.
3. Add the secret, environment variables and Rate Limiting binding listed above in Worker settings.
4. Deploy the Worker.
5. Test GET https://YOUR-WORKER-DOMAIN/health from the Great Minds site origin. It should return an ok response.
6. The frontend still needs the actual deployed Worker URL configured in ai-teacher-config.js. Do not guess the workers.dev subdomain. The live AI connection is not complete until the frontend is wired and a real, consented test account receives a reply.

## Child-safety limits

This is a controlled starting point, not a complete child-safety programme. Before enabling it for real children, test it with adult-controlled accounts, review the safety responses, add reporting and adult escalation procedures, set cost alerts, and complete the applicable privacy and child-safety review. Do not enable child-to-child messaging through this endpoint.
