import { Injectable } from "@nestjs/common";

import { RESPONSE_MESSAGES } from "@sharedTypes/enums";

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

  returnSuccess(pData, pTotalRecords = null, message = null) {
    return this.newResponse('00', pTotalRecords, pData, message);
  };

  returnError(pMessage = RESPONSE_MESSAGES.genericError) {
    return this.newResponse('01', null, null, pMessage);
  };

  returnRecordExist() {
    return this.newResponse('02', null, null, RESPONSE_MESSAGES.recordExists);
  };

  returnDuplicate(pData = null) {
    return this.newResponse('03', null, pData, RESPONSE_MESSAGES.duplicateEntries);
  };

  newResponse(status = '00', totalRecords = null, data = null, message = null) {
    return {
      status: status,
      totalRecords: totalRecords,
      data: data,
      message: message,
    };
  };

  cleanFileName(string) {
    string = string.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, ""); // Removes special chars.
    string = string.trim();
    string = string.replace(/\s+/g, "-"); // Replaces all spaces with hyphens.

    return string.replace(/-+/, "-");
  };

  replaceText(pInput) {
    const characters = /[&\/\\#,+\-()$~%.'":*?<>{}]/g;
    const doubleSpace = /  +/g;
    const lineBreak = /[\r\n]+/g;
    const space = / +/g;

    // use of String replace() Method
    pInput = pInput.replace(characters, ' ');
    pInput = pInput.replace(doubleSpace, ' ');
    pInput = pInput.replace(lineBreak, '');
    pInput = pInput.replace(space, '-');
    return pInput.trim();
  };

  async saveRecord(newRecord, databaseModel) {
    const response = await databaseModel.findByIdAndUpdate(newRecord._id, newRecord, { new: true });
    if (response) {
      return this.returnSuccess(null, null, RESPONSE_MESSAGES.updated);
    }
    else {
      return this.returnError(RESPONSE_MESSAGES.notSaved);
    }
  };

  async createRecord(newRecord, databaseModel) {
    const response = await databaseModel.create(newRecord);
    // console.log(response);
    if (response) {
      const modelResponse = await databaseModel
        .findOne({ itemSlug: newRecord.itemSlug })
        .then((pResults) => pResults)
        .catch((err) => {
          console.log('create record error', JSON.stringify(err));
          return null;
        });
      return this.returnSuccess(modelResponse, null, RESPONSE_MESSAGES.updated);
    }
    else {
      return this.returnError(RESPONSE_MESSAGES.notSaved);
    }
  };

  async update_status(pId, pAction, res, databaseModel) {
    if (!pAction) {
      return this.returnError(RESPONSE_MESSAGES.badData);
    } else {
      const modelResponse = await databaseModel
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
        .then((pResults) => pResults)
        .catch((err) => {
          console.log(err);
          return null;
        });

      if (modelResponse.acknowledged) {
        this.returnSuccess(null, null, RESPONSE_MESSAGES.updated);
      } else {
        this.returnError(RESPONSE_MESSAGES.notUpdated);
      }
    }
  };

  async delete_record(pId, databaseModel) {
    if (!pId) {
      return this.returnError(RESPONSE_MESSAGES.badData);
    } else {
      const response = await databaseModel.deleteOne({ _id: pId }).then((pResults) => pResults);
      console.log('delete', JSON.stringify(response));
      if (response.acknowledged && response.deletedCount > 0) {
        return this.returnSuccess(RESPONSE_MESSAGES.updated);
      } else {
        return this.returnError(RESPONSE_MESSAGES.saveError);
      }
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
