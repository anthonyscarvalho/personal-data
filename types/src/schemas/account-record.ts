import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";

import { cAccountRecord } from "../classes";
import type { tAccountRecord } from "../interfaces";

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class AccountRecord extends cAccountRecord implements tAccountRecord {
  _id?: ObjectId;
  @Prop()
  statementId: string;
  @Prop()
  transactionId: string;
  @Prop()
  order: number;
  @Prop()
  accountsId: string;
  @Prop()
  date1: string;
  @Prop({ required: true })
  year: string;
  @Prop()
  month: string;
  @Prop()
  day: number;
  @Prop()
  budgetYear: string;
  @Prop()
  budgetMonth: string;
  @Prop()
  budgetDay: string;
  @Prop()
  date2: string;
  @Prop()
  description: string;
  @Prop()
  credit: number;
  @Prop()
  debit: number;
  @Prop()
  balance: number;
  @Prop()
  serviceFee: boolean;
  @Prop()
  journal: boolean;
  @Prop()
  comments: string;
  @Prop()
  processed: boolean;
  @Prop()
  originalRecord: string;
  @Prop()
  checked: boolean;
  @Prop()
  hash: string;

  constructor(pModel: any = null) {
    super(pModel);
  }
}

export const AccountRecordSchema = SchemaFactory.createForClass(AccountRecord);
