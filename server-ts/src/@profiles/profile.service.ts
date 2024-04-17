import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { getRequest } from '../@common/models/api-request.model';
import { hashPassword, isEmailAddress, isPhoneNumber, validatePassword } from '../utility/validator.utility';
import { DefaultProfileProjection, Profile } from '@profiles';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { I18nService } from 'nestjs-i18n';
import { LoggingService, CommonService } from "@common";

@Injectable()
export class ProfileService extends CommonService {
  constructor(
    @InjectModel('profile') private databaseModel: Model<Profile>
  ) {
    super();
  }

  async fetchProfiles(query, filter, page, records) {
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

    // return _response;
  }

  async getRecord(pId) {
    return this.fetchRecord(pId, this.databaseModel);
  }

  // async addProfile(pId) {
  //   const _response = this.newResponse();
  //   let new_record = new databaseModel(req.body);

  //   let query = {
  //     $and: [
  //       {
  //         name: new_record.name,
  //       },
  //     ],
  //   };

  //   if (!new_record.name) {
  //     Utils.returnBadData(res);
  //   } else {
  //     databaseModel
  //       .find(query)
  //       .then((pResults) => {
  //         if (pResults) {
  //           _response.data = pResults;

  //           _response.data = pResults;

  //           if (pResults.length === 0) {
  //             new_profile.itemSlug = (Utils.generateSlug(new_profile) + `_` + (pResults.length + 1)).toLocaleLowerCase();
  //             new_profile
  //               .save()
  //               .then((pResults) => {
  //                 _response.message = `Record added`;
  //                 _response.data = pResults;
  //                 Utils.returnSuccess(_response, res);
  //               })
  //               .catch((err) => {
  //                 Utils.returnError(err, res);
  //               });
  //           } else if (pResults.length == 1) {
  //             Utils.returnUpdated(res);
  //           } else if (pResults.length > 1) {
  //             Utils.returnDuplicate(res);
  //           }
  //         } else {
  //           Utils.returnFindError(res);
  //         }
  //       })
  //       .catch((err) => {
  //         Utils.returnError(err, res);
  //       });
  //   }


  //   const modelResponse = await this.databaseModel
  //     .findById(pId)
  //     .then((pResults) => pResults)
  //     .catch((err) => {
  //       console.log(err);
  //       return null;
  //     });

  //   const _response = {
  //     status: `00`,
  //     totalRecords: 1,
  //     data: modelResponse,
  //     message: null,
  //   };

  //   return _response;
  // }
}
