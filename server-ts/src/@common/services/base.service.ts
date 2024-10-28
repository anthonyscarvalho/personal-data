import { Injectable } from "@nestjs/common";
import { LoggingService } from "./log.service";

@Injectable()
export class BaseService {
  constructor(
    readonly log: LoggingService
  ) { }

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
  }

  returnError(pMessage) {
    let _response = this.newResponse();
    _response.message = pMessage;
    _response.status = '01';

    return _response;
  };

  returnSuccess(pResult) {
    return pResult;
  };

  returnUpdated() {
    let _response = this.newResponse();
    _response.message = "record updated";
    this.returnSuccess(_response);
  };

  returnOrderUpdated() {
    let _response = this.newResponse();
    _response.message = "order updated";
    this.returnSuccess(_response);
  };

  returnNotUpdated() {
    let _response = this.newResponse();
    _response.message = "record not updated";
    _response.status = "01";
    this.returnSuccess(_response);
  };

  returnRecordExist() {
    let _response = this.newResponse();
    _response.message = "record exists";
    _response.status = "02";
    this.returnSuccess(_response);
  };

  returnDuplicate() {
    let _response = this.newResponse();
    _response.message = "duplicate entries for record";
    _response.status = "03";
    this.returnSuccess(_response);
  };

  returnCountError() {
    this.returnError(`can't count`);
  };

  returnBadData() {
    this.returnError(`bad data`);
  };

  returnFindError() {
    this.returnError(`find results error`);
  };

  newResponse() {
    return {
      status: `00`,
      totalRecords: null,
      data: null,
      message: null,
    };
  };
}
