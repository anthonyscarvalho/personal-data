import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { GENDERS, MARITAL_STATUSES, USER_ROLES } from '@sharedTypes/constants';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class User {
  @Prop()
  isSocialLogin: boolean;

  @Prop({ type: String, default: '' })
  socialId: string;

  @Prop({
    type: String,
    // enum: Object.values(SOCIAL_TYPES),
  })
  socialType: string;

  @Prop({
    type: String,
    enum: Object.values(USER_ROLES),
    default: USER_ROLES.USER,
  })
  role: string;

  @Prop({ type: String, default: '' })
  fullName: string;

  @Prop({ type: String, default: '' })
  userName: string;

  @Prop({ type: String, default: '' })
  firstName: string;

  @Prop({ type: String, default: '' })
  lastName: string;

  @Prop({ lowercase: true, index: true, trim: true })
  email: string;

  @Prop({ trim: true })
  phone: string;

  @Prop({ trim: true })
  govIssuedIdentificationId: string;

  @Prop({ trim: true })
  profilePictureId: string;

  @Prop({ trim: true })
  saIdNo: string;

  @Prop({ trim: true })
  countryCode: string;

  @Prop({ default: false })
  isProfileComplete: boolean;

  @Prop({ default: false })
  isPhoneVerify: boolean;

  @Prop({ default: false })
  isVerifiedByAdmin: boolean;

  @Prop({ type: String, default: '', select: false })
  password: string;

  @Prop({ type: String, default: '', select: false })
  submitKey: string;

  @Prop({ type: String, default: '' })
  deviceId: string;

  @Prop({ type: String, default: '', select: false })
  passCode: string;

  @Prop({ type: String, default: '' })
  passCodeRandom: string;

  @Prop({ type: String, default: '' })
  image: string;

  @Prop({ type: String, default: '' })
  address: string;

  @Prop({ type: String, default: '' })
  street: string;

  @Prop({ type: Number, default: 0 })
  profileStatus: number;

  @Prop({ type: String, default: '' })
  coverImage: string;

  @Prop({ type: String, default: '' })
  dateOfBirth: string;

  // @Prop({
  //   type: String,
  //   enum: Object.values(USER_TITLES),
  // })
  // title: string;

  @Prop({
    type: String,
    enum: Object.values(MARITAL_STATUSES),
  })
  maritalStatus: string;

  @Prop({ type: String, enum: Object.values(GENDERS) })
  gender: string;

  @Prop({ type: String, default: '', trim: true, select: false })
  jti: string;

  @Prop({ type: String, default: null })
  zipCode: string;

  @Prop({ type: Number, default: 0 })
  profileCompleteAt: number;

  @Prop({ type: String, default: '' })
  ukhesheCustomerId: string;

  @Prop({ type: String, default: '' })
  kycCustomerId: string;

  @Prop({ type: String, default: '' })
  ukhesheExternalCustomerId: string;

  @Prop({ type: String, default: null })
  locale: string;

  @Prop({ type: String, default: '' })
  referral: string;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: { type: [Number], default: [0, 0] },
  })
  location: { type: string; coordinates: number[] };

  @Prop({ type: String, default: '' })
  deviceType: string;

  @Prop({ type: String, default: '' })
  deviceToken: string;

  @Prop({ type: Boolean, default: false })
  isKYCCompleted: boolean;

  @Prop({ type: Boolean, default: false })
  selfieIsASelfie: boolean;

  @Prop({ type: Boolean, default: false })
  selfieIsLegitimate: boolean;

  @Prop({ type: Boolean, default: false })
  selfieMatchesIdentity: boolean;

  @Prop({ type: Boolean, default: false })
  firstNameMatchesIdentity: boolean;

  @Prop({ type: Boolean, default: false })
  lastNameMatchesIdentity: boolean;

  @Prop({ type: Boolean, default: false })
  identityNumberMatchesIdentity: boolean;

  @Prop({ type: Boolean, default: false })
  isNotificationEnable: boolean;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Boolean, default: false })
  isBlocked: boolean;

  @Prop({ type: Number, default: 0 })
  latitude: number;

  @Prop({ type: Number, default: 0 })
  longitude: number;

  @Prop({ type: Date })
  documentExpiryDate: Date;

  @Prop({ type: MSchema.Types.ObjectId, ref: 'user' })
  adminId: MSchema.Types.ObjectId;

  // @Prop({
  //   type: String,
  //   enum: Object.values(USER_TYPES),
  //   default: USER_TYPES.TRURO,
  // })
  // userType: string;

  @Prop({ type: Number, default: 0 })
  queryCount: number;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ userLocation: '2dsphere' });

UserSchema.pre(/save|create|update/i, function (next) {
  if (this.get('latitude') && this.get('longitude')) {
    const longitude = this.get('longitude');
    const latitude = this.get('latitude');
    const geoPoint = {
      type: 'Point',
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
    };
    this.set({ geoPoint });
  }

  next();
});

export { UserSchema };

export const DefaultUserProjection = {
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
