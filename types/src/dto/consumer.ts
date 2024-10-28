import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class Consumer {
  @Prop({ required: true })
  name: string;
  @Prop()
  country: string;
  @Prop()
  openedDate: string;
  @Prop()
  itemSlug: string;
  @Prop()
  description: string;
  @Prop()
  url: string;
  @Prop()
  parent: string;
  @Prop()
  mainImage: string;
  @Prop({
    type: String,
    enum: ['true', 'false']
  })
  canceled: string;
  @Prop()
  canceledDate: string;
}

export const ConsumerSchema = SchemaFactory.createForClass(Consumer);
