import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.0";
import { AccessToken, RoomServiceClient } from "npm:livekit-server-sdk@2.19.2";

const allowedOrigin = "https://romanoosano60-maker.github.io";
const cors = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
  "Content-Type": "application/json",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: cors });

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  if (origin && origin !== allowedOrigin) return json({ error: "Origin not allowed." }, 403);
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);

  const authorization = req.headers.get("authorization") || "";
  if (!authorization.startsWith("Bearer ")) return json({ error: "Please sign in first." }, 401);
  const accessToken = authorization.slice(7);
  if (accessToken.length < 40 || accessToken.length > 5000) return json({ error: "Invalid sign-in session." }, 401);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const publishableKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY");
  const livekitUrl = Deno.env.get("LIVEKIT_URL");
  const livekitKey = Deno.env.get("LIVEKIT_API_KEY");
  const livekitSecret = Deno.env.get("LIVEKIT_API_SECRET");
  if (!supabaseUrl || !publishableKey) return json({ error: "Classroom authentication is not configured." }, 503);
  if (!livekitUrl || !livekitKey || !livekitSecret) {
    return json({ error: "The secure classroom calling service is awaiting administrator setup. No call token was issued." }, 503);
  }

  try {
    const supabase = createClient(supabaseUrl, publishableKey, {
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: userData, error: userError } = await supabase.auth.getUser(accessToken);
    if (userError || !userData.user?.id) return json({ error: "Your session is invalid or expired. Please sign in again." }, 401);
    const userId = userData.user.id;

    const declaredLength = Number(req.headers.get("content-length") || "0");
    if (declaredLength > 3000) return json({ error: "Request is too large." }, 413);
    const body = await req.json();
    const classroomId = Number(body.classroom_id);
    const mode = body.mode === "video" ? "video" : body.mode === "audio" ? "audio" : "";
    const action = body.action === "start" ? "start" : body.action === "join" ? "join" : body.action === "end" ? "end" : "";
    if (!Number.isSafeInteger(classroomId) || classroomId < 1 || !mode || !action) {
      return json({ error: "Choose a valid classroom, call type and action." }, 400);
    }

    const { data: classroom, error: classroomError } = await supabase
      .from("classrooms").select("id,teacher_id").eq("id", classroomId).maybeSingle();
    if (classroomError) return json({ error: "Classroom access could not be checked." }, 503);
    if (!classroom) return json({ error: "Classroom not found or not accessible." }, 404);

    const { data: teacherProfile, error: teacherError } = await supabase
      .from("teacher_profiles").select("user_id").eq("user_id", userId).eq("approved", true).maybeSingle();
    if (teacherError) return json({ error: "Teacher permission could not be checked." }, 503);
    const isClassTeacher = !!teacherProfile && classroom.teacher_id === userId;

    let isApprovedStudent = false;
    let isLinkedGuardian = false;
    if (!isClassTeacher) {
      const { data: membership, error: memberError } = await supabase
        .from("classroom_members").select("user_id")
        .eq("classroom_id", classroomId).eq("user_id", userId)
        .eq("membership_status", "approved").eq("parent_consent_status", "approved").maybeSingle();
      if (memberError) return json({ error: "Classroom membership could not be checked." }, 503);
      const { data: studentGuardianLinks, error: studentGuardianError } = await supabase
        .from("guardian_relationships").select("student_id")
        .eq("student_id", userId).eq("relationship_status", "active").limit(1);
      if (studentGuardianError) return json({ error: "Student guardian consent could not be checked." }, 503);
      // A classroom_members status alone is not proof of guardian consent.
      // Require a live guardian relationship independently at call-token time.
      isApprovedStudent = !!membership && !!studentGuardianLinks?.length;

      const { data: relationships, error: guardianError } = await supabase
        .from("guardian_relationships").select("student_id")
        .eq("guardian_id", userId).eq("relationship_status", "active");
      if (guardianError) return json({ error: "Guardian permission could not be checked." }, 503);
      const linkedStudentIds = (relationships || []).map((r: { student_id: string }) => r.student_id);
      if (linkedStudentIds.length) {
        const { data: linkedMembership, error: linkedError } = await supabase
          .from("classroom_members").select("user_id")
          .eq("classroom_id", classroomId).in("user_id", linkedStudentIds)
          .eq("membership_status", "approved").eq("parent_consent_status", "approved").limit(1);
        if (linkedError) return json({ error: "Guardian classroom access could not be checked." }, 503);
        isLinkedGuardian = !!linkedMembership?.length;
      }
    }

    if (!isClassTeacher && !isApprovedStudent && !isLinkedGuardian) {
      return json({ error: "Only the approved classroom teacher, consented students and their linked guardians may enter this call." }, 403);
    }
    if (action === "start" && !isClassTeacher) {
      return json({ error: "Only the approved teacher who owns this classroom can start a call." }, 403);
    }

    const isObserver = isLinkedGuardian && !isClassTeacher && !isApprovedStudent;
    const roomName = `gm-classroom-${classroomId}`;
    // Browser clients connect over WSS; the server RoomService API requires HTTPS.
    // Accept the normal LiveKit project URL and derive the HTTPS host for server-side room control.
    if (!livekitUrl.startsWith("wss://")) {
      return json({ error: "The classroom calling service URL must begin with wss:// for encrypted calls." }, 503);
    }
    const livekitHttpUrl = "https://" + livekitUrl.slice(6);
    const roomService = new RoomServiceClient(livekitHttpUrl, livekitKey, livekitSecret);
    if (action === "end") {
      if (!isClassTeacher) return json({ error: "Only the approved classroom teacher can end this call." }, 403);
      const activeRooms = await roomService.listRooms([roomName]);
      if (!activeRooms.length) return json({ message: "There is no active call to end." });
      await roomService.deleteRoom(roomName);
      return json({ ended: true, room: roomName });
    }
    if (action === "start") {
      const activeRooms = await roomService.listRooms([roomName]);
      if (!activeRooms.length) {
        await roomService.createRoom({ name: roomName, emptyTimeout: 300, departureTimeout: 30, maxParticipants: 30 });
      }
    } else {
      const activeRooms = await roomService.listRooms([roomName]);
      if (!activeRooms.length) return json({ error: "The teacher has not started this classroom call yet." }, 409);
      // Fail closed: students and guardians may join only while the teacher is actually connected.
      const participants = await roomService.listParticipants(roomName);
      const teacherPresent = participants.some((participant) => participant.identity === classroom.teacher_id);
      if (!teacherPresent) {
        return json({ error: "The teacher is not currently connected. Wait for the teacher to join before entering." }, 409);
      }
    }
    const token = new AccessToken(livekitKey, livekitSecret, {
      identity: userId,
      ttl: "10m",
      name: isClassTeacher ? "Teacher" : isObserver ? "Guardian" : "Student",
    });
    token.addGrant({
      roomJoin: true,
      room: roomName,
      roomAdmin: isClassTeacher,
      canSubscribe: true,
      canPublish: !isObserver,
      ...(isObserver ? {} : { canPublishSources: mode === "video" ? ["microphone", "camera"] : ["microphone"] }),
    });
    const jwt = await token.toJwt();
    return json({
      server_url: livekitUrl,
      token: jwt,
      room: roomName,
      mode,
      participant_role: isClassTeacher ? "teacher" : isObserver ? "guardian_observer" : "student",
      teacher_identity: classroom.teacher_id,
      token_expires_in_seconds: 600,
      recording: false,
    });
  } catch (_error) {
    return json({ error: "The classroom call could not be prepared. Please try again." }, 400);
  }
});