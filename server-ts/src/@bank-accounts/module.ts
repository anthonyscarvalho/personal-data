import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";

import { BankAccount, BankAccountSchema } from "@sharedTypes/schemas";
import { AuthMiddleware, LoggingService } from "@common";

import { BankAccountsV1Controller } from "./controller";
import { BankAccountsService } from "./service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BankAccount.name, schema: BankAccountSchema }]),
  ],
  controllers: [BankAccountsV1Controller],
  providers: [
    JwtService,
    BankAccountsService,
    AuthMiddleware,
    LoggingService
  ],
  exports: [
    BankAccountsService
  ]
})
export class BankAccountModule { }
