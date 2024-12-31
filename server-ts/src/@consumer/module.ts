import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";

import { Gallery, GallerySchema, Profile, ProfileSchema, Media, MediaSchema, ConsumerLogs, ConsumerLogsSchema } from "@sharedTypes/interfaces";
import { AuthMiddleware } from "@common";
import { GalleryService } from "@budget";

import { ConsumerV1Controller } from "./controller";
import { ConsumerService } from "./service";
import { RabbitMqConsumer } from "./rabbit-mq.consumer";
import { MyGateway } from "./gateway";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gallery.name, schema: GallerySchema }]),
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
    MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }]),
    MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }]),
    MongooseModule.forFeature([{ name: 'ConsumerLogs', schema: ConsumerLogsSchema }]),
  ],
  controllers: [
    ConsumerV1Controller
  ],
  providers: [
    JwtService,
    ConsumerService,
    AuthMiddleware,
    MyGateway,
    RabbitMqConsumer,
    GalleryService,
  ],
  exports: [
    ConsumerService
  ]
})
export class ConsumerModule { }
