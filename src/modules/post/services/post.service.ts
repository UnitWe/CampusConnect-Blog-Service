import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { getOneDto } from '../dto/get-one-post.dto';
import { Post } from '../interfaces/post.interface';
import { Model } from 'mongoose';

@Injectable()
export class PostService {
  constructor(@Inject('POST_MODEL') private postModel: Model<Post>) {}

  async post(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async updateLikes(postId: string) {
    try {
      const postData = await this.postModel.findById(postId);

      await postData.updateOne({ $inc: { likes: 1 } });
    } catch (error) {
      throw new NotFoundException(
        'Não foi possivel encontrar um post com esse id',
      );
    }
  }

  async getAllPosts(getOneDto: getOneDto) {
    const { currentPage, limit } = getOneDto;
    const skip = (currentPage - 1) * limit;
    const posts = await this.postModel
      .find()
      .skip(skip)
      .limit(limit)
      .select('title author likes createdAt')
      .sort('-createdAt')
      .exec();

    let data = {
      data: posts,
    };

    return data;
  }

  async getAllPostPerAuthor(author: String): Promise<{}> {
    const post = await this.postModel
      .find({ author: author })
      .select('-content -comments')
      .exec();
    const data = {
      data: post,
    };
    return data;
  }

  async getOnePostAuthor(author: String, id: String): Promise<{}> {
    const post = await this.postModel.findById(id).populate('comments').exec();
    let data = {
      data: post,
    };

    return data;
  }
}
