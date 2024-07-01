import express from 'express';
import { postRoutes } from './routes/postRoutes'; 
import helmet from 'helmet';
import morgan from 'morgan';
import { collectMetrics, metricsEndpoint } from './middlewares/metrics'; 
export const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(collectMetrics);
app.get('/metrics', metricsEndpoint);

app.use(express.json());
app.use('/posts', postRoutes);
