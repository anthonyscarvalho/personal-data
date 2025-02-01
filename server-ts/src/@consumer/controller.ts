import { Body, Headers, Controller, Post } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import sharp from 'sharp';
import { join as pathJoin } from "path";
import { performance } from "perf_hooks";

import { MODULE_TYPES } from "@sharedTypes/enums";
import { ConsumerRequest } from "@sharedTypes/interfaces";
import { DATE_HELPER } from "@sharedTypes/utils";
import { BaseController } from "@common";
import { ConsumerService } from "./service";
import { MyGateway } from "./gateway";

@ApiTags('Consumer')
@Controller('v1/consumer')
export class ConsumerV1Controller extends BaseController {
  imageProcessing = sharp();

  constructor(
    private readonly _moduleService: ConsumerService,
    private readonly messageGateway: MyGateway
  ) {
    super();
  }

  @Post('/create')
  async postView(@Headers() pHeaders: Headers, @Body() pRequest: ConsumerRequest) {
    const request = Object.assign({}, pRequest);
    request.actionType = 'create';
    await this._moduleService.sendNotification(`CREATE_${request.moduleType}`, request);
    return 'Notification sent to RabbitMQ';
  }

  @Post('/update')
  async updateView(@Headers() pHeaders: Headers, @Body() pRequest: ConsumerRequest) {
    const request = Object.assign({}, pRequest);
    await this._moduleService.sendNotification(`UPDATE_${request.moduleType}`, request);
    return 'Notification sent to RabbitMQ';
  }

  @EventPattern(`CREATE_${MODULE_TYPES.gallery}`)
  async handleCreateGalleries(
    @Payload() payload: ConsumerRequest,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    console.log(`CREATE_${MODULE_TYPES.gallery}`, payload);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      // await this.pspService.createCharge(payload);
    } catch (error) {
      console.log('error', error);
    }
    channel.ack(originalMsg);
  }

  @EventPattern(`CREATE_${MODULE_TYPES.studio}`)
  async handleCreateStudios(
    @Payload() payload: ConsumerRequest,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    console.log(`CREATE_${MODULE_TYPES.studio}`, payload);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      // await this.pspService.createCharge(payload);
    } catch (error) {
      console.log('error', error);
    }
    channel.ack(originalMsg);
  }

  @EventPattern(`CREATE_${MODULE_TYPES.profile}`)
  async handleCreateProfiles(
    @Payload() payload: ConsumerRequest,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    console.log(`CREATE_${MODULE_TYPES.profile}`, payload);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      // await this.pspService.createCharge(payload);
    } catch (error) {
      console.log('error', error);
    }
    channel.ack(originalMsg);
  }

  @EventPattern(`CREATE_${MODULE_TYPES.video}`)
  async handleCreateVideo(
    @Payload() payload: ConsumerRequest,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    console.log(`CREATE_${MODULE_TYPES.video}`, payload);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      // await this.pspService.createCharge(payload);
    } catch (error) {
      console.log('error', error);
    }
    channel.ack(originalMsg);
  }
}

function createFilePath(moduleType, entityId) {
  return pathJoin(__dirname, '..', '..', process.env.FILE_ROOT, moduleType, entityId);
}

function getPercentage(pValue1, pValue2) {
  return (pValue2 - pValue1) / (pValue1) * 100
}
