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
