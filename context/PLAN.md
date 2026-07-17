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

### ✅ Chat real — HECHO
- [x] Apartado 💬 de chats separado de la campana 🔔, estilo red social
- [x] Mensajes en Supabase, marcados como leídos, contador de no leídos
- [x] Popup dentro de la app cuando te escriben + borrar chats
- [x] Valoraciones post-partido (⭐ 1-5) visibles en el feed

### ✅ Notificaciones push — HECHO (14 jul 2026)
- [x] OneSignal integrado (web push, funciona en iPhone con la app instalada)
- [x] Push al recibir: solicitud de match, mensaje de chat, apuntado a tu partida, partida nueva de tu deporte
- [x] Emails de respaldo con Resend para todo lo anterior

### ✅ Extras hechos sobre la marcha
- [x] Foto de perfil (Supabase Storage) en feed, chats y perfil
- [x] Partidas abiertas: proponer, apuntarse, límites por deporte, "partida cerrada"
- [x] Multi-deporte por usuario (chips de selección múltiple)
- [x] Multi-idioma ES/EN con banderita 🇪🇸/🇬🇧
- [x] Buscar amigos por nombre + invitar a jugar + compartir por WhatsApp
- [x] Guía de instalación automática al abrir el enlace en el móvil
- [x] Pilota Valenciana como deporte 13
- [x] Cerrar sesión / editar perfil / versión visible en el pie

---

## 🔜 FASE 6 — Beta abierta (ESTAMOS AQUÍ)
- [ ] Lanzamiento a la red de Nicolás + lista de espera actual
- [ ] Cuenta de Instagram/TikTok con vídeos orgánicos (guiones en GUIONES-VIDEOS.md)
- [ ] Recoger feedback, ajustar

---

## ⏳ FASE IA — Automatizar con inteligencia artificial
*(empezar cuando la beta ruede; coste estimado: céntimos/mes con la API de Claude)*

### Prioridad 1 — Matching real
- [ ] **% de compatibilidad de verdad** (hoy es decorativo): nivel + ciudad + horarios + valoraciones cruzadas
- [ ] **Sugerencias proactivas**: "Te recomendamos a Marta: tu nivel, juega los sábados como tú"

### Prioridad 2 — Menos fricción para el usuario
- [ ] **Perfil asistido**: el usuario escribe 2 líneas libres y la IA rellena nivel, deportes, disponibilidad y bio
- [ ] **Mensajes rompehielos**: sugerir el primer mensaje al hacer match (donde más matches mueren)
- [ ] **Organizador de partidas automático**: la IA detecta 4 compatibles con misma ciudad/horario y propone la partida sola

### Prioridad 3 — Operación automática (sin que Betsabé haga nada)
- [ ] **Moderación automática** de mensajes y fotos (imprescindible antes de abrir a desconocidos)
- [ ] **Resumen semanal personalizado** por email/push: jugadores nuevos de tus deportes, partidas abiertas cerca
- [ ] **Reenganche de inactivos**: detectar quién lleva 2+ semanas sin entrar y escribirle con la propuesta adecuada
- [ ] **Chatbot de soporte** dentro de la app (preguntas frecuentes, cómo funciona)
- [ ] **Informe mensual automático** para Betsabé: usuarios nuevos, matches, partidas, deportes que más crecen

---

## ⏳ FASE 7 — Apps en las tiendas
- [ ] App Store (99€/año) + Google Play (25€ único)
- [ ] Da acceso a contactos del teléfono y push nativo
- *(Solo cuando 30-50 personas la usen y repitan)*

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

## 📍 Dónde estamos ahora (14 julio 2026)

**Fases 0–5 COMPLETADAS: producto completo con match, chat, partidas, push y multi-idioma.**

- Web + app: `https://sportmatchapp.es/app.html` (versión visible en el pie)
- 7 usuarios reales (Betsabé, Isabel, Nicolás, Daniela, Alejandra, Ibrahim, Vanessa)
- Push funcionando en iPhone vía OneSignal (probado 14/7)
- **Siguiente:** beta abierta — invitar a la red de Nicolás y lista de espera, y grabar los primeros vídeos
