import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";

import { Budget, BudgetSchema } from "@sharedTypes/schemas";
import { AuthMiddleware, LoggingService } from "@common";

import { BudgetV1Controller } from "./controller";
import { BudgetService } from "./service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Budget.name, schema: BudgetSchema }]),
  ],
  controllers: [BudgetV1Controller],
  providers: [
    JwtService,
    BudgetService,
    AuthMiddleware,
    LoggingService
  ],
  exports: [
    BudgetService
  ]
})
export class BudgetModule { }
