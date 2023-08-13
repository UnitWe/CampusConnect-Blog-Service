import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { CreateCommentDto } from '../dto/create-comment.dto';


@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService){}

    @Post()
    postComment(@Body() createCommentDto: CreateCommentDto) {
        return this.commentService.postComment(createCommentDto)
    }
}
