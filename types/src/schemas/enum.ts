import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class Enums {
  @Prop({ type: String, default: '' })
  enumType: string;
  @Prop({ type: String, default: '' })
  name: string;
  @Prop({ type: String, default: '' })
  description: string;
  @Prop({ type: Number })
  order: number;
  @Prop({ type: String, default: '' })
  image: string;
}

export const EnumsSchema = SchemaFactory.createForClass(Enums);
