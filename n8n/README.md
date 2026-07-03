# Workflows n8n — la misma orquesta, en otra herramienta

Dos workflows importables que replican el experimento de la guía (flujo lineal vs flujo paralelo) en [n8n](https://n8n.io). Sirven para ver que **la arquitectura de la orquesta es independiente de la herramienta** — y que n8n sí permite el fan-out/fan-in real que en Copilot Studio se hace a mano.

| Workflow | Arquitectura | Qué demuestra |
|---|---|---|
| [`01-auditoria-lineal.json`](01-auditoria-lineal.json) | Cadena: Seguridad → Privacidad → Gobernanza | Cada auditor ve los reportes anteriores: contaminación de contexto y efecto ancla, en vivo. |
| [`02-auditoria-paralela.json`](02-auditoria-paralela.json) | Fan-out / fan-in: 3 auditores aislados → Merge → Consolidador | Independencia real entre auditores + informe unificado con veredicto. |

## Cómo usarlos (5 minutos)

1. Necesitas un n8n corriendo: [n8n.io/cloud](https://n8n.io) (trial) o local con `npx n8n` (Node 18+) o Docker.
2. En n8n: **Workflows → Import from File** → selecciona el JSON.
3. Consigue una API key **gratis** de Groq en [console.groq.com](https://console.groq.com) → API Keys.
4. Doble clic en el nodo **Groq (principal)** → Credential → New → pega la key (se configura una sola vez, sirve para ambos workflows).
5. **Execute workflow**. La evidencia se descarga sola por HTTP desde este repositorio.

Para auditar otro repositorio del lab, cambia `evidencia_url` en el nodo **Configurar**:

- `https://raw.githubusercontent.com/Fedgutcor/lab-auditoria-plataforma-core/main/copilot-studio/evidencia-completa.md`
- `https://raw.githubusercontent.com/Fedgutcor/lab-auditoria-rrhh-copilot/main/copilot-studio/evidencia-completa.md`
- `https://raw.githubusercontent.com/Fedgutcor/lab-auditoria-landing-campana/main/copilot-studio/evidencia-completa.md`

## La lección

- En n8n la evidencia **sí llega por URL** (el nodo HTTP Request la descarga de verdad). En Copilot Studio, enlazar el repo no funciona — su fuente "Public websites" solo hace búsquedas Bing. Misma intención, grounding muy distinto: **el acceso a la evidencia se diseña, no se supone**.
- Compara el reporte del Auditor Privacidad entre el workflow 01 y el 02: misma evidencia, mismo prompt base, arquitectura distinta → resultado distinto. Eso es lo que la guía llama *gobernanza como diseño de flujo*.

> Nota: modelo por defecto `llama-3.3-70b-versatile` vía Groq (tier gratis). El nodo **Gemini (alternativa)** está incluido sin conectar: si prefieres Gemini (key gratis en [aistudio.google.com](https://aistudio.google.com)), conéctalo a los agentes y elimina el de Groq.
