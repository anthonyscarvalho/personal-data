import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { Injectable } from "@nestjs/common";

import { ConsumerRequest } from "@sharedTypes/interfaces";

@Injectable()
@Processor(process.env.COLLECTION_NAME)
export class RabbitMqConsumer {
  constructor() { }

  @Process('mediaCollection-job')
  async processNotificationJob(job: Job<ConsumerRequest>) {
    console.log('job', JSON.stringify(job));
    const notification = job.data;
    if (!notification) {
      console.error('Notification is undefined');
      return;
    }
    console.log('notification', JSON.stringify(notification));
    // await this.mailService.sendMail(notification);
    return notification;
  }
}
