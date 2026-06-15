# SportMatch CLI Agent

Asistente de producto para SportMatch. Corre en terminal, recuerda las conversaciones y tiene comandos rápidos para las tareas más habituales.

## Setup

```bash
cd ~/Desktop/SportMatch-Agent

# Instalar dependencias
pip install -r requirements.txt

# Añadir tu API key de Anthropic
export ANTHROPIC_API_KEY=sk-ant-...

# Arrancar
python agent.py
```

Para que la API key persista entre sesiones, añádela a tu `~/.zshrc`:
```bash
echo 'export ANTHROPIC_API_KEY=sk-ant-...' >> ~/.zshrc
source ~/.zshrc
```

## Comandos rápidos

| Comando | Qué hace |
|---------|----------|
| `/tareas` | Lista de tareas priorizada para esta semana |
| `/landing` | Copy completo para la landing page de lista de espera |
| `/email-club` | Email de outreach para clubs de golf/pádel en Madrid |
| `/competencia` | Análisis competitivo y acciones a tomar en 60 días |
| `/resumen` | Resumen ejecutivo en formato tweet-thread |
| `/limpiar` | Borrar historial de conversación |
| `/contexto` | Ver qué archivos de contexto están cargados |
| `/ayuda` | Mostrar ayuda |
| `/salir` | Salir |

## Archivos

```
SportMatch-Agent/
├── agent.py          # Agente principal
├── history.json      # Historial de conversaciones (se crea automáticamente)
├── requirements.txt
└── context/
    ├── proyecto.md   # Idea, usuario, modelo de negocio
    ├── competencia.md
    ├── validacion.md # Plan de 3 fases
    └── stack.md      # Stack técnico elegido
```

El historial se guarda en `history.json` entre sesiones. El agente recuerda todo lo que has hablado.
