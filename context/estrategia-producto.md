# SportMatch — Estrategia de Producto (hoja de ruta definitiva)

> Decidido el 23 junio 2026. Betsabé apuesta por sacar un **producto en condiciones**, vendible
> en España y fuera, con diseño y gancho. Invertir algo de dinero, riesgo controlado.
> Carpeta: `~/Desktop/SportMatch-Agent`. Agente técnico: Claude. Se sumará un **agente legal**.

---

## Cambio de estrategia
- **Dejar de acumular emails fríos** (una lista de espera que no lleva a nada quema la ilusión).
- **Construir el producto real** y convertir la red caliente (red del hijo + ya apuntados) en **primeros usuarios**.
- Validar **uso y retención** con un producto real, no con una lista.

## Arquitectura definitiva

| Capa | Decisión | Motivo |
|------|----------|--------|
| App | **React Native + Expo** (TypeScript) | Un código → iOS + Android + web. Camino a stores. Push incluido. |
| Backend + BD | **Supabase (Pro ~23€/mes)** | PostGIS (búsqueda por km), Auth, chat realtime, Storage, EU/RGPD, Postgres sin lock-in. |
| Web/landing | **Cloudflare Pages (gratis) + dominio propio** | Hosting gratis sin créditos, CDN mundial, URL permanente. Fuera Netlify. |
| Push | **Expo Notifications (gratis)** | Re-enganche: jugadores nuevos cerca, mensajes. |
| Pagos (futuro) | **Stripe** | Internacional, multi-moneda. |
| Idiomas | **ES + EN desde el día 1** | Vender dentro y fuera de España. |

## Form factor: por fases (riesgo controlado)
- **Fase 1 — PWA real (semanas):** prototipo pulido + Supabase → cuentas, perfiles, chat, push web. Instalable en el móvil, sin stores. Lanzamiento rápido a la red del hijo → mantener ilusión + validar retención.
- **Fase 2 — Apps nativas (cuando enganche):** React Native en App Store + Google Play. Mismo código/backend. Credibilidad, descubrimiento, producto vendible internacional.
- Razón: no gastar lo gordo (nativo + stores) hasta tener prueba de uso real.

## Coste
| Concepto | Coste |
|----------|-------|
| Dominio | ~6€/año |
| Web (Cloudflare Pages) | 0€ |
| Supabase Pro | ~23€/mes (recurrente principal) |
| Apple Developer | 99€/año (al publicar iOS) |
| Google Play | 25€ único (al publicar Android) |

**Fase 1 ≈ 25€/mes.** Stores (~125€) solo al dar el salto. El gran coste es el desarrollo (lo asume el agente técnico).

## Gancho / enganche
Feed TikTok ✅ · radar de compatibilidad ✅ · tarjeta "comparte tu nivel" ✅ · **"¡Match!" + push con interés mutuo** · **avisos de jugadores nuevos/viajeros en tu zona** · rachas y logros por deporte · perfil gamificado · diseño cuidado en cada pantalla.

## Agente legal (en paralelo al técnico)
- **RGPD/GDPR**: privacidad, consentimiento, derechos ARCO, DPA con Supabase/Stripe/Expo.
- **Términos + normas de comunidad**: seguridad al quedar con desconocidos (deporte).
- **Menores**: verificación de edad / política (público joven). Salvaguarda.
- **Seguridad**: reportar/bloquear, consejos de quedada, responsabilidad (lesiones).
- **Vendibilidad**: IP limpia, contratos. Producto vendible como empresa/activo.

## Monetización (cuando haya masa crítica)
Freemium (ver quién te ha dado like, filtros ilimitados, boost modo viajero) · comisión por reservas (si se integran pistas) · eventos/tickets · B2B clubes (suscripción). La arquitectura no lo bloquea (Stripe-ready, roles/tiers en BD).

## Roadmap
- **Fase 0 (ahora):** arquitectura decidida ✅ · comprar dominio · crear proyecto Supabase.
- **Fase 1:** Auth + esquema (ver `db-schema.md`) → crear perfil con encuesta → feed TikTok con datos reales → chat → push → ES/EN. Lanzar PWA a la red del hijo.
- **Fase 2:** apps nativas a las stores. Crecimiento.
- **Fase 3:** monetización.
- **Legal:** en paralelo desde Fase 1.

## Estado del prototipo (base de diseño/UX ya validada)
`app.html` (vanilla) con: bienvenida, deportes con diseño propio, **feed TikTok**, ficha con radar, encuesta por deporte, compartir nivel, chat de ejemplo. Sirve como referencia visual del producto real.
