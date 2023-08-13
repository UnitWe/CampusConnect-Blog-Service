import { IsNotEmpty, IsString } from "class-validator"
import { IsObjectId } from "../../../decorators/is-object-id.decorator"
import { RecordExists } from "../../../decorators/record-exists.decorator"

export class CreateCommentDto {
    @RecordExists({model: "user", propertyName: "id"})
    @IsObjectId()
    @IsString()
    @IsNotEmpty()
    author_id: string

    @IsString()
    @IsNotEmpty()
    content: string

    @RecordExists({model: "post", propertyName: "id"})
    @IsObjectId()
    @IsString()
    @IsNotEmpty()
    post_id: string
}