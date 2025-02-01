import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";

import { cProduct } from "../classes";
import type { tProduct } from "../interfaces";

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: 'products',
})
export class Product extends cProduct implements tProduct {
  _id: ObjectId;
  @Prop()
  description: string;
  @Prop()
  price: number;
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
    super(pModel)
  }
}

export const ProductSchema = SchemaFactory.createForClass(Product);
