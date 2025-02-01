import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: 'consumerLogs',
})
export class ConsumerLogs {
  @Prop({ type: Date })
  date: Date;
  @Prop({ type: String })
  moduleType: string;
  @Prop({ type: String })
  consumerType: string;
  @Prop({ type: String })
  moduleId: string;
  @Prop({ type: Object })
  consumerValue: object;
  @Prop({ type: String })
  processTime: string;
  @Prop({ type: Array })
  messages: any[];

  constructor(pModel = null) {
    this.date = new Date();
    this.moduleType = pModel?.moduleType || null;
    this.consumerType = pModel?.consumerType || null;
    this.moduleId = pModel?.moduleId || null;
    this.consumerValue = pModel?.consumerValue || null;
    this.processTime = pModel?.processTime || null;
    this.messages = pModel?.messages || null;
  }
}

export const ConsumerLogsSchema = SchemaFactory.createForClass(ConsumerLogs);
