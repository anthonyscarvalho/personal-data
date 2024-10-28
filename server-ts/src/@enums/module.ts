import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";

import { EnumsSchema, Enums } from "@sharedTypes/interfaces";
import { AuthMiddleware } from "@common";

import { EnumsController } from "./controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Enums.name, schema: EnumsSchema }]),
  ],
  controllers: [EnumsController],
  providers: [
    JwtService,
    EnumsController,
    AuthMiddleware,
  ],
})
export class EnumsModule { }
