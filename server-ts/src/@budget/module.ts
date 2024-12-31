import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";

import { Gallery, GallerySchema } from "@sharedTypes/interfaces";
import { AuthMiddleware, LoggingService } from "@common";

import { GalleryV1Controller } from "./controller";
import { GalleryService } from "./service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gallery.name, schema: GallerySchema }]),
  ],
  controllers: [GalleryV1Controller],
  providers: [
    JwtService,
    GalleryService,
    AuthMiddleware,
    LoggingService
  ],
  exports: [
    GalleryService
  ]
})
export class GalleryModule { }
