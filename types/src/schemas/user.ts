import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";

import { cUser } from "../classes";
import type { tUser } from "../interfaces";

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: 'users',
})
export class User extends cUser implements tUser {
  _id: ObjectId;
  @Prop({ required: true })
  username: string;
  @Prop()
  password: string;
  @Prop()
  name: string;
  @Prop()
  surname: string;
  @Prop()
  emailAddress: string;
  @Prop({ required: true })
  lastLogin: string;
  @Prop()
  roles: string;
  @Prop()
  accessList: string;
  @Prop()
  access: string;
  @Prop()
  created: string;
  @Prop({
    type: String,
    enum: ['true', 'false']
  })
  canceled: string;
  @Prop()
  canceledDate: string;

  constructor(pModel: any = null) {
    super(pModel);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
