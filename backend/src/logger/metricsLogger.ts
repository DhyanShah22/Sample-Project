import { createLogger, format, transports } from 'winston';
const { combine, timestamp, json } = format;

const metricsLogger = createLogger({
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new transports.File({ filename: 'metrics.log' })
  ]
});

export default metricsLogger;
