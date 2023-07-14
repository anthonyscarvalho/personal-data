"use strict";
require("../models/journal-records");
var mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
var databaseModel = mongoose.model("journalRecord");
var Utils = require("../utils/utils.js");

exports.view_all = (req, res) => {
  let _response = new Utils.newResponse();
  let body = req.body;
  let page = body.page ? body.page : 1;
  let records = body.pagerRecords ? parseInt(body.pagerRecords) : 20;
  let orderBy = body.column ? body.column : `1`;
  let orderDir = body.dir === `ASC` ? 1 : -1;
  let searchPhrase = body.searchPhrase ? body.searchPhrase : `1`;
  let filter = {};
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
    query["canceled"] = body.state;
  }

  if (orderBy) {
    filter[orderBy] = orderDir;
  } else {
    filter = {};
  }

  databaseModel
    .countDocuments(query)
    .then((pCount) => {
      _response.totalRecords = pCount;
      databaseModel
        .find(query)
        .sort(filter)
        .skip(page * records - records)
        .limit(records)
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

exports.view_record = (req, res) => {
  let _response = new Utils.newResponse();
  let body = req.body;
  let page = body.page ? body.page : 1;
  let records = body.pagerRecords ? parseInt(body.pagerRecords) : 20;
  let filter = {
    date1: 1,
    description: 1,
    credit: 1,
    debit: 1,
  };
  let query = {
    accountsId: req.params.id,
  };

  databaseModel
    .countDocuments(query)
    .then((pCount) => {
      _response.totalRecords = pCount;
      databaseModel
        .find(query)
        .sort(filter)
        .skip(page * records - records)
        .limit(records)
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

exports.view_dash = (req, res) => {
  let _response = new Utils.newResponse();
  let body = req.body;
  let filter = {
    accountName: 1,
    canceled: 1,
  };
  let query = {
    canceled: "false",
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

exports.sum_records = (req, res) => {
  let _response = new Utils.newResponse();

  if (!req.params.id) {
    Utils.returnBadData(res);
  } else if (req.params.id) {
    let query = {};

    databaseModel.countDocuments(query, function (err, pCount) {
      if (err) {
        Utils.returnCountError(res);
      }

      _response.totalRecords = pCount;
      databaseModel
        .aggregate([
          {
            $match: {
              journalId: req.params.id,
            },
          },
          {
            $group: {
              _id: null,
              totalCredit: {
                $sum: "$credit",
              },
              totalDebit: {
                $sum: "$debit",
              },
            },
          },
          {
            $addFields: {
              balance: {
                $sum: ["$totalCredit", "$totalDebit"],
              },
            },
          },
          {
            $project: {
              _id: 0,
              totalCredit: {
                $round: ["$totalCredit", 2],
              },
              totalDebit: {
                $round: ["$totalDebit", 2],
              },
              balance: {
                $round: ["$balance", 2],
              },
            },
          },
        ])
        .then((pResults) => {
          if (pResults.length === 1) {
            _response.data = pResults[0];
          } else {
            _response.data = {};
          }
          Utils.returnSuccess(_response, res);
        })
        .catch((err) => {
          Utils.returnCountError(res);
        });
    });
  }
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

  if (!newRecord.accountName || !newRecord.status || !newRecord.accountNumber) {
    Utils.returnBadData(res);
  } else {
    let _response = new Utils.newResponse();
    databaseModel
      .find({
        accountName: newRecord.accountName,
        accountNumber: newRecord.accountNumber,
      })
      .then((pResults) => {
        _response.data = pResults;

        if (pResults.length > 0) {
          new_record
            .save()
            .then((pResults) => {
              Utils.returnUpdated(res);
            })
            .catch((err) => {
              Utils.returnError(err, res);
            });
        } else {
          // record exists
          _response.status = `02`;
          _response.message = "Record exists";
          Utils.returnSuccess(_response, res);
        }
      })
      .catch((err) => {
        Utils.returnError(`Can't fetch`, res);
      });
  }
};

exports.update_record = (req, res) => {
  let _response = new Utils.newResponse();
  let newRecord = req.body;
  if (newRecord._id) {
    delete newRecord._id;
  }
  if (!newRecord.accountNumber || !(newRecord.accountDescription + "")) {
    Utils.returnBadData(res);
  } else {
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
        Utils.returnError(`Can't fetch`, res);
      });
  }
};

exports.update_status = (req, res) => {
  Utils.update_status(req, res, databaseModel);
};

exports.delete_record = (req, res) => {
  Utils.delete_record(req, res, databaseModel);
};
