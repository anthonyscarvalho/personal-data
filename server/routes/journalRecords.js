var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var config = require("../config");
var db = mongojs(config.database.host, [
  "journals",
  "journalRecords",
  "accountRecords",
]);
const { ObjectId } = require("mongodb");

var _response = {
  status: "00",
  totalRecords: null,
  data: null,
  errors: null,
};

var _errors = [];

// fetch records
router.post("/journal-records/view/:id?", function (req, res, next) {
  var body = req.body;
  var page = body.page ? body.page : 1;
  var records = body.pagerRecords ? parseInt(body.pagerRecords) : 20;
  var orderBy = body.column ? body.column : "";
  var orderDir = body.dir === "ASC" ? 1 : -1;
  var searchPhrase = body.searchPhrase ? body.searchPhrase : "";
  var filter = {};
  var query = {};
  _errors = [];

  if (searchPhrase != "") {
    query = {
      accountDescription: searchPhrase,
      accountNumber: searchPhrase,
    };
  }

  if (orderBy) {
    filter[orderBy] = orderDir;
  } else {
    filter = {
      _id: 1,
    };
  }
  if (!req.params.id) {
    db.journalRecords.count(query, function (err, pCount) {
      if (err) {
        _errors.push("Can't count");
      }
      _response.totalRecords = pCount;
      db.journalRecords.aggregate(
        [
          {
            $match: query,
          },
          {
            $project: {
              _id: 1,
              date1: 1,
              date2: 1,
              accountsId: {
                $toObjectId: "$accountsId",
              },
              credit: 1,
              debit: 1,
              journal: 1,
            },
          },
          {
            $lookup: {
              from: "accounts",
              localField: "accountsId",
              foreignField: "_id",
              as: "accountInfo",
            },
          },
          {
            $project: {
              "accountInfo.status": 0,
              "accountInfo.canceled": 0,
              "accountInfo.canceledDate": 0,
              "accountInfo.dateClosed": 0,
              "accountInfo.dateOpened": 0,
              "accountInfo.csvType": 0,
              "accountInfo.accountDescription": 0,
            },
          },
          {
            $replaceRoot: {
              newRoot: {
                $mergeObjects: [
                  {
                    $arrayElemAt: ["$accountInfo", 0],
                  },
                  "$$ROOT",
                ],
              },
            },
          },
          {
            $project: {
              accountInfo: 0,
            },
          },
          {
            $sort: filter,
          },
          {
            $skip: page * records - records,
          },
          {
            $limit: records,
          },
        ],
        function (err, pResults) {
          if (err) {
            _errors.push(err);
          }
          if (_errors.length > 0) {
            _response.status = "01";
          }
          _response.errors = _errors;
          _response.data = pResults;
          res.json(_response);
        }
      );
    });
  } else if (req.params.id == "all") {
    db.journalRecords.count(query, function (err, pCount) {
      if (err) {
        _errors.push("Can't count");
      }
      _response.totalRecords = pCount;
      db.journalRecords
        .find(query)
        .sort({
          accountDescription: 1,
        })
        .toArray(function (err, pResults) {
          if (err) {
            _errors.push(err);
          }
          if (_errors.length > 0) {
            _response.status = "01";
          }
          _response.errors = _errors;
          _response.data = pResults;
          res.json(_response);
        });
    });
  } else {
    db.journalRecords.findOne(
      {
        _id: new ObjectId(req.params.id),
      },
      function (err, pResults) {
        if (err) {
          res.send(err);
        }
        _response.status = "00";
        _response.data = pResults;
        res.json(_response);
      }
    );
  }
});

// sum records for given account
router.post("/journal-records/sum/:id?", function (req, res, next) {
  _errors = [];
  var query = {};
  if (!req.params.id) {
    if (_errors.length > 0) {
    }
    _response.status = "01";
    _response.errors = _errors;
    _response.data = [];
    res.json(_response);
  } else if (req.params.id) {
    db.journalRecords.count(query, function (err, pCount) {
      if (err) {
        _errors.push("Can't count");
      }
      _response.totalRecords = pCount;
      db.journalRecords.aggregate(
        [
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
        ],
        function (err, pResults) {
          if (err) {
            _errors.push(err);
          }
          if (_errors.length > 0) {
            _response.status = "01";
          }
          _response.errors = _errors;
          if (pResults.length === 1) {
            _response.data = pResults[0];
          } else {
            _response.data = {};
          }
          res.json(_response);
        }
      );
    });
  }
});

