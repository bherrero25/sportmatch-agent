import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { to_email, to_nombre, from_nombre, from_email, deporte, deporte_emoji } = await req.json();
    const RESEND_KEY = Deno.env.get("RESEND_API_KEY");

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "SportMatch <noreply@sportmatchapp.es>",
        to: [to_email],
        subject: `${deporte_emoji} ${from_nombre} quiere jugar ${deporte} contigo`,
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 16px">
            <h1 style="color:#16a34a;font-size:1.5rem">¡Alguien quiere jugar contigo! ${deporte_emoji}</h1>
            <p style="font-size:1rem;color:#111"><b>${from_nombre}</b> ha visto tu perfil en <b>SportMatch</b> y quiere jugar <b>${deporte}</b> contigo.</p>
            <div style="background:#f0fdf4;border-radius:8px;padding:16px;margin:24px 0">
              <p style="margin:0;color:#16a34a;font-weight:bold">Respóndele directamente:</p>
              <p style="margin:8px 0 0;color:#444;font-size:0.9rem">${from_email}</p>
            </div>
            <a href="https://sportmatchapp.es/app.html" style="display:inline-block;background:#16a34a;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold">Abrir SportMatch →</a>
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
