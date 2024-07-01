import { Router } from 'express';
import { createPostController, getPostCountController, searchPostsController } from '../controllers/postController';

const router = Router();

router.post('/', createPostController);
router.get('/count', getPostCountController);
router.get('/search', searchPostsController);

export { router as postRoutes };
