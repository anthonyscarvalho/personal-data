import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class Profile {
  @Prop({ required: true })
  name: string;
  @Prop()
  country: string;
  @Prop()
  placeOfBirth: string;
  @Prop()
  ethnicity: string;
  @Prop()
  tattoos: string;
  @Prop()
  piercings: string;
  @Prop()
  eyeColor: string;
  @Prop()
  hairColor: string;
  @Prop()
  height: string;
  @Prop()
  weight: string;
  @Prop({
    type: String,
    enum: ['', 'Y', 'N', 'U']
  })
  boobImplants: String;
  @Prop()
  measurements: string;
  @Prop()
  braSize: string;
  @Prop()
  profession: string;
  @Prop({
    type: String,
    enum: ['', 'A', 'R', 'D', 'U']
  })
  careerStatus: string;
  @Prop()
  surname: string;
  @Prop()
  middleName: string;
  @Prop()
  middleName2: string;
  @Prop()
  middleName3: string;
  @Prop()
  careerLength: string;
  @Prop()
  headShotImage: string;
  @Prop()
  aliases: string;
  @Prop()
  dob: string;
  @Prop()
  description: string;
  @Prop()
  url: string;
  @Prop()
  twitter: string;
  @Prop()
  instagram: string;
  @Prop()
  facebook: string;
  @Prop()
  youTube: string;
  @Prop()
  google: string;
  @Prop()
  website: string;
  @Prop({
    type: String,
    enum: ['0', '1', '2', '3', '4', '5', '6']
  })
  maritalStatus: string;
  @Prop({
    type: String,
    enum: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
  })
  religion: string;
  @Prop({
    type: String,
    enum: ['', 'M', 'F', 'O', 'U']
  })
  gender: string;
  @Prop({ required: true })
  itemSlug: string;
  @Prop({
    type: String,
    enum: ['', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  })
  bodyType: string;
  @Prop({
    type: String,
    enum: ['', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  })
  bodySize: string;
  @Prop({
    type: String,
    enum: ['true', 'false']
  })
  canceled: string;
  @Prop()
  canceledDate: string;
}

const ProfileSchema = SchemaFactory.createForClass(Profile);

export { ProfileSchema };

export const DefaultProfileProjection = {
  password: 1,
  role: 1,
  isBlocked: 1,
  phone: 1,
  countryCode: 1,
  email: 1,
  saIdNo: 1,
  profileStatus: 1,
  profilePictureId: 1,
  address: 1,
  zipCode: 1,
  street: 1,
  firstName: 1,
  lastName: 1,
  userName: 1,
  image: 1,
  kycCustomerId: 1
};
