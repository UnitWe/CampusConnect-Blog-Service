import { Types } from 'mongoose';

export class CreatePostDto {
    author: string
    title: string
    content: string
    reading_time: number
    published?: boolean
    tags?: string[]
}