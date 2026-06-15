# SportMatch — Stack Técnico

> ⚠️ Stack elegido pero aún no implementado. Fase actual: pre-producto / validación.

## Frontend
- **React Native + Expo** — iOS y Android desde un solo codebase
- **Expo EAS** para builds y distribución

## Backend
- **Node.js + Express** — API REST
- **PostgreSQL + PostGIS** — base de datos principal con soporte de geolocalización (buscar compañeros cercanos)
- **Redis** — sesiones de usuario, presencia online en tiempo real

## Infraestructura
- **Railway o Render** — hosting del MVP (fácil de escalar, sin ops inicial)
- **Cloudinary** — almacenamiento y optimización de fotos de perfil
- **Firebase FCM** — notificaciones push (iOS + Android)

## Auth y pagos
- **Google Login + Apple Login** — autenticación social (reduce fricción de registro)
- **Stripe** — suscripciones Pro/Elite y cobro de comisiones por reservas

## Decisiones pendientes
- Motor de matching: algoritmo propio simple (distancia + deporte + nivel) vs. servicio externo
- Chat en tiempo real: WebSockets propios vs. Stream Chat vs. SendBird
- Reservas de pistas: integración con Playtomic API (pádel) o sistema propio

## Cuándo empezar a codear
Solo después de superar Fases 1 y 2 de validación. El MVP mínimo para Fase 3 podría ser una web simple, no necesariamente la app nativa completa.
