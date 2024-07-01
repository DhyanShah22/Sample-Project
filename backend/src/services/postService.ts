import { Post, IPost } from '../models/postModel';
import { sendToQueue } from '../utils/rabbitMQ';

const createPost = async (postData: Partial<IPost>) => {
  const post = new Post(postData);
  await post.save();
  await sendToQueue(JSON.stringify(post));
  return post;
};

const getPostCount = async () => {
  return await Post.countDocuments();
};

const searchPosts = async (query: string) => {
  const regex = new RegExp(query, 'i');
  return await Post.find({ $or: [{ title: regex }, { message: regex }, { context: regex }] });
};

export { createPost, getPostCount, searchPosts };
