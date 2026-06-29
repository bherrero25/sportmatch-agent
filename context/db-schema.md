# SportMatch — Esquema de base de datos (Supabase / PostgreSQL)

> Cimiento de la app real. Carpeta del proyecto: `~/Desktop/SportMatch-Agent`.
> Plataforma: **Supabase** (la misma que Casquito, pero PROYECTO NUEVO e independiente).
> Actualizado: 22 junio 2026.

---

## Antes de programar: lo único que tiene que hacer Betsabé

1. Entrar en supabase.com → **New project** → llamarlo `sportmatch` (región **Irlanda/EU**).
2. En el SQL Editor, activar PostGIS: `create extension if not exists postgis;`
3. Pasarme la **URL del proyecto** y la **anon key** (Project Settings → API). Nunca la `service_role` en el frontend.

> Es un proyecto SEPARADO de Casquito. No se mezclan datos.

---

## Tablas del MVP

### `profiles` — un registro por usuario
| Campo | Tipo | Notas |
|-------|------|-------|
| id | uuid (PK) | = `auth.users.id` |
| nombre | text | |
| ciudad_base | text | su ciudad habitual |
| ubicacion | geography(Point,4326) | para filtro por km (PostGIS) |
| idiomas | text[] | p.ej. {es, en} |
| avatar_url | text | Storage |
| created_at | timestamptz | default now() |

### `perfiles_deportivos` — un usuario tiene uno por deporte
| Campo | Tipo | Notas |
|-------|------|-------|
| id | uuid (PK) | |
| user_id | uuid (FK→profiles) | |
| deporte | text | golf, padel, tenis, running, senderismo, esqui, escalada, baloncesto |
| nivel | smallint | 1 principiante · 2 intermedio · 3 avanzado (de la encuesta) |
| nivel_label | text | "Intermedio (2/3)" |
| ritmo | text | tranquilo / moderado / exigente |
| actitud | text | competitivo / social / recreativo |
| metricas | jsonb | flexible por deporte: {handicap:12} golf, {pace:"5:30"} running, {grado:"6c+"} escalada… |
| created_at | timestamptz | |

> El `jsonb` permite que cada deporte tenga sus propias métricas sin cambiar la tabla.

### `disponibilidad` — modo viajero (dónde y cuándo)
| Campo | Tipo | Notas |
|-------|------|-------|
| id | uuid (PK) | |
| user_id | uuid (FK) | |
| deporte | text | |
| ciudad | text | ciudad donde estará |
| ubicacion | geography(Point,4326) | para el match por cercanía |
| desde | date | |
| hasta | date | |

### `conexiones` — cuando dos usuarios hacen match
| Campo | Tipo | Notas |
|-------|------|-------|
| id | uuid (PK) | |
| user_a / user_b | uuid (FK) | |
| deporte | text | |
| estado | text | propuesta / aceptada / rechazada |
| created_at | timestamptz | |

### `mensajes` — chat dentro de una conexión
| Campo | Tipo | Notas |
|-------|------|-------|
| id | uuid (PK) | |
| conexion_id | uuid (FK) | |
| sender_id | uuid (FK) | |
| texto | text | |
| created_at | timestamptz | |

> El chat usa **Supabase Realtime** sobre esta tabla.

---

## La consulta clave: "quién juega a X cerca de mí" (filtro por km)

```sql
-- jugadores de 'padel' a menos de :radio_km de un punto :lng,:lat
select p.nombre, pd.nivel_label, d.ciudad, d.desde, d.hasta
from disponibilidad d
join perfiles_deportivos pd
  on pd.user_id = d.user_id and pd.deporte = d.deporte
join profiles p on p.id = d.user_id
where d.deporte = 'padel'
  and ST_DWithin(
        d.ubicacion,
        ST_MakePoint(:lng, :lat)::geography,
        :radio_km * 1000          -- metros
      )
  and current_date between d.desde and d.hasta
order by ST_Distance(d.ubicacion, ST_MakePoint(:lng, :lat)::geography);
```

> Esto es exactamente el "filtrar por radio tipo Wallapop" — PostGIS lo resuelve nativo.

---

## Seguridad (RLS) — igual que ya haces en Casquito
- RLS activado en todas las tablas.
- Cada usuario solo lee/edita su propio `profiles`, `perfiles_deportivos` y `disponibilidad`.
- `mensajes`: solo visibles para los dos usuarios de la `conexion`.
- Nunca exponer la `service_role` en el frontend.

---

## Orden de construcción de la app real
1. **Auth** (registro/login) + tabla `profiles`
2. **Crear perfil deportivo** con la encuesta de nivel (ya diseñada en el prototipo)
3. **Disponibilidad** (ciudad + fechas) y captura de ubicación
4. **Listado/match** por deporte + km (consulta de arriba)
5. **Conexión + chat** (Realtime)
6. **Diseño por deporte** (los temas de color del prototipo se reutilizan tal cual)
