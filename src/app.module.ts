import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { HttpLoggerMiddleware } from './middlewares/http-logger.middleware';
import { RoomsModule } from './modules/rooms/rooms.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [ClientModule, PostModule, CommentModule, RoomsModule, PrismaModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
