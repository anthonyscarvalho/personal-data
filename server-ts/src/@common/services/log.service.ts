import { Injectable } from "@nestjs/common";
import mongojs from 'mongojs';
import Mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import winston from "winston";

@Injectable()
export class LoggingService {

  static correlationId: string = uuidv4()
  db = mongojs(`${process.env.MONGODB_URL}/${process.env.MONGODB_DATABASE}`, ['logs']);

  private logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
  testSchema = new Mongoose.Schema({}, { strict: false });

  testCollection;

  constructor() {
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new winston.transports.Console({
        format: winston.format.simple(),
      }));
    }
    try {
      this.testCollection = Mongoose.model('logs');
    } catch (error) {
      this.testCollection = Mongoose.model('logs', this.testSchema);
    }
  }

  async info(message: string, data: any = {}) {
    this.db.logs.save(data, function (err, pResults) {
      if (err) {
        // res.send(err);
        return {
          error: err
        }
      }
    });
    this.logger.info(message, { ...data, 'correlation-id': LoggingService.correlationId });
  }

  error(message: string, data: any = {}) {
    this.logger.error(message, { ...data, 'correlation-id': LoggingService.correlationId });
  }
}
