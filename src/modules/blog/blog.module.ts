import { Module } from '@nestjs/common';
import { BlogController } from './controllers/blog.controller';
import { BlogService } from './services/blog.service';
import { DatabaseModule } from '../../core/database/database.module';
import { Connection } from 'mongoose';
import { PostSchema } from './schemas/post.schema';
import { CommentSchema } from './schemas/comment.schema';

@Module({
  imports: [DatabaseModule],
  controllers: [BlogController],
  providers: [
    BlogService,
    {
      provide: 'POST_MODEL',
      useFactory: (connection: Connection) => connection.model('posts', PostSchema),
      inject: ['DATABASE_CONNECTION'],
    },
    {
      provide: 'COMMENT_MODEL',
      useFactory: (connection: Connection) => connection.model('comments', CommentSchema),
      inject: ['DATABASE_CONNECTION'],
    },
  ]
})
export class BlogModule {}
