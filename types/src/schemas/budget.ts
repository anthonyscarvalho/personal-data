import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";

import { cBudget, cBreakDown, cBudgetData } from "../classes";
import type { tBudget } from "../interfaces";

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: 'budgets',
})
export class Budget extends cBudget implements tBudget {
  _id?: ObjectId;
  @Prop()
  actual: number;
  @Prop()
  breakdown: cBreakDown[];
  @Prop()
  budget: number;
  @Prop()
  category: number;
  @Prop()
  description: string;
  @Prop()
  essential: boolean;
  @Prop()
  history: any[];
  @Prop()
  keywords: string;
  @Prop()
  status: string;
  @Prop()
  budgetData: cBudgetData[];
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

export const BudgetSchema = SchemaFactory.createForClass(Budget);
