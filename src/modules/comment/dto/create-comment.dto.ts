import { ObjectId } from "mongodb"

export class CreateCommentDto {
    username: string
    content: string
    post_id: ObjectId
}