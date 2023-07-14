"use strict";
const { ObjectId } = require("mongodb");

exports.generateSlug = function (pInput) {
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

exports.returnError = function (pMessage, pRes) {
  pRes.status(500).json({
    status: "01",
    totalRecords: null,
    data: null,
    message: pMessage,
  });
};

exports.returnSuccess = function (pResult, pRes) {
  pRes.status(200).json(pResult);
};

exports.returnUpdated = function (pRes) {
  let _response = new exports.newResponse();
  _response.message = "record updated";
  exports.returnSuccess(_response, pRes);
};

exports.returnOrderUpdated = function (pRes) {
  let _response = new exports.newResponse();
  _response.message = "order updated";
  exports.returnSuccess(_response, pRes);
};

exports.returnNotUpdated = function (pRes) {
  let _response = new exports.newResponse();
  _response.message = "record not updated";
  _response.status = "01";
  exports.returnSuccess(_response, pRes);
};

exports.returnRecordExist = function (pRes) {
  let _response = new exports.newResponse();
  _response.message = "record exists";
  _response.status = "02";
  exports.returnSuccess(_response, pRes);
};

exports.returnDuplicate = function (pRes) {
  let _response = new exports.newResponse();
  _response.message = "duplicate entries for record";
  _response.status = "03";
  exports.returnSuccess(_response, pRes);
};

exports.returnCountError = function (pRes) {
  exports.returnError(`can't count`, pRes);
};

exports.returnBadData = function (pRes) {
  exports.returnError(`bad data`, pRes);
};

exports.returnFindError = function (pRes) {
  exports.returnError(`find results error`, pRes);
};

exports.newResponse = function () {
  return {
    status: `00`,
    totalRecords: null,
    data: null,
    message: null,
  };
};

exports.update_status = function (req, res, databaseModel) {
  let _response = new exports.newResponse();
  let { action } = req.body;
  if (!action) {
    return exports.returnBadData(res);
  } else {
    databaseModel
      .updateOne(
        {
          _id: new ObjectId(req.params.id),
        },
        {
          $set: {
            canceled: action,
            canceledDate: action === "true" ? new Date() : null,
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

exports.delete_record = function (req, res, databaseModel) {
  let _response = new exports.newResponse();

  if (!req.params.id) {
    return exports.returnBadData(res);
  } else {
    databaseModel
      .deleteOne({
        _id: new ObjectId(req.params.id),
      })
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
