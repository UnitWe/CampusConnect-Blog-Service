import { Types } from 'mongoose';
export class Comment {
    username: string
    content: string
    post_id: Types.ObjectId
}