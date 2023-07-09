import { Types } from 'mongoose';

export class CreatePostDto {
    author: string
    title: string
    content: string
    published?: boolean
    tags?: string[]
}