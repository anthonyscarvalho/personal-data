import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { getRequest } from '../@common/models/api-request.model';
import { hashPassword, isEmailAddress, isPhoneNumber, validatePassword } from '../utility/validator.utility';
import { DefaultGalleryProjection, Gallery } from '@galleries';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { I18nService } from 'nestjs-i18n';
import { LoggingService, CommonService } from "@common";

@Injectable()
export class GalleryService extends CommonService {
  constructor(
    @InjectModel('gallery') private databaseModel: Model<Gallery>
  ) {
    super();
  }

  async fetchRecords(query, filter, page, records) {
    const totalDocs = await this.countDocs(query, this.databaseModel);

    const modelResponse = await this.databaseModel
      .find(query)
      .sort(filter)
      .skip(page * records - records)
      .limit(records)
      .then((pResults) => pResults)
      .catch((err) => {
        console.log(err);
        return null;
      });

    return this.returnSuccess(modelResponse, totalDocs);
  }

  async getRecord(pId) {
    return this.fetchRecord(pId, this.databaseModel);
  }

  async postSave(newRecord) {
    return this.saveRecord(newRecord, this.databaseModel);
  }


  // async postCreate(newRecord) {
  //   return this.saveRecord(newRecord, this.databaseModel);
  // }

  async postCreate(newRecord) {
    const _response = this.newResponse();

    if (!newRecord.name) {
      this.returnBadData('Name not found');
    } else {
      let query = {
        $and: [
          {
            name: newRecord.name,
          },
        ],
      };

      const existingRecords = await this.databaseModel
        .find(query)
        .then((pResults) => pResults)
        .catch((err) => {
          console.log(err);
          return null;
        });

      if (existingRecords.length === 0) {

        let new_record = new this.databaseModel(newRecord);


        new_record.itemSlug = (this.generateSlug(new_record) + `_` + (existingRecords.length + 1)).toLocaleLowerCase();
        // new_profile
        //   .save()
        //   .then((pResults) => {
        //     _response.message = `Record added`;
        //     _response.data = pResults;
        //     Utils.returnSuccess(_response, res);
        //   })
        //   .catch((err) => {
        //     Utils.returnError(err, res);
        //   });
      } else if (existingRecords.length == 1) {
        // Utils.returnUpdated(res);
      } else if (existingRecords.length > 1) {
        // Utils.returnDuplicate(res);
      }
    }

  }
}
