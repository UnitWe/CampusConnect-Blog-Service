import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { getOneDto } from '../dto/get-one-post.dto';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post('create')
    post(@Body() createPostDto: CreatePostDto) {
        return this.postService.post(createPostDto)
    }

    @Get(':authorName')
    getAllPostPerAuthor(@Param('authorName') authorName:String) {
        return this.postService.getAllPostPerAuthor(authorName)
    }

    @Get(':authorName/:id')
    getOnePostPerAuthor(@Param('authorName') authorName: String, @Param('id') id:String) {
        return this.postService.getOnePostAuthor(authorName, id)
    }

    @Post()
    getAllPosts(@Body() getOneDto: getOneDto) {
        return this.postService.getAllPosts(getOneDto)
    }

    @Patch(":postId/like")
    updateLikeInAPost(@Param('postId') postId: string){
        return this.postService.updateLikes(postId)
    }
}
