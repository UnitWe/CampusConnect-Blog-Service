import { Types } from 'mongoose';
export class Comment {
    authorId: Types.ObjectId
    content: string
    postId: Types.ObjectId
}