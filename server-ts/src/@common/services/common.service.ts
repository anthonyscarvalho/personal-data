import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { BaseService, LoggingService } from '@common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class CommonService {
  constructor() { }

  generateSlug(pInput) {
    let _slug = pInput.name;
    if (pInput.middleName !== null && pInput.middleName !== ``) {
      _slug += "_" + pInput.middleName;
    }
    if (pInput.middleName2 !== null && pInput.middleName2 !== ``) {
      _slug += "_" + pInput.middleName2;
    }
    if (pInput.middleName3 !== null && pInput.middleName3 !== ``) {
      _slug += "_" + pInput.middleName3;
    }
    if (pInput.surname !== null && pInput.surname !== ``) {
      _slug += "_" + pInput.surname;
    }

    return _slug;
  };

  returnError(pMessage) {
    const response = this.newResponse();
    response.status = '01';
    response.message = pMessage;
    return response;
  };

  returnSuccess(pData, pTotalRecords = null) {
    const response = this.newResponse();
    response.totalRecords = pTotalRecords;
    response.data = pData;

    return response;
  };

  returnUpdated(message) {
    const response = this.newResponse();
    response.message = message;

    return response;
  };

  returnOrderUpdated(pRes) {
    let _response = this.newResponse();
    _response.message = "order updated";
    exports.returnSuccess(_response, pRes);
  };

  returnNotUpdated(pRes) {
    let _response = this.newResponse();
    _response.message = "record not updated";
    _response.status = "01";
    exports.returnSuccess(_response, pRes);
  };

  returnRecordExist(pRes) {
    let _response = this.newResponse();
    _response.message = "record exists";
    _response.status = "02";
    exports.returnSuccess(_response, pRes);
  };

  returnDuplicate(pRes) {
    let _response = this.newResponse();
    _response.message = "duplicate entries for record";
    _response.status = "03";
    exports.returnSuccess(_response, pRes);
  };

  returnCountError(pRes) {
    exports.returnError(`can't count`, pRes);
  };

  returnBadData(pRes) {
    exports.returnError(`bad data`, pRes);
  };

  returnFindError(pRes) {
    exports.returnError(`find results error`, pRes);
  };

  newResponse() {
    return {
      status: `00`,
      totalRecords: null,
      data: null,
      message: null,
    };
  };

  cleanFileName(string) {
    string = string.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, ""); // Removes special chars.
    string = string.trim();
    string = string.replace(/\s+/g, "-"); // Replaces all spaces with hyphens.

    return string.replace(/-+/, "-");
  };

  async saveRecord(newRecord, databaseModel) {
    const response = await databaseModel.findByIdAndUpdate(newRecord._id, newRecord, { new: true });
    if (response) {
      return this.returnSuccess('Record updated');
    }
    else {
      return this.returnError('Error saving record');
    }
    // if (!pAction) {
    //   return exports.returnBadData(res);
    // } else {
    //   databaseModel
    //     .updateOne(
    //       pId,
    //       {
    //         $set: {
    //           canceled: pAction,
    //           canceledDate: pAction === "true" ? new Date() : null,
    //         },
    //       },
    //       {
    //         new: true,
    //       }
    //     )
    //     .then((pResults) => {
    //       if (pResults.acknowledged) {
    //         exports.returnUpdated(res);
    //       } else {
    //         exports.returnNotUpdated(res);
    //       }
    //     })
    //     .catch((err) => {
    //       return exports.returnError(`Can't count`, res);
    //     });
    // }
  };

  async update_status(pId, pAction, res, databaseModel) {
    if (!pAction) {
      return exports.returnBadData(res);
    } else {
      databaseModel
        .updateOne(
          pId,
          {
            $set: {
              canceled: pAction,
              canceledDate: pAction === "true" ? new Date() : null,
            },
          },
          {
            new: true,
          }
        )
        .then((pResults) => {
          if (pResults.acknowledged) {
            exports.returnUpdated(res);
          } else {
            exports.returnNotUpdated(res);
          }
        })
        .catch((err) => {
          return exports.returnError(`Can't count`, res);
        });
    }
  };

  async delete_record(pId, res, databaseModel) {
    if (!pId) {
      return exports.returnBadData(res);
    } else {
      databaseModel
        .deleteOne(pId)
        .then((pResults) => {
          if (pResults.acknowledged) {
            exports.returnUpdated(res);
          } else {
            exports.returnNotUpdated(res);
          }
        })
        .catch((err) => {
          res.send(err);
        });
    }
  };

  async fetchRecord(pId, pModel) {
    const modelResponse = await pModel
      .findById(pId)
      .then((pResults) => pResults)
      .catch((err) => {
        console.log(err);
        return null;
      });

    return this.returnSuccess(modelResponse);
  }

  async countDocs(query, databaseModel) {
    return await databaseModel.countDocuments(query).then((count) => count);
  }
}
