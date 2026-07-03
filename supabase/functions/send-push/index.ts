import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Minimal web-push implementation using VAPID
async function sendPushNotification(subscription: any, payload: string, vapidPrivate: string, vapidPublic: string) {
  const webpush = await import("https://esm.sh/web-push@3.6.7");
  webpush.setVapidDetails(
    "mailto:noreply@sportmatchapp.es",
    vapidPublic,
    vapidPrivate
  );
  await webpush.sendNotification(subscription, payload);
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { to_user_id, title, body } = await req.json();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: subs } = await supabase
      .from("push_subscriptions")
      .select("subscription")
      .eq("user_id", to_user_id);

    if (!subs || subs.length === 0) {
      return new Response(JSON.stringify({ ok: true, sent: 0 }), { status: 200, headers: corsHeaders });
    }

    const VAPID_PRIVATE = Deno.env.get("VAPID_PRIVATE_KEY")!;
    const VAPID_PUBLIC = Deno.env.get("VAPID_PUBLIC_KEY")!;
    const payload = JSON.stringify({ title, body });

    await Promise.all(subs.map(s => sendPushNotification(s.subscription, payload, VAPID_PRIVATE, VAPID_PUBLIC)));

    return new Response(JSON.stringify({ ok: true, sent: subs.length }), { status: 200, headers: corsHeaders });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: corsHeaders });
  }
});
