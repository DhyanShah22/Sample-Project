import { Request, Response } from 'express';
import { createPost, getPostCount, searchPosts } from '../services/postService';
import { getCache, setCache } from '../utils/redisCache';

export const createPostController = async (req: Request, res: Response) => {
  try {
    const post = await createPost(req.body);
    res.status(201).send(post);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getPostCountController = async (req: Request, res: Response) => {
  try {
    const count = await getPostCount();
    res.status(200).send({ count });
  } catch (err) {
    res.status(400).send(err);
  }
};

export const searchPostsController = async (req: Request, res: Response) => {
  const query = req.query.q;
  const cacheKey = `search:${query}`;

  try {
    const cachedResults = await getCache(cacheKey);
    if (cachedResults) {
      return res.status(200).send(JSON.parse(cachedResults));
    }

    const posts = await searchPosts(query as string);
    await setCache(cacheKey, JSON.stringify(posts), 3600); // Set cache expiry time to 1 hour
    res.status(200).send(posts);
  } catch (err) {
    res.status(400).send(err);
  }
};
