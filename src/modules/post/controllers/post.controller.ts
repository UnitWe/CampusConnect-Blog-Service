import { Body, Controller, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { getOneDto } from '../dto/get-one-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  post(@Body() createPostDto: CreatePostDto) {
    return this.postService.post(createPostDto);
  }

  @HttpCode(200)
  @Post()
  getAllPosts(@Body() getOneDto: getOneDto) {
    return this.postService.getAllPosts(getOneDto);
  }

  @Get('author/:id')
  getAllPostPerAuthor(@Param('id') id: string) {
    return this.postService.getAllPostPerAuthor(id);
  }

  @Get(':id')
  getOnePost(@Param('id') id: string) {
    return this.postService.getOnePost(id);
  }

  @Patch(':id/like')
  updateLikeInAPost(@Param('id') id: string) {
    return this.postService.updateLikes(id);
  }
}
