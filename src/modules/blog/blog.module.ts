import { Module } from '@nestjs/common';
import { BlogController } from './controllers/blog.controller';
import { BlogService } from './services/blog.service';
import { DatabaseModule } from '../../core/database/database.module';
import { postProviders, commentProviders } from './providers/blog.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BlogController],
  providers: [
    BlogService,
    ...postProviders,
    ...commentProviders
  ]
})
export class BlogModule {}
