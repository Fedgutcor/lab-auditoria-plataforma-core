const OpenAI = require('openai');

// Hallazgo: clave de API del modelo hardcodeada en el codigo fuente
const client = new OpenAI({
  apiKey: 'sk-proj-EJEMPLO-CLAVE-FALSA-NO-USAR-EN-PRODUCCION'
});

module.exports = client;
