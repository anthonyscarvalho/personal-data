"use strict";
require("../models/lotto.js");
var mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
var databaseModel = mongoose.model("lotto");
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
    order: 1,
    // description: 1,
    // credit: 1,
    // debit: 1
  };
  let query = {
    accountsId: req.params.id,
    // $and:{}
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

exports.sum_records = (req, res) => {
  let _response = new Utils.newResponse();

  if (!req.params.id) {
    Utils.returnBadData(res);
  } else if (req.params.id) {
    let query = {};

    databaseModel
      .countDocuments(query)
      .then((pCount) => {
        _response.totalRecords = pCount;
        databaseModel
          .aggregate([
            {
              $match: {
                accountsId: req.params.id,
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
            Utils.returnError(err, res);
          });
      })
      .catch((err) => {
        Utils.returnCountError(res);
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
  let _response = new Utils.newResponse();
  let new_record = new databaseModel(req.body);

  let query = {
    $and: [
      {
        drawNumber: new_record.drawNumber,
      },
    ],
  };

  if (!new_record.drawNumber ) {
    Utils.returnBadData(res);
  } else {
    databaseModel
      .find(query, {}, {})
      .then((pResults) => {
        if (pResults) {
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
        } else {
          Utils.returnFindError(res);
        }
      })
      .catch((err) => {
        Utils.returnError(err, res);
      });
  }
};

exports.update_record = (req, res) => {
  let _response = new Utils.newResponse();
  let newRecord = req.body;

  if (newRecord._id) {
    delete newRecord._id;
  }
  if (!newRecord.drawNumber) {
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
        Utils.returnCountError(res);
      });
  }
};

exports.update_status = (req, res) => {
  Utils.update_status(req, res, databaseModel);
};

exports.delete_record = (req, res) => {
  Utils.delete_record(req, res, databaseModel);
};
