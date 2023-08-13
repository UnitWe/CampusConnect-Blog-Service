//@ts-nocheck
import { Transform} from "class-transformer"
import { IsInt, IsNotEmpty } from "class-validator"

export class GetAllPostsQueryDto {
    @IsInt()
    @IsNotEmpty()
    limit: number
    
    @IsInt()
    @IsNotEmpty()
    current: number
}