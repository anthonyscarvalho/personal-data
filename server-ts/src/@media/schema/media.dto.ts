import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MediaDocument = HydratedDocument<Media>;

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class Media {
  @Prop({ type: Object })
  imageMeta: Object;
  @Prop()
  contentType: string;
  @Prop()
  date: string;
  @Prop()
  documentType: string;
  @Prop()
  entityId: string;
  @Prop()
  fileSize: string;
  @Prop()
  moduleType: string;
  @Prop({ required: true })
  name: string;
  @Prop()
  year: string;
  @Prop()
  fileHash: string;
}

const MediaSchema = SchemaFactory.createForClass(Media);

export { MediaSchema };

export const DefaultMediaProjection = {
  imageMeta: 1,
  contentType: 1,
  date: 1,
  documentType: 1,
  entityId: 1,
  fileSize: 1,
  moduleType: 1,
  name: 1,
  year: 1,
  fileHash: 1,
};
