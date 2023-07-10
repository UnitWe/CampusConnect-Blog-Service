import { Module } from '@nestjs/common';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';
import { Connection } from 'mongoose';
import { PostSchema } from './schemas/post.schema';
import { DatabaseModule } from '../../core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [
    PostService,
    {
      provide: 'POST_MODEL',
      useFactory: (connection: Connection) => connection.model('posts', PostSchema),
      inject: ['DATABASE_CONNECTION'],
    }
  ],
  exports: [
    PostService,
    {
      provide: 'POST_MODEL',
      useFactory: (connection: Connection) => connection.model('posts', PostSchema),
      inject: ['DATABASE_CONNECTION'],
    }]
})
export class PostModule {}
