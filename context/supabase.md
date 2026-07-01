# SportMatch — Conexión Supabase

> Datos del proyecto Supabase (Fase 3). La clave publishable es pública/segura (va en el frontend).
> La `service_role`/`secret` y la contraseña de la BD NO van aquí ni en el código — solo las tiene Betsabé.

- **Project URL:** `https://jhyykkgastbwrqlaryeu.supabase.co`
- **Publishable key (anon/pública):** `sb_publishable_e1bjCItRXofoF-mh1IK2xA_tQVoCg9M`
- **Organización:** Sportmatchapp.es (plan Pro)
- **Región:** Europe (RGPD)

## Tabla de lista de espera (SQL ejecutado en SQL Editor)
`lista_espera`: id, nombre, email, deporte, nivel, origen, created_at.
RLS activado. Política: solo INSERT público (anon), sin SELECT público (los emails no son legibles por nadie salvo desde el panel).
