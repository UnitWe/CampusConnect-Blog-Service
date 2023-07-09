import { Model, Types } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Post } from '../interfaces/post.interface';
import { Comment } from '../interfaces/comment.interface';
import { CreatePostDto } from '../dto/create-post.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { getOneDto } from '../dto/get-one-post.dto';

//Service é responsável por conter a lógica
@Injectable()
export class BlogService {
  constructor(
    @Inject('POST_MODEL') private postModel: Model<Post>,
    @Inject('COMMENT_MODEL') private commentModel: Model<Comment>,
  ) {}

  async post(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async postComment(comment: CreateCommentDto): Promise<Comment> {
    const createdComment = new this.commentModel(comment);

    let post = await this.postModel.findById(comment.post_id);
    let newComments = post['comments'];
    newComments.push(createdComment._id);
    post['comments'] = newComments;
    await post.save();

    return createdComment.save();
  }

  async getAllPosts(getOneDto: getOneDto) {
    const { currentPage, limit } = getOneDto;
    const skip = (currentPage - 1) * limit;
    const posts = await this.postModel
      .find()
      .skip(skip)
      .limit(limit)
      .select('title content author')
      .exec();

    return posts;
  }

  async getAllPostPerAuthor(author: String): Promise<{}> {
    const post = await this.postModel
      .find({ author: author })
      .select('-comments -content') // não to mandando o array de comentários e o conteudo do post
      .exec();
    const data = {
      data: post,
    };
    return data;
  }

  async getOnePostAuthor(author: String, id: String): Promise<{}> {
    const post = await this.postModel.findById(id).exec();

    return post;
  }
}
