# plataforma-core

> ⚠️ **REPOSITORIO DE EJEMPLO — INTENCIONALMENTE VULNERABLE**
> Este código contiene fallos de seguridad, privacidad y gobernanza de IA **plantados a propósito**
> con fines educativos (auditoría asistida por IA). **No es código de producción y no debe usarse como tal.**
> Las credenciales son placeholders documentados de AWS (no son reales).

Plataforma comercial de ejemplo (pagos, clientes y catálogo).

## Cómo usar este repo en la clase

Eres parte de un comité de riesgos. Audita este repositorio con tres miradas independientes:

1. **Seguridad & cadena de suministro** — secretos, dependencias, CI/CD.
2. **Privacidad, datos & cumplimiento** — PII, licencias, retención.
3. **Gobernanza de IA & calidad** — prompt-injection, claves de modelos, bus-factor.

Pídele a Claude o a GitHub Copilot: *"Audita este repositorio y reporta hallazgos por severidad con archivo:línea y remediación"*. Compara tu informe con el veredicto de la actividad reina.

## Carpeta `n8n/` — la misma orquesta, en n8n

La carpeta [`n8n/`](n8n/) trae dos workflows importables (flujo lineal y flujo paralelo con 3 auditores + consolidador) para replicar el experimento de la clase en n8n con una API key gratis de Groq. Ver su [README](n8n/README.md).

## Carpeta `copilot-studio/` — para la práctica en Microsoft Copilot Studio

La base de conocimiento (Knowledge) de Copilot Studio no acepta archivos `.js` ni `.env`, así que la carpeta [`copilot-studio/`](copilot-studio/) contiene **copias de los archivos a auditar, ya renombradas** (ej. `assistant.js` → `assistant.js.txt`).

Sube a Knowledge **todos los archivos de esa carpeta, tal cual** — y nada más. ¿Ruta aún más rápida? El archivo [`copilot-studio/evidencia-completa.md`](copilot-studio/evidencia-completa.md) concatena toda la evidencia en un solo documento: sube solo ese archivo, o copia su contenido y pégalo directamente en el chat del agente. En particular, **no subas este README**: contiene pistas sobre los hallazgos y sesgaría al auditor (no le des la hoja de respuestas).
