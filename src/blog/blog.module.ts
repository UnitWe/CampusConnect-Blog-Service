import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { DatabaseModule } from 'src/database/database.module';
import { postProviders, commentProviders } from './blog.providers';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [BlogController],
  providers: [
    BlogService,
    ...postProviders,
    ...commentProviders
  ]
})
export class BlogModule {}
