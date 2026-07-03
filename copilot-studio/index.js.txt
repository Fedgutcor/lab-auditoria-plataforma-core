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
