import { Module } from '@nestjs/common';
import { CommentService } from './services/comment.service';
import { CommentController } from './controllers/comment.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { Connection } from 'mongoose';
import { CommentSchema } from './schemas/comment.schema';
import { PostModule } from '../post/post.module';


@Module({
  imports: [DatabaseModule, PostModule],
  providers: [
    CommentService,
    {
      provide: 'COMMENT_MODEL',
      useFactory: (connection: Connection) => connection.model('comments', CommentSchema),
      inject: ['DATABASE_CONNECTION'],
    },
  ],
  controllers: [CommentController],
  exports: [CommentService]
})
export class CommentModule {}
