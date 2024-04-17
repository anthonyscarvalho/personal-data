import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { getRequest } from '../@common/models/api-request.model';
import { hashPassword, isEmailAddress, isPhoneNumber, validatePassword } from '../utility/validator.utility';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { I18nService } from 'nestjs-i18n';

import { CommonService, LoggingService } from "@common";
import { DefaultMediaProjection, Media } from '@media';

@Injectable()
export class MediaService extends CommonService {
  constructor(
    @InjectModel('media') private databaseModel: Model<Media>,
  ) {
    super();
  }

  async fetchMedia(pId: string) {
    const modelResponse = await this.databaseModel.findById(pId)
      .then((pResults) => pResults)
      .catch((err) => {
        console.log(err);
        return null;
      });

    return this.returnSuccess(modelResponse);
  }

  async fetchAllMedia(query: any, sort: any, pId: string) {
    const totalRecords = await this.countDocs(query, this.databaseModel);
    let modelResponse = [];

    if (totalRecords > 0) {
      modelResponse = await this.databaseModel.find(query)
        .sort(sort)
        .then((pResults) => pResults)
        .catch((err) => {
          console.log(err);
          return null;
        });
    }

    return this.returnSuccess(modelResponse, totalRecords);
  }

  async getRecord(pId) {
    return this.fetchRecord(pId, this.databaseModel);
  }

  async save(query: any, newRecord: any): Promise<any | null> {
    const record = await this.databaseModel.find(query);

    if (!record.length) {
      if (newRecord.imageMeta) {
        newRecord.imageMeta = JSON.parse(newRecord.imageMeta);
      }
      const modelUpdate = new this.databaseModel(newRecord);
      if (modelUpdate.save()) {
        return this.returnSuccess('Record updated');
      } else {
        return this.returnError('failed to process');
      }
    }

  }
}
