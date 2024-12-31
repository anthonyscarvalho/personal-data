import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BullModule } from '@nestjs/bull';
import process from 'process';
import { join as pathJoin } from 'path';

import { MongodbConfigService } from '@common';
import { ConsumerModule } from '@consumer';
import { DashboardModule } from '@dashboard';
import { EnumsModule } from '@enums';
import { GalleryModule } from '@budget';

import * as config from './config/config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: pathJoin(__dirname, '..'),
      renderPath: config.config.global.FILE_ROOT,
    }),
    // JwtModule.register({ secret: process.env.JWT_SECRET }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongodbConfigService,
    }),
    BullModule.forRoot({
      // redis: {
      //   host: 'localhost',
      //   port: 6379,
      // }
    }),
    // UserModule,
    ConsumerModule,
    DashboardModule,
    EnumsModule,
    GalleryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
