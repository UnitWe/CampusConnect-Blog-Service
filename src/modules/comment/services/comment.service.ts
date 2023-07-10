import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Post } from '../../../modules/post/interfaces/post.interface';

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_MODEL') private commentModel: Model<Comment>,
    @Inject('POST_MODEL') private postModel: Model<Post>,
  ) {}

  async postComment(comment: CreateCommentDto): Promise<Comment> {
    const createdComment = new this.commentModel(comment);

    let post = await this.postModel.findById(comment.post_id);
    let newComments = post['comments'];
    newComments.push(createdComment._id);
    post['comments'] = newComments;
    await post.save();

    return createdComment.save();
  }
}
