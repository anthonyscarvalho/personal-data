import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";

import { RESPONSE_MESSAGES } from "@sharedTypes/enums";
import { ConsumerRequest } from "@sharedTypes/interfaces";
import { ConsumerLogs } from "@sharedTypes/schemas";
import { CommonService } from "@common";

@Injectable()
export class ConsumerService extends CommonService {
  private client: ClientProxy;

  constructor(
    // @InjectModel(Media.name) private databaseModel: Model<Media>,
    // @InjectModel(Gallery.name) private galleryModel: Model<Gallery>,
    @InjectModel('ConsumerLogs') private consumerLogs: Model<ConsumerLogs>,
  ) {
    super();
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://media:media@localhost:5672'],
        queue: process.env.COLLECTION_NAME,
      },
    });
  }

  async sendNotification(type: string, notification: ConsumerRequest): Promise<void> {
    return await this.client.emit(type, notification).toPromise();
  }

  async logConsumerRecord(pModuleType, pConsumerType, pModuleId, pConsumerValue: any, pProcessTime, pMessages) {
    const body = new ConsumerLogs({
      moduleType: pModuleType,
      consumerType: pConsumerType,
      moduleId: pModuleId,
      consumerValue: pConsumerValue,
      processTime: pProcessTime,
      messages: pMessages,
    });
    return this.createRecord(body, this.consumerLogs);
  }
}
