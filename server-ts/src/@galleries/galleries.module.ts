import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GalleryV1Controller } from './galleries.controller';
import { GalleryService } from './galleries.service';
import { Gallery, GallerySchema } from './schema/gallery.dto';
import { TokenUtility } from '../utility/token.utility';
import { JwtService } from '@nestjs/jwt';
import AuthMiddleware from '../middleware/auth.middleware';
import { ImageService } from "../services/image/image.service";
import { LoggingService } from "../@common/services/log.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'gallery', schema: GallerySchema }]),
  ],
  controllers: [GalleryV1Controller],
  providers: [
    JwtService,
    TokenUtility,
    GalleryService,
    AuthMiddleware,
    ImageService,
    LoggingService
  ],
})
export class GalleryModule { }
