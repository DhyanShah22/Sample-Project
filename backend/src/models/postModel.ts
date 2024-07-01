import { Schema, model, Document } from 'mongoose';

export interface IPost extends Document {
  timestamp: Date;
  title: string;
  message: string;
  context: string;
  tags: string[];
  location: string;
  images: string[];
  externalLinks: string[];
  numLikes: number;
  numBookmarks: number;
  numViews: number;
}

const postSchema = new Schema<IPost>({
  timestamp: { type: Date, default: Date.now },
  title: { type: String, required: true },
  message: { type: String, required: true },
  context: { type: String, required: true },
  tags: { type: [String], required: true },
  location: { type: String, required: true },
  images: { type: [String], required: true },
  externalLinks: { type: [String], required: true },
  numLikes: { type: Number, default: 0 },
  numBookmarks: { type: Number, default: 0 },
  numViews: { type: Number, default: 0 }
});

export const Post = model<IPost>('Post', postSchema);
