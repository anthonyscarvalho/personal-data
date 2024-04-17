import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schema/user.dto';
import { TokenUtility } from '../utility/token.utility';
import { JwtService } from '@nestjs/jwt';
import AuthMiddleware from '../middleware/auth.middleware';
import { ImageService } from "../services/image/image.service";
import { LoggingService } from "@common";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [
    JwtService,
    TokenUtility,
    UserService,
    AuthMiddleware,
    ImageService,
    LoggingService
  ],
})
export class UserModule {}
