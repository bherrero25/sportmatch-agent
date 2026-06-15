#!/usr/bin/env python3
"""
SportMatch CLI Agent
Asistente de producto para el proyecto SportMatch.
Uso: python agent.py
"""

import os
import json
import sys
from datetime import datetime
from pathlib import Path
import anthropic

# ── Configuración ──────────────────────────────────────────────────────────────

MODEL = "claude-sonnet-4-6"
HISTORY_FILE = Path(__file__).parent / "history.json"
CONTEXT_DIR = Path(__file__).parent / "context"
MAX_HISTORY = 40  # mensajes que se envían a la API (para no agotar tokens)

# ── Contexto del proyecto ──────────────────────────────────────────────────────

def load_context() -> str:
    """Carga todos los archivos markdown de /context como system prompt."""
    files = sorted(CONTEXT_DIR.glob("*.md"))
    if not files:
        return "No hay archivos de contexto disponibles."
    parts = []
    for f in files:
        parts.append(f"## {f.stem.upper()}\n{f.read_text(encoding='utf-8')}")
    return "\n\n---\n\n".join(parts)

SYSTEM_PROMPT = f"""Eres el asistente de producto de SportMatch, una app móvil para conectar viajeros que quieren jugar deportes (golf, pádel, tenis, running, senderismo, baile) en ciudades nuevas.

Tu rol es ayudar al fundador a:
- Tomar decisiones de producto y negocio
- Preparar mensajes, emails y textos de marketing
- Analizar competencia y oportunidades
- Priorizar tareas de validación
- Pensar en la estrategia go-to-market

Responde siempre en español. Sé directo, concreto y orientado a acción. El fundador está en fase pre-producto — cada respuesta debe empujarle hacia la siguiente validación real.

CONTEXTO COMPLETO DEL PROYECTO:

{load_context()}
"""

# ── Comandos rápidos ───────────────────────────────────────────────────────────

COMMANDS = {
    "/tareas": """Dame una lista de tareas priorizada para esta semana.
Tengo en cuenta que estoy en fase pre-producto y debo validar antes de codear.
Organízala por: 🔴 Urgente, 🟡 Esta semana, 🟢 Cuando pueda.""",

    "/landing": """Escríbeme el copy completo para la landing page de lista de espera de SportMatch.
Necesito: headline principal, subheadline, 3 bullets de beneficio, CTA del formulario y microcopy de confianza.
El tono debe ser fresco, directo y orientado a viajeros de negocios.""",

    "/email-club": """Escríbeme un email de outreach para enviar a los directores de clubs de golf y pádel en Madrid.
El objetivo es conseguir una reunión de 20 minutos para explorar colaboración.
Debe ser breve (máximo 150 palabras), personalizable con [NOMBRE_CLUB] y [NOMBRE_DIRECTOR].
Tono profesional pero cercano.""",

    "/competencia": """Dame un análisis rápido de la situación competitiva de SportMatch.
¿Cuál es nuestra ventana de oportunidad? ¿Qué riesgo real tenemos de que alguien nos copie?
Dame 3 acciones concretas para ganar posición en los próximos 60 días.""",

    "/resumen": """Dame un resumen ejecutivo de SportMatch en formato tweet-thread (5 tweets).
Debe cubrir: el problema, la solución, el mercado, la tracción actual y el próximo paso.
Úsalo como si fuera para atraer a un co-fundador técnico o primer inversor angel.""",
}

HELP_TEXT = """
╔══════════════════════════════════════════════════════╗
║           SportMatch CLI Agent  🏓                   ║
╚══════════════════════════════════════════════════════╝

Comandos rápidos:
  /tareas      → Lista de tareas priorizada para esta semana
  /landing     → Copy completo para la landing page
  /email-club  → Email de outreach para clubs de golf/pádel
  /competencia → Análisis competitivo y acciones a tomar
  /resumen     → Resumen ejecutivo en formato tweet-thread

Otros comandos:
  /limpiar     → Borrar historial de conversación
  /contexto    → Ver qué archivos de contexto están cargados
  /ayuda       → Mostrar este mensaje
  /salir       → Salir del agente

O simplemente escribe tu pregunta. El agente recuerda la conversación.
"""

