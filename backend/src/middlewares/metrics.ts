import client from 'prom-client';
import metricsLogger from '../logger/metricsLogger'; // Adjust the path as necessary
import { Request, Response, NextFunction } from 'express';

const register = new client.Registry();

const requestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const responseTimeHistogram = new client.Histogram({
  name: 'http_response_time_seconds',
  help: 'HTTP response time in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 1.5, 2, 5] // Define time buckets
});

register.registerMetric(requestCounter);
register.registerMetric(responseTimeHistogram);

const collectMetrics = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    requestCounter.labels(req.method, req.url, res.statusCode.toString()).inc();
    responseTimeHistogram.labels(req.method, req.url, res.statusCode.toString()).observe(duration);

    metricsLogger.info({
      method: req.method,
      route: req.url,
      status_code: res.statusCode,
      duration: duration
    });
  });

  next();
};

const metricsEndpoint = async (req: Request, res: Response): Promise<void> => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
};

export { collectMetrics, metricsEndpoint };
