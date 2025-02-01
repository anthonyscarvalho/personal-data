import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";

import { cAsset } from "../classes";
import type { tAsset, tVehicleService } from "../interfaces";

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: 'assets',
})
export class Asset extends cAsset implements tAsset {
  _id?: ObjectId;
  @Prop()
  name: string;
  @Prop()
  type: number;
  @Prop()
  status: number;
  @Prop()
  make: string;
  @Prop()
  model: string;
  @Prop()
  imei?: string;
  @Prop()
  description: string;
  @Prop()
  dateBought: string;
  @Prop()
  dateSold: string;
  @Prop()
  services?: tVehicleService;
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

export const AssetSchema = SchemaFactory.createForClass(Asset);
