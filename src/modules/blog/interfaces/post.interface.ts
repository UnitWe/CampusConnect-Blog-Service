import { Types } from 'mongoose';
export interface Post {
    title: string
    authorId: Types.ObjectId
    content: string
    tags?: string[]
    likes: number
    published: boolean;
    createdAt: Date;
}