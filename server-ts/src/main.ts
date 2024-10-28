import { NestFactory } from '@nestjs/core';
import { RmqOptions, Transport } from '@nestjs/microservices';
import process from 'process';
import { json, urlencoded } from "express";
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';

import { LoggingInterceptor } from "./@common";

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Media Collection')
    .setDescription('Media Collection')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const whitelist = ['http://personal-front.nginx.local', 'http://nginx.local:4002', 'http://personal-api.nginx.local'];
  app.enableCors({
    origin: function (origin, callback) {
      // console.log("allowed cors for:", origin);
      callback(null, true);
      // if (whitelist.indexOf(origin) !== -1) {
      //   console.log("allowed cors for:", origin)
      //   callback(null, true)
      // } else {
      //   console.log("blocked cors for:", origin)
      //   callback(new Error('Not allowed by CORS'))
      // }
    },
    allowedHeaders: '*',
    methods: "OPTIONS,GET,PUT,POST,DELETE",
    credentials: true,
  });
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.use(json({ limit: '100mb' }));
  app.useStaticAssets(join(__dirname, '..', process.env.FILE_ROOT));
  app.use(urlencoded({ extended: true, limit: '100mb' }));
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

  app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://personal:personal@localhost:5672'],
      queue: process.env.COLLECTION_NAME,
      prefetchCount: 1,
      persistent: true,
      noAck: false,
      queueOptions: {
        durable: true,
      },
      socketOptions: {
        heartbeatIntervalInSeconds: 60,
        reconnectTimeInSeconds: 5,
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(process.env.PORT || 3000, function () {
    console.log('server started on ' + process.env.PORT);
  });
}
bootstrap();
