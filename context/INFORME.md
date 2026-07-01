# SportMatch — Informe de estado (30 junio 2026)

## Resumen en una línea
App para conectar deportistas y jugar juntos (con modo viajero). Prototipo online en dominio propio, base de datos real funcionando y sistema de emails de aviso operativo.

---

## ✅ LO QUE SE HA HECHO

### Producto (prototipo listo)
- **App `app.html`**: bienvenida, 8 deportes con diseño propio, feed estilo TikTok, ficha con radar de compatibilidad, encuesta de nivel por deporte, tarjeta "comparte tu nivel", chat de ejemplo, instalable como PWA, Open Graph.
- **Landing `index.html`**: titular gancho, FAQ, radar, captación de email.

### Captación real
- **6+ personas reales apuntadas** vía la red del hijo de Betsabé.

### Infraestructura (base definitiva)
- **Dominio:** `sportmatchapp.es` online con SSL — Cloudflare Pages, gratis, permanente.
- **Git:** todo el código respaldado en rama main. Nada se puede perder.
- **Base de datos:** Supabase operativo (`jhyykkgastbwrqlaryeu.supabase.co`).
  - Tabla `lista_espera` guardando registros reales (nombre, email, deporte, nivel).
  - Formulario de `sportmatchapp.es` conectado — los registros entran en Supabase.
- **Emails de aviso:** Edge Function `notify-signup` desplegada en Supabase.
  - Dominio `sportmatchapp.es` verificado en Resend (cuenta `betsabe@cypa.es`).
  - Cada registro dispara un email desde `noreply@sportmatchapp.es` a `betsabe@cypa.es`.

### Estrategia y documentación
- Arquitectura definitiva: React Native + Expo · Supabase · Cloudflare Pages · Stripe (futuro).
- Documentos: `PLAN.md`, `estrategia-producto.md`, `app-spec.md`, `db-schema.md`.

---

## ⏳ LO QUE FALTA

### Inmediato (próxima sesión)
- [ ] **Probar flujo completo:** apuntarse en `sportmatchapp.es` → verificar que llega email a `betsabe@cypa.es` desde el formulario real (pendiente de confirmar).
- [ ] **Email de bienvenida al apuntado:** cuando alguien se registra, recibe un email "¡Estás en la lista! Te avisamos cuando haya gente cerca." (Paso 3.3).
- [ ] **Conectar despliegue automático a Git** — para no tener que arrastrar la carpeta `web/` manualmente cada vez.

### Fase 4 — Producto real
- [ ] Registro/login (Supabase Auth).
- [ ] Perfil por deporte: nivel, ritmo, actitud, idioma.
- [ ] "Estoy en [ciudad] del [fecha] al [fecha]".
- [ ] Feed de jugadores compatibles en esa ciudad esas fechas.

### Fase 5 — Match y chat
- [ ] Match mutuo + chat real.
- [ ] Notificaciones push.

### En paralelo
- [ ] **Legal:** RGPD, términos de uso, política de menores.

### Más adelante
- [ ] Beta abierta con la red del hijo.
- [ ] Apps en App Store / Google Play.
- [ ] Monetización (premium, eventos, clubes).

---

## 💰 Costes actuales
| Concepto | Coste |
|----------|-------|
| Dominio `sportmatchapp.es` | ~6€/año |
| Hosting Cloudflare Pages | 0€ |
| Supabase (plan gratuito) | 0€ |
| Resend (plan gratuito, 3.000 emails/mes) | 0€ |
| **Total mensual** | **0€** |

Próximo coste real: Supabase Pro (~25€/mes) cuando el producto tenga usuarios activos.

---

## 📍 Próximo paso
Confirmar que el email de aviso llega desde el formulario real, luego montar el **email de bienvenida al apuntado** (Paso 3.3).
