import { Types } from 'mongoose';
export class CreateCommentDto {
    username: string
    content: string
    post_id: Types.ObjectId
}