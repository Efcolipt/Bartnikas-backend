import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
//import { join } from 'path';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //app.useStaticAssets(join(__dirname, '..', 'files'));
  app.use('/', express.static('files'));

  const config = app.get(ConfigService);
  const port = Number(config.get('APP_PORT'));
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
