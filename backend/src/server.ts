import express from 'express';
import mongoose from 'mongoose';
import { config } from './config';
import { authRoutes } from './routes/authRoutes';
import { postRoutes } from './routes/postRoutes'; // Named import
import { authMiddleware } from './middlewares/authMiddlewares';
import logger from './logger/logger'
import { log } from 'console';
const app = express();

app.use(express.json());

mongoose.connect(config.mongoUri)
  .then(() => {
    logger.info('Connected to MongoDB');
    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });
  })
  .catch(err => {
    logger.error('Failed to connect to MongoDB', err);
  });

app.use('/auth', authRoutes);
app.use('/posts', authMiddleware, postRoutes); // Protect post routes with auth middleware
