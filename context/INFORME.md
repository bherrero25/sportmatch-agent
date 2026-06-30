# SportMatch — Informe de estado (30 junio 2026)

## Resumen en una línea
App para conectar deportistas y jugar juntos (con modo viajero). Prototipo listo y online; montando la base definitiva (dominio propio + hosting) antes de construir el producto real.

---

## ✅ LO QUE SE HA HECHO

### Producto (prototipo, validado en diseño/UX)
- **App `app.html`** completa: pantalla de bienvenida, 8 deportes con **diseño propio por deporte**, **feed estilo TikTok** (scroll vertical), **ficha con radar de compatibilidad** por jugador, **encuesta de nivel específica por deporte** (hándicap, grado, ritmo…), **tarjeta "comparte tu nivel"** para stories, **chat de ejemplo**, instalable como app (PWA) y vista previa al compartir (Open Graph).
- **Landing `index.html`**: titular gancho, "Probar la app", **FAQ**, **radar de compatibilidad**, captación de email.

### Captación real
- **6+ personas reales apuntadas** (Daniela, Diego…) vía la red del hijo de Betsabé.

### Infraestructura (la base definitiva)
- **Hosting:** Cloudflare Pages → **funcionando en `sportmatch.pages.dev`** (gratis, sin límites de créditos).
- **Dominio propio:** `sportmatchapp.es` **comprado** en DonDominio (~5€/año, renovación ~8€).
- **Nameservers** del dominio cambiados a Cloudflare (aiden + melody) ✅.
- **Copia de seguridad en Git** (rama main) → nada se puede perder ya.

### Estrategia y documentación
- Decisión: **sacar un producto serio y vendible** (España + fuera), invertir con riesgo controlado.
- Documentos creados: `estrategia-producto.md`, `PLAN.md` (fases), `ideas-producto.md`, `db-schema.md`, `app-spec.md`, `INFORME.md`.
- Arquitectura definitiva elegida: **React Native + Expo** (app) · **Supabase** (backend) · **Cloudflare Pages** (web) · **Stripe** (pagos futuros) · **ES+EN**.

---

## ⏳ LO QUE FALTA

### Inmediato (esta semana)
- [ ] **Esperar propagación del `.es`** (horas, hasta 24-48h) → Cloudflare activará el dominio.
- [ ] **Conectar el dominio**: al activarse, añadir `sportmatchapp.es` en Cloudflare Pages → Custom domains (1 clic). Tras esto, la web se verá en **sportmatchapp.es**.
- [ ] **Reconectar el formulario de emails** en la versión de Cloudflare: el formulario actual usaba "Netlify Forms" y **fuera de Netlify no captura**. Hay que sustituirlo (opción gratis: Web3Forms; o ya directamente a Supabase en la Fase 3).
- [ ] (Opcional) Subir el backup también a **GitHub** (copia en la nube, fuera del ordenador).

### Fase 3 — Producto real (cuando arranquemos a construir)
- [ ] Backend: **Supabase Pro (~23€/mes)** o **Firebase (gratis)** — decisión al llegar.
- [ ] Cuentas reales (registro/login), perfiles por deporte, guardar nivel y ubicación.
- [ ] **Match por km de verdad** (PostGIS), chat real, notificaciones push.

### En paralelo
- [ ] **Agente legal**: RGPD, términos, política de menores, seguridad. (Vendibilidad.)

### Más adelante
- [ ] Gancho avanzado sobre el producto real ("¡Match!" + push, avisos de viajeros cerca, rachas/logros).
- [ ] Lanzamiento a la red del hijo (beta).
- [ ] **Apps nativas** en App Store / Google Play (cuando enganche).
- [ ] **Monetización** (premium, eventos, clubes) con masa crítica.

---

## 💰 Costes
- Pagado: dominio `.es` (~5€).
- Recurrente actual: **0€** (hosting gratis).
- Próximo coste (Fase 3, opcional): Supabase Pro ~23€/mes — o seguir gratis con Firebase.
- Futuro (al publicar apps): Apple 99€/año + Google 25€ único.

## 📍 Próximo paso inmediato
Esperar el email de Cloudflare **"sportmatchapp.es is now active"** → añadir el dominio en Pages → Custom domains. Con eso, **la web vivirá en `sportmatchapp.es`**, tu dirección definitiva.
