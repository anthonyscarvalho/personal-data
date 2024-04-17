import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { join } from 'path';

import { ProfileModule } from '@profiles';
import { MediaModule } from '@media';
import { GalleryModule } from '@galleries';
import { EnumsModule } from '@enums';
import { LoggingService } from '@common';

import { MongodbConfigService } from "./services";

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
      renderPath: process.env.FILE_ROOT,
    }),
    // JwtModule.register({ secret: process.env.JWT_SECRET }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongodbConfigService,
    }),
    // UserModule,
    ProfileModule,
    MediaModule,
    GalleryModule,
    EnumsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
