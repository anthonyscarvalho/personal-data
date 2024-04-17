import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EnumsDocument = HydratedDocument<Enums>;

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

const EnumsSchema = SchemaFactory.createForClass(Enums);
// EnumsSchema.index({ userLocation: '2dsphere' });

// EnumsSchema.pre(/save|create|update/i, function (next) {
//   if (this.get('latitude') && this.get('longitude')) {
//     const longitude = this.get('longitude');
//     const latitude = this.get('latitude');
//     const geoPoint = {
//       type: 'Point',
//       coordinates: [parseFloat(longitude), parseFloat(latitude)],
//     };
//     this.set({ geoPoint });
//   }

//   next();
// });

export { EnumsSchema };

export const DefaultEnumsProjection = {
  enumType: 1,
  name: 1,
  description: 1,
  order: 1,
  image: 1,
};
