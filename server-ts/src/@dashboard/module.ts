import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";

import {  } from "@sharedTypes/interfaces";
import { AuthMiddleware, LoggingService } from "@common";

import { DashboardV1Controller } from "./controller";
import { DashboardService } from "./service";

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: 'gallery', schema: GallerySchema }]),
    // MongooseModule.forFeature([{ name: 'profile', schema: ProfileSchema }]),
    // MongooseModule.forFeature([{ name: 'studio', schema: StudioSchema }]),
  ],
  controllers: [DashboardV1Controller],
  providers: [
    JwtService,
    DashboardService,
    AuthMiddleware,
    LoggingService
  ],
  exports: [
    DashboardService
  ]
})
export class DashboardModule { }
