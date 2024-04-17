import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileV1Controller } from './profile.controller';
import { ProfileService } from './profile.service';
import { Profile, ProfileSchema } from './schema/profile.dto';
import { TokenUtility } from '../utility/token.utility';
import { JwtService } from '@nestjs/jwt';
import AuthMiddleware from '../middleware/auth.middleware';
import { ImageService } from "../services/image/image.service";
import { LoggingService } from "../@common/services/log.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'profile', schema: ProfileSchema }]),
  ],
  controllers: [ProfileV1Controller],
  providers: [
    JwtService,
    TokenUtility,
    ProfileService,
    AuthMiddleware,
    ImageService,
    LoggingService
  ],
})
export class ProfileModule { }
