import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

@Injectable()
export class MongodbConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) { }
  //You can return promise as well
  public createMongooseOptions(): MongooseModuleOptions {
    return {
      //MONGODB_URL is in .env file
      //MONGO_REPL_SET is in .env file
      //MONGO_AUTH_SOURCE is in .env file
      uri: `${process.env.MONGODB_URL}/${process.env.MONGODB_DATABASE}`,
      // useNewUrlParser: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
      // useUnifiedTopology: true,
      // replicaSet: this.configService.get('MONGO_REPL_SET'),
      // authSource: this.configService.get('MONGO_AUTH_SOURCE'),
    };
  }
}
