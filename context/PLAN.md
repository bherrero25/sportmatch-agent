# SportMatch — Plan por fases (nuestro mapa)

> Documento sencillo para saber siempre **dónde estamos** y **qué toca**.
> Lo vamos marcando juntos. Una fase cada vez, sin agobios.

**Leyenda:** ✅ hecho · 🔜 estamos aquí · ⏳ más adelante

---

## ✅ FASE 0 — La idea y la prueba (HECHO)
- [x] Idea definida (conectar deportistas para jugar, modo viajero)
- [x] Prototipo bonito (web de ejemplo, estilo TikTok, con gancho)
- [x] Primeros interesados reales apuntados

---

## ✅ FASE 1 — Tu nombre propio en internet (HECHO)
- [x] Dominio `sportmatchapp.es` comprado en DonDominio (23 jun 2026) — ~6€/año

---

## ✅ FASE 2 — Web en tu dominio, gratis (HECHO)
- [x] Hosting en Cloudflare Pages — `sportmatchapp.es` online con SSL
- [x] Copia de seguridad en Git (rama main) + auto-deploy desde GitHub
- [x] Prototipo con gancho: TikTok feed, radar, encuesta, chat de ejemplo
- [x] PWA instalable en móvil

---

## ✅ FASE 3 — Captar emails de verdad (HECHO)
- [x] Supabase creado (`jhyykkgastbwrqlaryeu.supabase.co`)
- [x] Tabla `lista_espera` con nombre, email, deporte, nivel
- [x] Formulario de `sportmatchapp.es` conectado — registros guardándose
- [x] Email de aviso a betsabe@cypa.es cuando alguien se apunta
- [x] Email de bienvenida al que se apunta (desde `noreply@sportmatchapp.es`)
- [x] Dominio `sportmatchapp.es` verificado en Resend (DKIM + SPF)

---

## ✅ FASE 4 — El producto real (perfiles + match) (HECHO)
- [x] Registro e inicio de sesión (Supabase Auth)
- [x] Pantalla de perfil: nombre, deporte, nivel, ciudad
- [x] Feed real: los usuarios registrados aparecen en el feed de su deporte
- [x] Buscador de ciudad en el feed
- [x] 12 deportes: golf, pádel, tenis, running, senderismo, esquí, escalada, baloncesto, fútbol, ciclismo, surf, submarinismo
- [x] Encuestas de nivel por deporte

---

## 🔜 FASE 5 — El match y el chat (ESTAMOS AQUÍ)

### ✅ Match mutuo — HECHO
- [x] Botón "Quiero jugar con X" en tarjeta y ficha de usuario real
- [x] Solicitudes guardadas en tabla `solicitudes_match`
- [x] Campana 🔔 con número de solicitudes pendientes
- [x] Panel de solicitudes: aceptar / rechazar
- [x] Email de aviso al recibir una solicitud
- [x] Notificación en app cuando tu solicitud es aceptada
- [x] Texto personalizado por deporte ("escalar", "surfear", "jugar al golf"…)

### 🔜 Chat real — SIGUIENTE
- [ ] Cuando dos usuarios hacen match mutuo, se abre un chat entre ellos
- [ ] Mensajes guardados en Supabase en tiempo real
- [ ] Notificación de nuevo mensaje en la campana

### ⏳ Notificaciones push
- [ ] Integrar OneSignal (iOS + Android) para notificaciones push reales
- [ ] Avisar al momento cuando llega una solicitud o un mensaje

---

## ⏳ FASE 6 — Beta abierta
- [ ] Lanzamiento a la red de Nicolás + lista de espera actual
- [ ] Recoger feedback, ajustar
- [ ] Cerrar sesión / cambiar perfil

---

## ⏳ FASE 7 — Apps en las tiendas
- [ ] App Store (99€/año) + Google Play (25€ único)
- *(Solo cuando enganche y merezca la pena)*

---

## ⏳ FASE 8 — Ganar dinero
- Suscripción premium, eventos, clubes…
- *(Cuando haya masa crítica)*

---

## 🔁 EN PARALELO — Legal (empieza en Fase 6)
- [ ] Política de privacidad + RGPD
- [ ] Términos de uso
- [ ] Gestión de menores

---

## 📍 Dónde estamos ahora (3 julio 2026)

**Fases 0–4 y match mutuo (Fase 5) COMPLETADOS.**

- Web + app: `https://sportmatchapp.es/app.html`
- 3 usuarios reales (Betsabé, Isabel, Nicolás)
- Match funcionando: solicitud → email de aviso → aceptar/rechazar → notificación en app
- **Siguiente:** chat real entre usuarios que han hecho match
