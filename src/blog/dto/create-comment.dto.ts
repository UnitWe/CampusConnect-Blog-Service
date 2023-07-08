import { Types } from 'mongoose';
export class CreateCommentDto {
    user: String
    content: string
    postId: Types.ObjectId
}