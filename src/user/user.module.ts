import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.providers';
import { APP_FILTER } from '@nestjs/core';
import { DuplicateKeyFilter } from './filters/duplicate-key.filter';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService, 
    ...userProviders,
    {
      provide: APP_FILTER,
      useClass: DuplicateKeyFilter,
    }
  ],
  exports: [
    ...userProviders
  ]
})
export class UserModule {}
