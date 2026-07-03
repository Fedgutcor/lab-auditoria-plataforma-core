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
