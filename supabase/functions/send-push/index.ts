// Push vía OneSignal. Requiere secrets: ONESIGNAL_APP_ID y ONESIGNAL_API_KEY
// Body: { to_user_ids: string[] (o to_user_id: string), title, body }
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { to_user_id, to_user_ids, title, body } = await req.json();
    const ids: string[] = to_user_ids || (to_user_id ? [to_user_id] : []);
    if (ids.length === 0) {
      return new Response(JSON.stringify({ ok: true, sent: 0 }), { status: 200, headers: corsHeaders });
    }

    const APP_ID = Deno.env.get("ONESIGNAL_APP_ID");
    const API_KEY = Deno.env.get("ONESIGNAL_API_KEY");
    if (!APP_ID || !API_KEY) {
      return new Response(JSON.stringify({ ok: false, reason: "OneSignal no configurado" }), { status: 200, headers: corsHeaders });
    }

    const res = await fetch("https://api.onesignal.com/notifications", {
      method: "POST",
      headers: {
        "Authorization": `Key ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        app_id: APP_ID,
        target_channel: "push",
        include_aliases: { external_id: ids },
        headings: { en: title, es: title },
        contents: { en: body, es: body },
        url: "https://sportmatchapp.es/app.html",
      }),
    });
    const result = await res.json();
    console.log("OneSignal response:", JSON.stringify(result).slice(0, 200));

    return new Response(JSON.stringify({ ok: res.ok, result }), { status: 200, headers: corsHeaders });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: corsHeaders });
  }
});
