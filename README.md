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

## Carpeta `copilot-studio/` — para la práctica en Microsoft Copilot Studio

La base de conocimiento (Knowledge) de Copilot Studio no acepta archivos `.js` ni `.env`, así que la carpeta [`copilot-studio/`](copilot-studio/) contiene **copias de los archivos a auditar, ya renombradas** (ej. `assistant.js` → `assistant.js.txt`).

Sube a Knowledge **todos los archivos de esa carpeta, tal cual** — y nada más. En particular, **no subas este README**: contiene pistas sobre los hallazgos y sesgaría al auditor (no le des la hoja de respuestas).