# ── Historial persistente ──────────────────────────────────────────────────────

def load_history() -> list[dict]:
    if HISTORY_FILE.exists():
        try:
            return json.loads(HISTORY_FILE.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            return []
    return []

def save_history(history: list[dict]) -> None:
    HISTORY_FILE.write_text(
        json.dumps(history, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

def add_to_history(history: list[dict], role: str, content: str) -> None:
    history.append({
        "role": role,
        "content": content,
        "ts": datetime.now().isoformat(timespec="seconds"),
    })

def messages_for_api(history: list[dict]) -> list[dict]:
    """Devuelve solo role+content, sin 'ts', y limita a MAX_HISTORY mensajes."""
    recent = history[-MAX_HISTORY:]
    return [{"role": m["role"], "content": m["content"]} for m in recent]

# ── Cliente Anthropic ──────────────────────────────────────────────────────────

def get_client() -> anthropic.Anthropic:
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("\n❌ Falta la variable de entorno ANTHROPIC_API_KEY.")
        print("   Añádela con: export ANTHROPIC_API_KEY=sk-ant-...")
        sys.exit(1)
    return anthropic.Anthropic(api_key=api_key)

def ask(client: anthropic.Anthropic, history: list[dict], user_input: str) -> str:
    add_to_history(history, "user", user_input)

    response = client.messages.create(
        model=MODEL,
        max_tokens=2048,
        system=SYSTEM_PROMPT,
        messages=messages_for_api(history),
    )

    reply = response.content[0].text
    add_to_history(history, "assistant", reply)
    save_history(history)
    return reply

# ── Renderizado ────────────────────────────────────────────────────────────────

def print_reply(text: str) -> None:
    print(f"\n\033[36m{'─' * 60}\033[0m")
    print(f"\033[30m{text}\033[0m")
    print(f"\033[36m{'─' * 60}\033[0m\n")

def print_info(text: str) -> None:
    print(f"\n\033[33m{text}\033[0m\n")

def spinner_start(msg: str) -> None:
    print(f"\033[90m⏳ {msg}...\033[0m", end="", flush=True)

def spinner_stop() -> None:
    print("\r\033[K", end="", flush=True)

# ── Main loop ──────────────────────────────────────────────────────────────────

def main() -> None:
    client = get_client()
    history = load_history()

    print(HELP_TEXT)

    if history:
        print_info(f"📂 Historial cargado: {len(history)} mensajes desde conversaciones anteriores.")
    else:
        print_info("💬 Nueva conversación iniciada.")

    while True:
        try:
            user_input = input("\033[32mTú → \033[0m").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n\n👋 Hasta luego.")
            break

        if not user_input:
            continue

        # Comandos de sistema
        if user_input in ("/salir", "/exit", "/quit"):
            print("\n👋 Hasta luego.")
            break

        if user_input in ("/ayuda", "/help"):
            print(HELP_TEXT)
            continue

        if user_input == "/limpiar":
            history.clear()
            save_history(history)
            print_info("🗑️  Historial borrado.")
            continue

        if user_input == "/contexto":
            files = sorted(CONTEXT_DIR.glob("*.md"))
            print_info("📄 Archivos de contexto cargados:\n" + "\n".join(f"  • {f.name}" for f in files))
            continue

        # Comandos rápidos → expanden a prompts completos
        if user_input in COMMANDS:
            expanded = COMMANDS[user_input]
            print_info(f"🚀 Ejecutando {user_input}...")
            user_input = expanded

        # Llamada a la API
        spinner_start("Pensando")
        try:
            reply = ask(client, history, user_input)
        except anthropic.APIError as e:
            spinner_stop()
            print_info(f"❌ Error de API: {e}")
            # Quitar el mensaje de usuario que no obtuvo respuesta
            history.pop()
            continue
        spinner_stop()

        print_reply(reply)


if __name__ == "__main__":
    main()
