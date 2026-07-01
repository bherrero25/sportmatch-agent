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
- [x] Copia de seguridad en Git (rama main)
- [x] Prototipo con gancho: TikTok feed, radar, encuesta, chat de ejemplo

---

## 🔜 FASE 3 — Captar emails de verdad (ESTAMOS AQUÍ)

**Objetivo:** que cada persona que se apunte quede guardada y tú recibas un email avisándote.

### Paso 3.1 — Base de datos ✅ HECHO
- [x] Supabase creado (`jhyykkgastbwrqlaryeu.supabase.co`)
- [x] Tabla `lista_espera` creada con campos: nombre, email, deporte, nivel, origen
- [x] Formulario de `sportmatchapp.es` conectado a Supabase — **registros guardándose**

### Paso 3.2 — Email de aviso ✅ HECHO
- [x] Edge Function `notify-signup` desplegada en Supabase
- [x] Dominio `sportmatchapp.es` verificado en Resend (cuenta `betsabe@cypa.es`)
- [x] Emails salen desde `noreply@sportmatchapp.es` y llegan a `betsabe@cypa.es`
- [x] CORS arreglado para que funcione desde el navegador

### Paso 3.3 — Email de bienvenida al que se apunta ⏳
- [ ] Cuando alguien se apunte, recibe un email: "¡Estás en la lista! Te avisamos cuando haya gente cerca."
- **Coste:** 0€ (incluido en Resend)

---

## ⏳ FASE 4 — El producto real (perfiles + match)

**Objetivo:** que la gente cree su cuenta, ponga su perfil deportivo y vea jugadores compatibles cerca.

- [ ] Registro e inicio de sesión (Supabase Auth)
- [ ] Perfil por deporte: nivel, ritmo, actitud, idioma
- [ ] "Estoy en [ciudad] del [fecha] al [fecha]"
- [ ] Feed de jugadores compatibles en esa ciudad esas fechas
- **Coste:** 0€ en Supabase plan gratuito para empezar

---

## ⏳ FASE 5 — El match y el chat

- [ ] Match mutuo: cuando dos jugadores se marcan como "jugar", se crea un chat
- [ ] Chat dentro de la app
- [ ] Notificación push: "¡Nuevo jugador compatible en tu ciudad!"

---

## ⏳ FASE 6 — Beta abierta

- [ ] Lanzamiento a la red del hijo de Betsabé + lista de espera
- [ ] Recoger feedback, ajustar
- [ ] App web instalable (PWA) — ya está lista

---

## ⏳ FASE 7 — Apps en las tiendas

- [ ] App Store (99€/año) + Google Play (25€ único)
- *(Solo cuando enganche y merezca la pena)*

---

## ⏳ FASE 8 — Ganar dinero

- Suscripción premium, eventos, clubes…
- *(Cuando haya masa crítica)*

---

## 🔁 EN PARALELO — Legal (empieza en Fase 4)

- [ ] Política de privacidad + RGPD
- [ ] Términos de uso
- [ ] Gestión de menores

---

## 📍 Dónde estamos ahora

**Fases 0, 1, 2 y Paso 3.1 COMPLETADOS.**

- Web online: `https://sportmatchapp.es`
- Registros guardándose en Supabase
- **Siguiente:** Paso 3.2 — notificación por email cuando alguien se apunte
