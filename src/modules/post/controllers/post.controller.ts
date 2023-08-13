import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { GetAllPostsQueryDto } from '../dto/get-all-posts-query.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  post(@Body() createPostDto: CreatePostDto) {
    return this.postService.post(createPostDto);
  }

  @Get()
  getAllPosts(
    @Query('limit', new ParseIntPipe()) limit: number,
    @Query('current', new ParseIntPipe()) current: number,
  ) {
    return this.postService.getAllPosts({ current, limit });
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
