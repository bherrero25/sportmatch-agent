import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { creador_id, creador_nombre, deporte_key, deporte, deporte_emoji, ciudad, fecha, hora } = await req.json();
    const RESEND_KEY = Deno.env.get("RESEND_API_KEY");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Todos los usuarios de ese deporte, menos el creador
    const { data: usuarios } = await supabase
      .from("profiles")
      .select("email, nombre")
      .eq("deporte", deporte_key)
      .neq("id", creador_id)
      .not("email", "is", null);

    if (!usuarios || usuarios.length === 0) {
      return new Response(JSON.stringify({ ok: true, sent: 0 }), { status: 200, headers: corsHeaders });
    }

    let sent = 0;
    for (const u of usuarios) {
      const fname = u.nombre?.split(" ")[0] || "deportista";
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Authorization": `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "SportMatch <noreply@sportmatchapp.es>",
          to: [u.email],
          subject: `${deporte_emoji} Nueva partida de ${deporte} en ${ciudad}`,
          html: `
            <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 16px">
              <h1 style="color:#16a34a;font-size:1.4rem">${deporte_emoji} ¡Partida nueva!</h1>
              <p style="font-size:1rem;color:#111">Hola <b>${fname}</b>,</p>
              <p style="color:#444"><b>${creador_nombre}</b> ha propuesto una partida de <b>${deporte}</b>:</p>
              <div style="background:#f0fdf4;border-radius:8px;padding:16px;margin:24px 0">
                <p style="margin:0;color:#111">📍 ${ciudad}<br>📅 ${fecha} · ⏰ ${hora}</p>
              </div>
              <a href="https://sportmatchapp.es/app.html" style="display:inline-block;background:#16a34a;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold">Apuntarme →</a>
              <p style="margin-top:32px;color:#888;font-size:0.8rem">SportMatch · sportmatchapp.es</p>
            </div>
          `,
        }),
      });
      if (res.ok) sent++;
    }

    return new Response(JSON.stringify({ ok: true, sent }), { status: 200, headers: corsHeaders });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: corsHeaders });
  }
});
