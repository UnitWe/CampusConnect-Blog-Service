import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { getOneDto } from '../dto/get-one-post.dto';
import { Post } from '../interfaces/post.interface';
import { Model } from 'mongoose';
import { validObjectId } from '../../../utils/common';

@Injectable()
export class PostService {

  logger: Logger

  constructor(@Inject('POST_MODEL') private postModel: Model<Post>) {
    this.logger = new Logger()
  }

  async post(createPostDto: CreatePostDto): Promise<Post> {
    try {
      const createdPost = new this.postModel(createPostDto);
      return createdPost.save();
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(`Um erro ocorreu ao tentar registrar: ${error.message}`)
    }
  }

  async updateLikes(postId: string) {
    validObjectId(postId);
    const postData = await this.postModel.findById(postId);

    if(!postData){
      throw new NotFoundException('Não foi possivel encontrar um post com esse id')
    }

    try {
      await postData.updateOne({ $inc: { likes: 1 } });
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(`Um erro ocorreu ao tentar atualizar: ${error.message}`);
    }
  }

  async getAllPosts(getOneDto: getOneDto) {
    const { current_page, limit } = getOneDto;
    const skip = (current_page - 1) * limit;
    const posts = await this.postModel.aggregate([
      {
        $sort: { createdAt: -1 }
      },
      {
        $skip: skip
      },
      {
        $limit: limit
      },
      {
        $addFields: {
          commentsCount: { $size: "$comments" }
        }
      },
      {
        $project: {
          title: 1,
          author: 1,
          likes: 1,
          createdAt: 1,
          commentsCount: 1,
          tags: 1,
        }
      }
    ]).exec();
    
    const countPosts = await this.postModel.count().exec();

    if(!(posts.length > 0)){
      throw new NotFoundException('Não foi possivel encontrar nenhum post')
    }

    let data = {
      totalItems: countPosts,
      totalPages: Math.ceil(countPosts / limit),
      current: current_page,
      limit: limit,
      data: posts,
    };

    return data;
  }

  async getAllPostPerAuthor(author: String): Promise<{}> {
    const post = await this.postModel.aggregate([
      {
        $match:{
          author: author
        }
      },
      {
        $addFields: {
          commentsCount: { $size: "$comments" }
        }
      },
      {
        $project: {
          title: 1,
          author: 1,
          likes: 1,
          createdAt: 1,
          comments: 1,
          commentsCount: 1
        }
      }
    ]).exec();

    if(!(post.length > 0)){
      throw new NotFoundException('Não foi possivel encontrar nenhum post')
    }
    
    const data = {
      data: post,
    };
    return data;
  }

  async getOnePostAuthor(authorName: String, id: string): Promise<{}> {
    validObjectId(id);

    const post = await this.postModel.findById(id).populate('comments').exec();
    
    if(!post){
      throw new NotFoundException('Não foi possivel encontrar um post com esse id')
    }

    const { _id, title, author, content, tags, likes, reading_time, comments, createdAt, updatedAt, published } = post
    
    const commentsCount = comments.length
    
    let data = {
      data: {
        _id,
        title,
        author, 
        content, 
        tags,
        likes,
        reading_time, 
        comments, 
        createdAt, 
        updatedAt, 
        published,
        commentsCount: commentsCount
      }
    };

    return data;
  }
}
