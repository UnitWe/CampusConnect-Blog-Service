import * as dotenv from 'dotenv'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.useBodyParser('json');
  app.enableCors();
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
