import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import process from 'process';
import { json, urlencoded } from "express";
import { LoggingService } from "./@common/services/log.service";
import { NestExpressApplication } from '@nestjs/platform-express';
import { LoggingInterceptor } from "./interceptors/log.interceptor";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  // console.log(
  //   `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}`,
  // );
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Media Collection')
    .setDescription('Media Collection')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.use(json({ limit: '100mb' }));
  app.useStaticAssets(join(__dirname, '..', process.env.FILE_ROOT));
  app.use(urlencoded({ extended: true, limit: '100mb' }));
  await app.listen(process.env.PORT || 3000, function () {
    console.log('server started on ' + process.env.PORT);
  });
}
bootstrap();
