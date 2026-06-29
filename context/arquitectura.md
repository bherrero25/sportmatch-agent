# SportMatch — Arquitectura Técnica (Referencia)

> ⚠️ Fase actual: pre-producto / validación. Este documento es referencia para cuando se empiece a codear.

## Stack confirmado
- React Native + Expo (iOS + Android)
- Node.js + Express (API REST)
- PostgreSQL + PostGIS (geolocalización)
- Redis (sesiones, presencia online)
- Railway o Render (hosting MVP)
- Stripe (pagos)
- Firebase FCM (notificaciones push)

---

## Modelo de datos — Diseño conceptual

### Tablas core

**usuarios**
- id, nombre, email, métodos_pago, ciudad_actual, disponibilidad (modo viajero)

**deportes**
- id, nombre, jugadores_estandar, requiere_roles (boolean)

**perfiles_deportivos** ← tabla clave
- usuario_id + deporte_id (clave compuesta)
- nivel (string o numérico según deporte)
- objetivos: competitivo / social / recreativo
- ritmo: tranquilo / moderado / exigente
- actitud (campo libre o tags)
- idiomas
- metricas_json (JSONB para atributos variables por deporte: hándicap en golf, ranking RFEP en pádel, pace en running, etc.)

### Infraestructura (Fase 2+)

**instalaciones**
- id, nombre, ciudad, coordenadas (PostGIS POINT)
- tipo: publico / privado (validar antes de publicar — problema de Fullcourt con recintos privados marcados como libres)

**canchas**
- id, instalacion_id, deporte_id, estado_trafico (para mapas de calor tipo Fullcourt)

### Eventos

**eventos**
- id, creador_id, cancha_id, deporte_id, fecha, hora
- tipo: friendly (usuario) / inhouse (plataforma garantiza)
- visibilidad: publico / privado (como Playtomic — privado = solo invitados)
- precio_total, plazas_totales, plazas_libres

**roles_evento** (solo deportes con posiciones: fútbol, baloncesto)
- evento_id, nombre_rol, plazas_disponibles

### Transaccional

**inscripciones** (split payment estilo Playtomic)
- id, evento_id, usuario_id, rol_id, estado_pago, asistencia

**lista_espera** (evitar overbooking de GoodRec)
- evento_id, usuario_id, timestamp

---

## Decisiones técnicas clave

1. **PostgreSQL** — integridad ACID para pagos divididos y control de aforo
2. **PostGIS** — búsqueda geoespacial para "compañeros cerca de ti ahora"
3. **JSONB en perfiles_deportivos** — atributos variables por deporte sin columnas vacías
4. **Redis** — presencia online en tiempo real ("disponible ahora")

---

## Lo que hace único el modelo de SportMatch vs. competencia

| Feature | Playtomic | GoodRec | Mulligan | SportMatch |
|---------|-----------|---------|----------|------------|
| Multi-deporte | Sí | Sí | No (golf) | Sí (6 deportes) |
| Matching por afinidad | No | No | Sí (golf) | Sí (todos) |
| Modo viajero | No | No | No | **Sí — diferenciador único** |
| Split payment | Sí | No | No | Fase 1 |
| Roles deportivos | No | No | No | Fase 2 |
| Mapas calor | No | No | No | Fase 3 |

---

## Orden de construcción recomendado

### Fase 1 — MVP
1. Auth + perfiles multidimensionales (nivel + ritmo + actitud + idioma)
2. Modo viajero (ciudad + fechas disponible)
3. Matching básico (deporte + ciudad + nivel compatible)
4. Chat in-app para coordinar (evitar migración a WhatsApp)

### Fase 2 — Eventos
5. Creación de partidos públicos (friendly)
6. Split payment (Stripe)
7. Lista de espera automática

### Fase 3 — Datos y retención
8. Mapas de calor / tráfico en tiempo real
9. Niveles dinámicos (sube/baja según partidos)
10. Integración smartwatch (Strava-style)

### Fase 4 — B2B
11. Panel para clubes (gestión de pistas vacías)
12. Membresías / bonos de partidos
13. Eventos inhouse (plataforma garantiza todo)
