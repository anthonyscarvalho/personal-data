import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnumsController } from './enums.controller';
import { TokenUtility } from '../utility/token.utility';
import { JwtService } from '@nestjs/jwt';
import AuthMiddleware from '../middleware/auth.middleware';
import { ImageService } from "../services/image/image.service";
import { LoggingService } from "../@common/services/log.service";
import { EnumsSchema, Enums } from 'schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Enums.name, schema: EnumsSchema }]),
  ],
  controllers: [EnumsController],
  providers: [
    JwtService,
    TokenUtility,
    EnumsController,
    AuthMiddleware,
    ImageService,
    LoggingService
  ],
})
export class EnumsModule { }
