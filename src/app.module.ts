import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { RoomsModule } from './modules/rooms/rooms.module';

@Module({
  imports: [DatabaseModule, PostModule, CommentModule, RoomsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
