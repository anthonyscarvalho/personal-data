import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GalleryDocument = HydratedDocument<Gallery>;

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class Gallery {
  @Prop({ required: true })
  name: string;
  @Prop()
  country: string;
  @Prop()
  date: string;
  @Prop()
  mainImage: string;
  @Prop()
  description: string;
  @Prop({ required: true })
  itemSlug: string;
  @Prop()
  studio: string;
  @Prop()
  galleryTotal: string;
  @Prop()
  profiles: string[];
  @Prop({
    type: String,
    enum: ['true', 'false']
  })
  canceled: string;
  @Prop()
  canceledDate: string;
}

const GallerySchema = SchemaFactory.createForClass(Gallery);

export { GallerySchema };

export const DefaultGalleryProjection = {
  name: 1,
  country: 1,
  date: 1,
  mainImage: 1,
  description: 1,
  itemSlug: 1,
  studio: 1,
  galleryTotal: 1,
  profiles: 1,
  canceled: 1,
  canceledDate: 1
};
