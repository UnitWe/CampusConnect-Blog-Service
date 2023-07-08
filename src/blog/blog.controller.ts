import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Types } from 'mongoose';
import { getOneDto } from './dto/get-one-post.dto';


@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}


    @Post('/create-post')
    post(@Body() createPostDto: CreatePostDto) {
        return this.blogService.post(createPostDto)
    }

    @Get('/get-all-post/:authorName')
    getAllPostPerAuthor(@Param('authorName') authorName:String) {
        return this.blogService.getAllPostPerAuthor(authorName)
    }

    @Get('/get-one-post/:authorName/:id')
    getOnePostPerAuthor(@Param('authorName') authorName: String, @Param('id') id:String) {

        return this.blogService.getOnePostAuthor(authorName, id)
    }

    @Post()
    getAllPosts(@Body() getOneDto:getOneDto) {
        return this.blogService.getAllPosts(getOneDto)
    }

    

    @Post('/create-comment')
    postComment(@Body() createCommentDto: CreateCommentDto) {
        return this.blogService.postComment(createCommentDto)
    }


}