// create record
router.post("/journal-records/add", function (req, res, next) {
  var newRecord = req.body;
  if (!newRecord.journalId || !newRecord.date) {
    res.status(400);
    res.json({
      error: "bad data",
    });
  } else {
    db.journalRecords.find(
      {
        journalId: req.body.journalId,
        accountRecordId: newRecord.accountRecordId,
        date: newRecord.date,
        credit: newRecord.credit,
        debit: newRecord.debit,
      },
      {},
      {},
      function (err, pResults) {
        if (err) {
          _errors.push("Can't fetch data");
        }
        if (_errors.length > 0) {
          _response.status = "01";
        }
        _response.errors = _errors;
        _response.data = pResults;
        if (pResults.length == 0) {
          db.journalRecords.save(newRecord, function (err, pResults) {
            if (err) {
              res.send(err);
            }
            res.json({
              status: "00",
              data: pResults,
              message: "Record added",
            });
          });
        } else {
          // record exists
          res.json({
            status: "02",
            errors: ["Record exists"],
          });
        }
      }
    );
  }
});

// delete record
router.delete("/journal-records/delete/:id", function (req, res, next) {
  db.journalRecords.remove(
    {
      _id: new ObjectId(req.params.id),
    },
    function (err, pResults) {
      if (err) {
        res.send(err);
      }
      res.json(pResults);
    }
  );
});

// update record
router.put("/journal-records/update/:id", function (req, res, next) {
  var newRecord = req.body;
  if (newRecord._id) {
    delete newRecord._id;
  }
  if (!newRecord.accountNumber || !(newRecord.accountDescription + "")) {
    res.status(400);
    res.json({
      error: "bad data",
    });
  } else {
    db.journalRecords.update(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: newRecord,
      },
      {},
      function (err, pResults) {
        if (err) {
          res.send(err);
        }
        if (pResults.ok) {
          _response.status = "00";
          _response.message = "Record updated";
          _response.data = pResults;
          res.json(_response);
        }
        1;
      }
    );
  }
});

// find records
router.post("/journal-records/search/:id", function (req, res, next) {
  if (!req.params.id) {
    res.status(400);
    res.json({
      error: "bad data",
    });
  } else {
    db.journals.findOne(
      {
        _id: new ObjectId(req.params.id),
      },
      function (err, pResults) {
        if (err) {
          res.send(err);
        }
        if (pResults.searchParams) {
          // look for records in accounts table that match search criteria
          db.accountRecords.find(
            {
              description: {
                $regex: pResults.searchParams,
                $options: "i",
              },
            },
            function (err, pAccountRecords) {
              if (err) {
                res.send(err);
              }
              // console.log(foundRecords.length);
              // find all records journalRecords table associated with user

              var records = [];
              // let _records = new Array(pAccountRecords);
              // _records.forEach(pRecord => {
              //     // console.log(pRecord);
              //     db.journalRecords.find({
              //         accountRecordId: pRecord._id
              //     }, (err2, pJournalRecords) => {
              //         if (err2) {
              //             res.send(err2);
              //         }
              //         if (pJournalRecords.length == 0) {
              //             records.push(pJournalRecords);
              //         }
              //     });
              // });
              const promiseArray = pAccountRecords.map((pAccountRecord) => {
                return new Promise((resolve, reject) => {
                  db.journalRecords.find(
                    {
                      accountRecordId: pAccountRecord._id.toString(),
                    },
                    (err2, pJournalRecords) => {
                      if (err2) {
                        res.send(err2);
                      }
                      if (pJournalRecords.length == 0) {
                        records.push(pAccountRecord);
                      }
                      return resolve(pAccountRecord);
                    }
                  );
                });
              });

              Promise.all(promiseArray).then(function (channelIds) {
                // console.log(records);
                _response.status = "00";
                _response.message = "Record updated";
                _response.data = records;
                _response.totalRecords = records.length;
                res.json(_response);
              });
            }
          );
        }
      }
    );
  }
});

module.exports = router;
