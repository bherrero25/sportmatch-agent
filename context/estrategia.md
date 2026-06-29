# SportMatch — Estrategia de Producto, Ventas y Monetización

> Síntesis del análisis competitivo de NotebookLM (junio 2026)

---

## Lo que funciona (copiar)

| Feature | Referencia | Por qué funciona |
|---------|-----------|-----------------|
| Pagos divididos automáticos | Playtomic | Elimina la incomodidad de cobrar a amigos |
| Roles + lista de espera automática | OpenSports | Vital para deportes de equipo |
| Eventos Friendly vs. Inhouse | Golevel | Segmenta casual de premium sin confundir |
| Matching por actitud + ritmo + idioma | Mulligan | Compatibilidad real, no solo nivel técnico |
| Plaza garantizada + host en el lugar | GoodRec | Confianza para adultos sin tiempo |
| Mapas de calor de canchas en tiempo real | Fullcourt | Valor comunitario enorme |

---

## Errores a evitar

- **Overbooking oculto** — GoodRec destruye confianza cambiando formato (7v7 → 8v8) sin avisar para vender más plazas. Nunca cambiar aforo una vez abierto.
- **Migración a WhatsApp** — si el usuario sale de la app para coordinar, se pierde. El chat y la organización deben vivir dentro.
- **Canchas sin validar** — Fullcourt tiene quejas de canchas "libres" que son recintos privados. Validar instalaciones antes de publicarlas.

---

## Mensaje de venta

### Para el jugador (B2C)
**El problema no es la falta de deporte, es la falta de gente.**
Promesa: partido equilibrado, con buena gente, plaza garantizada, en 3 clics.

### Para clubes y polideportivos (B2B)
**Te quitamos el trabajo manual.**
- Reservas online centralizadas
- Pagos previos → menos absentismo
- Pistas vacías ocupadas

---

## Modelos de monetización (comprobados en el sector)

### 1. Eventos Inhouse (ticket por partido)
- SportMatch organiza, alquila la pista, cobra entrada
- Precio referencia: ~10-15€/plaza
- Incluye: pista garantizada, material, organización
- Inspiración: Golevel, GoodRec

### 2. SaaS para clubes
- Suscripción mensual a polideportivos y clubs privados
- A cambio: software de gestión + acceso al flujo de jugadores de SportMatch
- Inspiración: Playtomic Manager

### 3. Membresías para jugadores
- Bonos de 5 o 10 partidos prepagados
- Descuento por volumen + fidelización
- Inspiración: OpenSports

### 4. Comisión por transacción
- % pequeño sobre cada pago procesado en la plataforma
- Escalable automáticamente con el volumen

---

## Orden de implementación recomendado

**MVP (validar primero):**
- Matching por afinidad + modo viajero
- Chat in-app
- Sin pagos — coordinar sin cobrar

**Fase 2 (cuando haya tracción):**
- Split payment + comisión por transacción
- Eventos Friendly (usuario crea)
- Lista de espera automática

**Fase 3 (cuando haya masa crítica):**
- Eventos Inhouse (SportMatch organiza)
- Panel para clubes (SaaS)
- Membresías

**Fase 4 (escala):**
- Mapas de calor de canchas
- Integración hardware (smartwatch)
- Expansión internacional
