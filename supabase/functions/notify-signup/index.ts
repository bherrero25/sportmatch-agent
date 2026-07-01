import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const record = payload.record || payload;
    const nombre = record.nombre || "Sin nombre";
    const email = record.email || "";
    const deporte = record.deporte || "No indicado";

    const RESEND_KEY = Deno.env.get("RESEND_API_KEY");

    // Email de aviso a Betsabé
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "SportMatch <noreply@sportmatchapp.es>",
        to: ["betsabe@cypa.es"],
        subject: `🎾 Nuevo en SportMatch: ${nombre}`,
        html: `
          <h2 style="color:#16a34a">¡Nuevo apuntado en la lista de espera!</h2>
          <p><b>Nombre:</b> ${nombre}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Deporte:</b> ${deporte}</p>
          <hr/>
          <p style="color:#888;font-size:12px">SportMatch · sportmatchapp.es</p>
        `,
      }),
    });

    // Email de bienvenida al apuntado
    if (email) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Authorization": `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "SportMatch <noreply@sportmatchapp.es>",
          to: [email],
          subject: "¡Estás en la lista de SportMatch! 🎾",
          html: `
            <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 16px">
              <h1 style="color:#16a34a;font-size:1.5rem">¡Hola, ${nombre}! 👋</h1>
              <p style="font-size:1rem;color:#111">Ya estás en la lista de espera de <b>SportMatch</b>.</p>
              <p style="color:#444">Estamos reuniendo deportistas en cada ciudad. En cuanto haya gente cerca de ti con quien jugar, serás de los primeros en saberlo.</p>
              <div style="background:#f0fdf4;border-radius:8px;padding:16px;margin:24px 0">
                <p style="margin:0;color:#16a34a;font-weight:bold">Mientras tanto, comparte SportMatch con alguien que viaje y haga deporte.</p>
                <p style="margin:8px 0 0;color:#444;font-size:0.9rem">Cuantos más seamos, antes encontrarás compañero de juego.</p>
              </div>
              <a href="https://sportmatchapp.es" style="display:inline-block;background:#16a34a;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold">Ver SportMatch →</a>
              <p style="margin-top:32px;color:#888;font-size:0.8rem">SportMatch · sportmatchapp.es<br>Si no te apuntaste tú, ignora este email.</p>
            </div>
          `,
        }),
      });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: corsHeaders });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: corsHeaders });
  }
});
