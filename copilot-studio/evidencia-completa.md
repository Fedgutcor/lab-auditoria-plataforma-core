# Evidencia completa para auditoría — plataforma-core — Plataforma comercial de ejemplo (pagos, clientes y catalogo)

Este archivo concatena TODO el código y la configuración del proyecto a auditar,
con la ruta original de cada archivo. Es el único documento que necesitas darle a un auditor.

## Archivo: config/prod.env

```
# Configuración de producción (EJEMPLO VULNERABLE)
# NO USAR EN PRODUCCIÓN — credenciales de ejemplo de la documentación de AWS
APP_ENV=production
APP_PORT=8080
DB_HOST=db.internal.miorg.com
DB_PORT=5432
DB_NAME=plataforma
DB_USER=app
DB_PASSWORD=changeme
LOG_LEVEL=debug
# Hallazgo: clave de acceso commiteada al repositorio (debería estar en un gestor de secretos)
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

## Archivo: package.json

```
{
  "name": "plataforma-core",
  "version": "1.0.0",
  "description": "Plataforma comercial de ejemplo — INTENCIONALMENTE VULNERABLE para auditoria",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "test": "echo \"sin tests\" && exit 0"
  },
  "author": "miorg",
  "license": "UNLICENSED",
  "dependencies": {
    "express": "4.18.2",
    "pg": "8.7.1",
    "openai": "4.20.0",
    "jsonwebtoken": "9.0.0",
    "lodash": "4.17.20",
    "axios": "1.6.0",
    "dotenv": "16.0.3",
    "winston": "3.8.2",
    "helmet": "7.0.0",
    "cors": "2.8.5",
    "multer": "1.4.5",
    "qrcode-terminal": "0.12.0",
    "chart.js": "4.4.0",
    "moment": "2.29.4",
    "node-forge": "1.3.1",
    "readline-sync": "1.4.10",
    "left-pad": "1.3.0",
    "request": "2.88.2",
    "gpl-licensed-lib": "2.1.0"
  }
}
```

## Archivo: .github/workflows/deploy.yml

```
name: deploy
on:
  # Hallazgo: despliegue lanzado a mano, sin gates de revision ni aprobacion por pares
  workflow_dispatch:
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # Hallazgo: accion de terceros sin fijar por SHA (tag movil = riesgo de supply chain)
      - uses: some-vendor/deploy-action@main
        with:
          token: ${{ secrets.DEPLOY_TOKEN }}
      - run: echo "desplegando a produccion..."
```

## Archivo: src/index.js

```
const express = require('express');
const { requestLogger } = require('./middleware/logger');
const { responder } = require('./agents/assistant');

const app = express();
app.use(express.json());
app.use(requestLogger);

app.post('/asistente', async (req, res) => {
  const respuesta = await responder(req.body.pregunta, req.body.pedido);
  res.json({ respuesta });
});

app.listen(process.env.APP_PORT || 8080);
```

## Archivo: src/agents/assistant.js

```
const client = require('../ai/client');

// Asistente que responde preguntas de clientes sobre sus pedidos
async function responder(preguntaUsuario, contextoPedido) {
  // Hallazgo: input del usuario concatenado directamente al prompt del LLM (prompt-injection)
  const prompt = 'Eres el asistente de miorg. Contexto del pedido: ' + JSON.stringify(contextoPedido)
    + '. Responde a esto: ' + preguntaUsuario;
  const r = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }]
  });
  return r.choices[0].message.content;
}

module.exports = { responder };
```

## Archivo: src/ai/client.js

```
const OpenAI = require('openai');

// Hallazgo: clave de API del modelo hardcodeada en el codigo fuente
const client = new OpenAI({
  apiKey: 'sk-proj-EJEMPLO-CLAVE-FALSA-NO-USAR-EN-PRODUCCION'
});

module.exports = client;
```

## Archivo: src/middleware/logger.js

```
const winston = require('winston');

const logger = winston.createLogger({
  level: 'debug',
  transports: [new winston.transports.Console()]
});

// Middleware de logging de requests
function requestLogger(req, res, next) {
  // Hallazgo: se registra el cuerpo completo del request, incluyendo PII (cedulas, correos, tarjetas)
  logger.info('REQUEST', { method: req.method, url: req.url, headers: req.headers, body: req.body });
  next();
}

module.exports = { logger, requestLogger };
```

## Archivo: tests/fixtures/users.json

```
[
  { "id": 1, "nombre": "Ana Martínez", "cedula": "52123456", "email": "ana.martinez@ejemplo.com", "telefono": "3104567890" },
  { "id": 2, "nombre": "Carlos Rojas",  "cedula": "80456789", "email": "carlos.rojas@ejemplo.com", "telefono": "3209876543" },
  { "id": 3, "nombre": "Lucía Gómez",   "cedula": "41098765", "email": "lucia.gomez@ejemplo.com",  "telefono": "3151234567" }
]
```
