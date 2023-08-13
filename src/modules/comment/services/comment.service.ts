import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { PrismaService } from '../../../modules/prisma/services/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async postComment(comment: CreateCommentDto){
    const commentData = await this.prismaService.comment.create({
      data: comment
    })

    return commentData
  }
}
