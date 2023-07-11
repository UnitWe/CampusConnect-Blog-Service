import { Types } from 'mongoose';
export interface Post {
    title: string
    author: string;
    content: string;
    reading_time: number;
    tags?: string[];
    likes: number;
    comments: Types.ObjectId[];
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
}