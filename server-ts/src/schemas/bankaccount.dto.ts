import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BankAccountDocument = HydratedDocument<BankAccount>;

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class BankAccount {
  @Prop()
  guid: string;

  @Prop()
  userId: string;

  @Prop()
  subaccountId: string;

  @Prop()
  id: string;
  
  @Prop()
  bank: string;

  @Prop()
  accountHolder: string;

  @Prop()
  accountNumber: string;

  @Prop()
  branchCode: string;

  @Prop()
  accountType: string;

  @Prop()
  country: string;

  @Prop()
  lastUpdated: number;
}

const BankAccountSchema = SchemaFactory.createForClass(BankAccount);

export { BankAccountSchema };
