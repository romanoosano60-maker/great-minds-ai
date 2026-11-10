# Great Minds AI — LiveKit classroom calling setup

This file contains the final administrator setup steps. The API secret must remain private.

## Add the provider credentials

1. Create or open the Great Minds project in LiveKit Cloud: https://cloud.livekit.io/.
2. Open the project's API keys/settings and copy its Project URL, API key and API secret.
3. In Supabase Dashboard, open project `ryuchmmnyjyldwouidyy` → Edge Functions → Secrets.
4. Add these three secrets using the exact names below:
   - `LIVEKIT_URL` — use the project URL beginning with `wss://`.
   - `LIVEKIT_API_KEY` — the LiveKit API key.
   - `LIVEKIT_API_SECRET` — the LiveKit API secret.
5. Save the secrets. Never put the API secret in a browser file, GitHub, a screenshot, or a chat message.

The backend converts the `wss://` project URL to `https://` only for its server-side RoomServiceClient. The browser keeps using the original `wss://` URL.

## Test after setup

1. Sign in as the approved teacher and open International Classrooms.
2. Start an audio class, then separately test a video class.
3. Sign in as an approved student with guardian consent on another device and join.
4. Sign in as the linked guardian on a third device and use Observe. The guardian should not be able to publish a microphone or camera track.
5. End the call from the teacher account and confirm the other participants disconnect.

Do not use real children's names or personal information during initial testing. The call integration is not complete until these tests pass.
