import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { to_user_id, from_nombre, deporte, deporte_emoji, ciudad, fecha, hora } = await req.json();
    const RESEND_KEY = Deno.env.get("RESEND_API_KEY");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: profile } = await supabase
      .from("profiles")
      .select("email, nombre")
      .eq("id", to_user_id)
      .single();

    if (!profile?.email) {
      return new Response(JSON.stringify({ ok: true, reason: "no email" }), { status: 200, headers: corsHeaders });
    }

    const fname = profile.nombre?.split(" ")[0] || "deportista";

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "SportMatch <noreply@sportmatchapp.es>",
        to: [profile.email],
        subject: `${deporte_emoji} ${from_nombre} se ha apuntado a tu partida`,
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 16px">
            <h1 style="color:#16a34a;font-size:1.4rem">${deporte_emoji} ¡Se apuntaron a tu partida!</h1>
            <p style="font-size:1rem;color:#111">Hola <b>${fname}</b>,</p>
            <p style="color:#444"><b>${from_nombre}</b> se ha apuntado a tu partida de <b>${deporte}</b>:</p>
            <div style="background:#f0fdf4;border-radius:8px;padding:16px;margin:24px 0">
              <p style="margin:0;color:#111">📍 ${ciudad}<br>📅 ${fecha} · ⏰ ${hora}</p>
            </div>
            <a href="https://sportmatchapp.es/app.html" style="display:inline-block;background:#16a34a;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold">Ver mi partida →</a>
            <p style="margin-top:32px;color:#888;font-size:0.8rem">SportMatch · sportmatchapp.es</p>
          </div>
        `,
      }),
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: corsHeaders });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: corsHeaders });
  }
});
