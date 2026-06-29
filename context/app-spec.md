# SportMatch — Especificación de la App

> Documento vivo. Recoge las features decididas y la dirección técnica para cuando
> llegue el momento de construir. Actualizado: 22 junio 2026.

---

## Principio rector

**No construir antes de validar.** El orden es:
1. Lista de espera *(en curso — 6 primeros apuntados vía el hijo de Betsabé)*
2. **Match a mano (concierge)** — Betsabé y su hijo presentan jugadores compatibles por WhatsApp. Sin app. Valida si la gente **de verdad queda y juega**.
3. **MVP web** (solo si el paso 2 funciona)
4. **App nativa + extras** (solo si el MVP web funciona)

La app escala un comportamiento ya validado; no se construye para descubrir si funciona.

---

## Stack técnico decidido

### Cliente (lo que ve el usuario)
- **Fase MVP → React + TypeScript (web app / PWA)**
  - Mismo lenguaje que la landing actual.
  - Funciona en el móvil con "añadir a pantalla de inicio" → parece app, sin App Store ni Google Play.
  - Se actualiza al instante. Ideal para iterar con los primeros usuarios.
- **Fase posterior → React Native + Expo (app nativa iOS + Android)**
  - Mismo lenguaje (TypeScript) → se reaprovecha casi todo.
  - Solo cuando el MVP web esté validado y se quiera estar en las tiendas.

### Backend + Base de datos → **Supabase**
Misma plataforma que ya usa Betsabé en Casquito (no hay que aprender nada nuevo).
Cubre en un solo sitio:

| Necesidad | Componente Supabase |
|-----------|---------------------|
| Filtrar por radio de km (tipo Wallapop) | **PostGIS** (geolocalización sobre PostgreSQL) |
| Cuentas / login | **Auth** |
| Perfiles por deporte, niveles, encuestas | **PostgreSQL** (tablas + RLS) |
| Chat entre jugadores | **Realtime** |
| Fotos de perfil | **Storage** |

> Esto sustituye la idea anterior de Node + Express + Redis: para el MVP, **Supabase sola** basta.

---

## Features por fase

### 🟢 MVP (Fase 1 — núcleo del match)
- [ ] **Perfil de usuario** con uno o varios deportes
- [ ] **Autopuntuación de nivel** mediante una **encuesta corta** por deporte (modelo Playtomic: tú te asignas un nivel respondiendo unas preguntas)
- [ ] **Variables de perfil** (inspiradas en Mulligan, adaptadas multi-deporte):
  - Nivel técnico (por deporte: hándicap golf, nivel pádel/tenis, grado escalada, pace running…)
  - Ritmo: tranquilo / moderado / exigente
  - Actitud: competitivo / social / recreativo
  - Idiomas
  - Disponibilidad: ciudad + fechas (modo viajero)
- [ ] **Filtrar por deporte**
- [ ] **Filtrar por radio de km** (tipo Wallapop) → PostGIS
- [ ] **Ver perfiles compatibles** disponibles en esa ventana de fechas/ciudad
- [ ] **Chat** para coordinar la quedada

### 🟡 Fase 2 — diseño e identidad por deporte
- [ ] **Cada deporte con su sección y diseño propio** al filtrar:
  - Baloncesto → naranja
  - Escalada → tonos roca/tierra
  - Golf → verde
  - Pádel / tenis / running / senderismo / esquí → su paleta
  - *(Diferenciador fuerte vs Mulligan, que es solo golf. Es estética: se añade cuando el match ya funciona.)*
- [ ] **Puntuación entre usuarios** — que otros te valoren tras jugar (requiere masa crítica; sin gente que ya haya jugado junta no aporta)

### 🟢 Futuro (alineado con monetización ya decidida)
- Comisión por transacción (referencia Playtomic)
- Eventos Inhouse (ticket por plaza, referencia Golevel)
- SaaS para clubes / membresías de jugadores

---

## Deportes (Fase 1)
Golf ⛳ · Pádel 🎾 · Tenis 🎾 · Running 🏃 · Senderismo 🥾 · Esquí ⛷️ · **Escalada 🧗** *(añadido — encaja con público joven)*

Posibles para el público joven del hijo de Betsabé: **baloncesto** (mencionado), surf, crossfit… (evaluar según demanda real).

---

## Preguntas abiertas (a resolver con datos del match a mano)
- ¿Qué deportes piden de verdad los primeros usuarios?
- ¿La gente prefiere "viajero busca local" o también "local busca local"?
- ¿Cuántas preguntas tolera la encuesta de autopuntuación sin abandonar?
- ¿El match falla más por nivel, por horario o por distancia? → define el peso del algoritmo
