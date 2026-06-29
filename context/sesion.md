# SportMatch — Resumen de Decisiones (junio 2026)

> Este documento recoge todo lo decidido en las sesiones de trabajo anteriores.
> Úsalo para continuar sin perder contexto.

---

## Qué es SportMatch

App móvil que conecta viajeros con deportistas locales compatibles para jugar juntos.
**No es una app de reservas de pistas. Es Mulligan para todos los deportes.**

### El usuario central
Persona que viaja por trabajo o vacaciones, quiere jugar pádel/golf/tenis/running,
y no conoce a nadie en esa ciudad. Hoy no tiene ninguna solución.

### Frase clave del producto
> "Viajas a otra ciudad. Quieres jugar. No conoces a nadie."

### Deportes en Fase 1
Golf, pádel, tenis, running, senderismo, esquí.

---

## Estado actual del proyecto

### Landing page
- Desplegada en: `https://sportmatch-es.netlify.app`
- Archivo local: `~/Desktop/SportMatch-Agent/index.html`
- Formulario Netlify: `name="lista-espera"` con `data-netlify="true"` — funcionando
- Notificaciones Netlify configuradas para: betsabe@cypa.es
- Diseño: blanco + verde (#16a34a), inspirado en Mulligan
- Último cambio: headline actualizado a "Viajas a otra ciudad. Quieres jugar. No conoces a nadie."
- Social proof añadida: "312 deportistas ya en lista de espera"

### Agente CLI
- Archivo: `~/Desktop/SportMatch-Agent/agent.py`
- Modelo: claude-sonnet-4-6
- Arrancar: `cd ~/Desktop/SportMatch-Agent && python agent.py`
- Requiere: `export ANTHROPIC_API_KEY=sk-ant-...`
- Historial persistente en: `history.json`

---

## Competencia — conclusiones clave

### Mulligan (competidor más directo)
- Solo golf, solo iOS (Android próximamente), lanzado en Madrid
- Matching por: hándicap + ritmo + tipo de partida (social/competitivo) + movilidad (caminar/buggy)
- Flujo: Describe estilo → Match → Organiza en app
- SÍ tiene ángulo viajero: "juegues donde juegues" / "tu perfil viajará contigo"
- Roadmap: partidas abiertas + reserva green fees (aún no disponible)
- **Debilidad: solo golf, su marca no les permite expandirse**

### Resto de competencia
- Playtomic: líder pádel/tenis, 4M jugadores, 52 países. App de reservas, no de matching
- GoodRec: deportes de equipo, +70 ciudades. Problemas de overbooking
- Golevel: fútbol amateur España. Friendly vs. Inhouse
- OpenSports: alternativa técnica a Meetup. Waivers, roles, membresías
- Fullcourt: baloncesto, mapas de calor 60k canchas
- Strava/Relive: running/ciclismo, integración smartwatch

### Hueco de mercado
Nadie hace matching multi-deporte + modo viajero en España.
Playtomic gana reservas. SportMatch gana conexión entre personas.

---

## MVP — qué construir primero

Solo 4 cosas:
1. Perfil con deporte + nivel + ritmo + actitud
2. "Estoy en [ciudad] del [fecha] al [fecha]"
3. La app muestra perfiles compatibles disponibles esa semana
4. Chat dentro de la app para coordinar

**Sin pagos. Sin reservas. Sin eventos. Solo conexión.**

---

## Arquitectura técnica decidida

- **Frontend:** React Native + Expo (iOS + Android)
- **Backend:** Node.js + Express
- **BD:** PostgreSQL + PostGIS (geolocalización)
- **Cache:** Redis (presencia online)
- **Hosting MVP:** Railway o Render
- **Pagos (Fase 2):** Stripe
- **Push:** Firebase FCM

### Tabla clave: perfiles_deportivos
Un usuario tiene un perfil por deporte con:
- nivel (numérico o texto según deporte)
- ritmo: tranquilo / moderado / exigente
- actitud: competitivo / social / recreativo
- idiomas
- metricas_json (JSONB): hándicap en golf, ranking en pádel, pace en running...

---

## Monetización (por fases)

| Fase | Modelo | Referencia |
|------|--------|-----------|
| MVP | Gratis | — |
| Fase 2 | Comisión por transacción | Playtomic |
| Fase 3 | Eventos Inhouse (ticket por plaza ~10-15€) | Golevel |
| Fase 4 | SaaS para clubes (suscripción mensual) | Playtomic Manager |
| Fase 4 | Membresías jugadores (bonos 5-10 partidos) | OpenSports |

---

## Próximos pasos

1. **Esta semana:** conseguir 15 emails en `sportmatch-es.netlify.app`
2. **Semana que viene:** llamar a 5 personas de la lista — "¿Has tenido este problema? ¿Cómo lo resolviste?"
3. **Mes 1:** si hay validación, construir perfil + matching mínimo (puede ser manual al principio)

---

## Flujo de trabajo

```bash
# Abrir proyecto en Claude Code
# Carpeta: ~/Desktop/SportMatch-Agent

# Arrancar agente
cd ~/Desktop/SportMatch-Agent
export ANTHROPIC_API_KEY=sk-ant-...
python agent.py

# Subir landing a Netlify
# Arrastrar index.html a:
# app.netlify.com/projects/sportmatch-es/deploys
```

## Herramientas usadas
- **Claude Code** — desarrollo, contexto, código
- **NotebookLM** — investigación de competencia, síntesis de documentos
- **Netlify** — hosting landing + formulario lista de espera
- **Resend / Netlify Forms** — recogida de emails

---

## Actualización — sesión 22 junio 2026

### Landing: arreglos y mejoras aplicadas
- 🔴 **Bug crítico resuelto:** el formulario hacía `preventDefault()` y mostraba "éxito" sin enviar nada a Netlify → captaba **0 emails**. Arreglado.
- **Envío blindado para móvil:** se pasó de AJAX (`fetch`) a **POST nativo dentro de un iframe oculto** (`target="sm-hidden-iframe"`). El `fetch` fallaba en el móvil y en los mini-navegadores de WhatsApp/Instagram. El POST nativo funciona en todos. **Confirmado funcionando en móvil** (incl. "añadir a pantalla de inicio" como PWA).
- **Mensajes honestos (sin números inventados):**
  - Hero: "Lista de espera abierta · Sé de los primeros en tu ciudad" (antes "312 deportistas")
  - Perfiles: "Así se verá tu feed de deportistas · Perfiles de ejemplo" (antes parecían reales)
  - Éxito al apuntarse: "✅ ¡Estás en la lista!" + explicación de que es **beta** y que te avisan cuando haya gente cerca (gestiona expectativas, convierte al usuario en "fundador")
  - Cierre: "Únete a la lista de espera... Gratis en fase beta" (sin "50 plazas" ni "sin tarjeta")
- **Botón fijo (sticky) verde en móvil** + nav limpia en móvil (oculto "Entrar").
- **Nuevo deporte: Escalada** 🧗 (chip + filtro + perfil de ejemplo "Nora V., 26"). Ya son **7 deportes**. Pensado para el público joven.
- Footer actualizado a 2026.

### Netlify
- Formulario `lista-espera` **detectado y guardando** submissions (probado: "Betsabé").
- **Notificación por email activa** → betsabe@cypa.es en cada nuevo registro (revisar carpeta de spam la 1ª vez).
- **Despliegue:** manual, arrastrando `index.html` a `app.netlify.com/projects/sportmatch-es/deploys` (no hay git remote ni Netlify CLI conectados). Recordar re-subir tras cada cambio.
- `127.0.0.1:5500` (Live Server de VS Code) es solo vista previa local; el formulario **solo guarda en la web de Netlify**.

### Estrategia de captación (decidida)
- **Lanzamiento dirigido por el hijo de Betsabé → deportistas jóvenes** (móvil-nativos, comparten mucho).
- **Meta concreta:** 15 apuntados esta semana.
- **Plan:** 10 mensajes privados uno-a-uno → grupos de WhatsApp de deporte → story de Instagram. (Mensajes redactados y entregados.)
- **Truco de validación:** a cada apuntado, preguntarle si le ha pasado el problema y a qué ciudad/deporte viaja → valida + da datos para el match a mano.

### Roadmap acordado (¡el orden importa!)
1. **Lista de espera** *(estamos aquí)* — validar interés.
2. **Match a mano (concierge):** Betsabé y su hijo hacen de "celestina" por WhatsApp con los primeros apuntados. Sin app. Valida si la gente **de verdad queda y juega**.
3. **App con match automático:** SOLO si el paso 2 funciona. La app escala un comportamiento ya validado; no se construye antes de saber que funciona (es lo más caro).

### Pendiente / próximo
- [ ] Re-subir `index.html` a Netlify con los cambios de escalada.
- [ ] Conseguir los 15 primeros apuntados.
- [ ] Diseñar el "match a mano": qué preguntar, cómo presentar a dos personas, cómo medir si funciona.

---

## Actualización — sesión 23 junio 2026 (app + mejoras de atractivo)

### Prototipo `app.html` (lanzado en Netlify)
- App navegable separada de la landing: inicio → elegir deporte → sección con **diseño propio por deporte** (color temático) → perfiles → encuesta → apuntarse.
- Enlazada desde la landing con botón "Probar la app →". Botón "← Volver a la web" visible arriba en la app.
- Captación de email integrada (mismo POST robusto en iframe).
- Se comparte una sola URL: `sportmatch-es.netlify.app`.

### Mejoras de atractivo (las 4 que pidió Betsabé)
1. **Viral** ✅ — Open Graph (vista previa bonita al pegar el link en WhatsApp/IG) + **tarjeta "comparte tu nivel"** generada con canvas para stories (imagen 1080×1920 con el color del deporte). Se comparte con Web Share API; fallback a descargar.
2. **PWA** ✅ — `manifest.json` + iconos (SM verde) → "añadir a pantalla de inicio" aparece como app real.
3. **Encuesta por deporte** ✅ — cada deporte pregunta su métrica real: golf=hándicap, pádel=nivel 1-7, tenis=nivel, running=ritmo/km, senderismo=tipo de ruta, esquí=tipo de pista, escalada=grado, baloncesto=nivel. El resultado y la tarjeta muestran esa métrica. Se guarda en el registro (campo `nivel`).
4. **Wow (deslizar)** ✅ — perfiles en **baraja deslizable tipo Tinder/Mulligan** (pointer events, izquierda=saltar, derecha=jugar→apuntarse) con **% de match** visible y sellos JUGAR/NOPE. Botones ✕/🤝 también.

### Toques wow añadidos (segunda tanda, 23 jun)
- **Baraja pulida:** deslizar con el dedo (← siguiente, → anterior con animación de entrada) + botones de respaldo `← Anterior / 🤝 Jugar / Siguiente →` (el botón es clave para volver atrás al llegar al final, donde ya no hay tarjeta que deslizar). Nota: el deslizar-derecha empieza desde el centro de la tarjeta para no chocar con el gesto "atrás" del navegador móvil.
- **5 jugadores de ejemplo por deporte** (antes 2) — ver `EXTRA` en app.html.
- **Ficha de compatibilidad por jugador:** tocar una tarjeta abre un modal con **radar tipo Mulligan** (tú vs ese jugador en 5 ejes: Nivel, Ritmo, Actitud, Horario, Idioma) + % compatible + botón Jugar. Radar generado en JS (`radarSVG`), valores por jugador deterministas (`radarValues`).
- **Encuesta = botón 🤝**, no el deslizar (deslizar solo navega).
- **Pantalla de bienvenida** (`#welcome`, solo 1ª visita vía `localStorage 'sm_seen'`): titular "Viajas a otra ciudad / Quieres jugar / No conoces a nadie" (mismo gancho que la landing) + 3 pasos + "Empezar". Para volver a verla: incógnito.
- **Chat de ejemplo** (`openChat`): desde la ficha del jugador, botón "💬 Ver cómo coordináis" → conversación que aparece con animación de "escribiendo…", termina en "Apúntate para escribirle de verdad →". Honesto sobre que es preview.
- Aclaración importante: la **landing NO desaparece**; sigue en `sportmatch-es.netlify.app`. La bienvenida solo vive dentro de `app.html`.

### Imágenes generadas (Pillow) — en carpeta `web/`
`og.png` (preview), `icon-192/512.png`, `apple-touch-icon.png`, `favicon.png`.

### Flujo de despliegue (IMPORTANTE)
- Todo el sitio vive en la subcarpeta **`web/`** (los 2 HTML + imágenes + manifest).
- **Publicar = arrastrar la carpeta `web` entera** a `app.netlify.com/projects/sportmatch-es/deploys`.
- Netlify reemplaza el sitio con el contenido de `web/`. Nunca arrastrar archivos sueltos.

### Pendiente
- [ ] **Tanda "Confianza"**: FAQ (¿gratis? ¿cuándo lanza? ¿cómo funciona el match?) + radar de compatibilidad estilo Mulligan.
- [ ] Probar en móvil real tras desplegar: swipe, tarjeta compartible, preview del link, instalar como app.
- [ ] App real con Supabase (esquema en `db-schema.md`, falta crear el proyecto).

> ⚠️ Nota de entorno: la sesión de Claude se abrió desde la carpeta CASQUITO (otro proyecto). Todo SportMatch está en `~/Desktop/SportMatch-Agent/`. No mezclar.

---

## Notas de diseño (landing)

- Fondo blanco (#ffffff), acento verde (#16a34a), texto oscuro (#111827)
- Hero: dos columnas — texto izquierda + mock card app derecha
- Cards de perfiles con foto, tags de nivel/ritmo/idioma, botones Jugar/Saltar
- Modal con formulario Netlify — solo nombre + email
- Sección "Cómo funciona" con fondo verde oscuro (#1a2e1a)
- Inspiración visual: Mulligan app
