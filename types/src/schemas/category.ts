import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";

import { cCategory } from "../classes";
import type { tCategory, tVehicleService } from "../interfaces";

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: 'categories',
})
export class Category extends cCategory implements tCategory {
  _id?: ObjectId;
  @Prop()
  category: string;
  @Prop()
  price: number;
  @Prop()
  link: string;
  @Prop()
  @Prop()
  created: string;
  @Prop()
  canceled: string;
  @Prop()
  canceledDate: string;
  @Prop()
  user: string;

  constructor(pModel: any = null) {
    super(pModel);
  }
}

export const CategorySchema = SchemaFactory.createForClass(Category);
