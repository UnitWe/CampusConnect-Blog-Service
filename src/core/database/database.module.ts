import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/database.providers';
import { DatabaseService } from './services/database.service';

@Module({
  providers: [...databaseProviders, DatabaseService],
  exports: [...databaseProviders],
})
export class DatabaseModule {}