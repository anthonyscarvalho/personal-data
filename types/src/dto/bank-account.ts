import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";

import { cBankAccount } from "../classes";
import type { tBankAccount, tBankAccountNumber } from "../interfaces";

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class BankAccount extends cBankAccount implements tBankAccount {
  _id: ObjectId;
  @Prop()
  accountNumber: string;
  @Prop()
  accountNumbers: tBankAccountNumber[];
  @Prop()
  accountDescription: string;
  @Prop()
  bank: string;
  @Prop()
  status: string;
  @Prop()
  dateOpened: string;
  @Prop()
  dateClosed: string;
  @Prop()
  csvType: string;
  @Prop()
  currency: string;
  @Prop()
  defaultAccount: string;
  @Prop()
  symbol: string;
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

export const BankAccountSchema = SchemaFactory.createForClass(BankAccount);
