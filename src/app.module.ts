import { Module } from '@nestjs/common';
import { BlogModule } from './modules/blog/blog.module';
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [BlogModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
