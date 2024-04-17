import { I18nService } from 'nestjs-i18n';

export class BaseController {
  constructor(private readonly i18n: I18nService) { }

  protected getLocalization(module: string, identifier: string) {
    return this.i18n.t(`${module}.${identifier}`);
  }

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

  returnUpdated(pRes) {
    let _response = this.newResponse();
    _response.message = "record updated";
    exports.returnSuccess(_response, pRes);
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
}
