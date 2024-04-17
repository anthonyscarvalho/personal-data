import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaV1Controller } from './media.controller';
import { MediaService } from './media.service';
import { Media, MediaSchema } from './schema/media.dto';
import { TokenUtility } from '../utility/token.utility';
import { JwtService } from '@nestjs/jwt';
import AuthMiddleware from '../middleware/auth.middleware';
import { ImageService } from "../services/image/image.service";
import { LoggingService } from "../@common/services/log.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'media', schema: MediaSchema }]),
  ],
  controllers: [MediaV1Controller],
  providers: [
    JwtService,
    TokenUtility,
    MediaService,
    AuthMiddleware,
    ImageService,
    LoggingService
  ],
})
export class MediaModule { }
