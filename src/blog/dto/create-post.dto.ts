import { Types } from 'mongoose';

export class CreatePostDto {
    authorId: Types.ObjectId
    authorName: string
    title: string
    content: string
    tags?: string[]
}