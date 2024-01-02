'use strict';
require('../models/bank-accounts');
var mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
var databaseModel = mongoose.model('bankAccount');
var Utils = require('../utils/utils.js');

exports.view = (req, res) => {
  let _response = new Utils.newResponse();
  let body = req.body;
  let page = body.page ? body.page : 1;
  let records = body.pagerRecords ? parseInt(body.pagerRecords) : 20;
  let orderDir = body.dir === `ASC` ? 1 : -1;
  let searchPhrase = body.searchPhrase ? body.searchPhrase : `1`;
  let query = {};
  if (searchPhrase !== `1` && searchPhrase !== ``) {
    query = {
      $or: [
        {
          accountDescription: {
            $regex: new RegExp(searchPhrase, `i`),
          },
        },
        {
          accountNumber: {
            $regex: new RegExp(searchPhrase, `i`),
          },
        },
      ],
    };
  }

  if (body.state != `all`) {
    query['canceled'] = body.state;
  }

  databaseModel
    .countDocuments(query)
    .then((pCount) => {
      _response.totalRecords = pCount;
      databaseModel
        .find(query)
        .sort({
          accountDescription: orderDir,
        })
        .skip(page * records - records)
        .limit(records)
        .then((pResults) => {
          _response.data = pResults;
          Utils.returnSuccess(_response, res);
        })
        .catch((err, res) => {
          Utils.returnError(err, res);
        });
    })
    .catch((err) => {
      Utils.returnCountError(res);
    });
};

exports.view_dash = (req, res) => {
  let _response = new Utils.newResponse();
  let body = req.body;
  let filter = {
    accountDescription: 1,
  };
  let query = {
    canceled: 'false',
  };

  databaseModel
    .countDocuments(query)
    .then((pCount) => {
      _response.totalRecords = pCount;
      databaseModel
        .find(query)
        .sort(filter)
        .then((pResults) => {
          _response.data = pResults;
          Utils.returnSuccess(_response, res);
        })
        .catch((err, res) => {
          if (err) {
            Utils.returnError(err, res);
          }
        });
    })
    .catch((err) => {
      Utils.returnCountError(res);
    });
};

exports.view_all = (req, res) => {
  let _response = new Utils.newResponse();
  let body = req.body;
  let filter = {
    accountDescription: 1,
  };
  let query = {
    canceled: 'false',
  };

  databaseModel
    .countDocuments(query)
    .then((pCount) => {
      _response.totalRecords = pCount;
      databaseModel
        .find(query)
        .sort(filter)
        .then((pResults) => {
          _response.data = pResults;
          Utils.returnSuccess(_response, res);
        })
        .catch((err) => {
          Utils.returnError(err, res);
        });
    })
    .catch((err) => {
      Utils.returnCountError(res);
    });
};

exports.edit_record = (req, res) => {
  let _response = new Utils.newResponse();
  databaseModel
    .findById(req.params.id)
    .then((pResults) => {
      _response.data = pResults;
      Utils.returnSuccess(_response, res);
    })
    .catch((err) => {
      Utils.returnError(err, res);
    });
};

exports.add_record = (req, res) => {
  var new_record = new databaseModel(req.body);

  if (!new_record.accountNumber || !(new_record.accountDescription + '')) {
    Utils.returnBadData(res);
  } else {
    let _response = new Utils.newResponse();
    databaseModel
      .find({ accountNumber: new_record.accountNumber })
      .then((pResults) => {
        _response.data = pResults;

        if (pResults.length == 0) {
          new_record
            .save()
            .then((pResults) => {
              Utils.returnUpdated(res);
            })
            .catch((err) => {
              Utils.returnError(err, res);
            });
        } else if (pResults.length == 1) {
          Utils.returnRecordExist(res);
        } else if (pResults.length > 1) {
          Utils.returnDuplicate(res);
        }
      })
      .catch((err) => {
        Utils.returnError(`can't fetch`, res);
      });
  }
};

exports.update_record = async (req, res) => {
  let _response = new Utils.newResponse();
  let newRecord = req.body;

  if (newRecord._id) {
    delete newRecord._id;
  }
  if (!newRecord.accountNumber || !(newRecord.accountDescription + '')) {
    Utils.returnBadData(res);
  } else {
    if (newRecord.defaultAccount == true) {
      await exports.changeAccountStatus();
    }
    databaseModel
      .updateOne(
        {
          _id: new ObjectId(req.params.id),
        },
        {
          $set: newRecord,
        },
        {
          new: true,
        }
      )
      .then((pResults) => {
        if (pResults.acknowledged) {
          Utils.returnUpdated(res);
        } else {
          Utils.returnNotUpdated(res);
        }
      })
      .catch((err) => {
        Utils.returnCountError(res);
      });
  }
};

exports.get_default = (req, res) => {
  let _response = new Utils.newResponse();
  databaseModel
    .findOne({
      defaultAccount: 'true',
    })
    .then((pResults) => {
      _response.data = pResults;
      Utils.returnSuccess(_response, res);
    })
    .catch((err) => {
      Utils.returnError(err, res);
    });
};

exports.changeAccountStatus = async () => {
  return databaseModel.updateMany({}, { defaultAccount: 'false' }).then((updateResults) => updateResults);
};

exports.update_status = (req, res) => {
  Utils.update_status(req, res, databaseModel);
};

exports.delete_record = (req, res) => {
  Utils.delete_record(req, res, databaseModel);
};
