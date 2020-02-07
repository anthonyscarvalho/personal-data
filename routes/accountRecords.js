var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/accounts', ['accountRecords']);

var _response = {
    status: '00',
    totalRecords: null,
    data: null,
    errors: null
};

var _errors = [];

// fetch records
router.post('/accountRecords/view/:id?', function (req, res, next) {
    var body = req.body;
    var page = ((body.page) ? body.page : 1);
    var records = ((body.pagerRecords) ? parseInt(body.pagerRecords) : 20);
    var orderBy = ((body.column) ? body.column : '');
    var orderDir = ((body.dir === 'ASC') ? 1 : -1);
    var searchPhrase = ((body.searchPhrase) ? body.searchPhrase : '');
    var filter = {};
    var query = {};
    _errors = [];

    if (searchPhrase != '') {
        query = {
            accountDescription: searchPhrase,
            accountNumber: searchPhrase
        };
    }

    if (orderBy) {
        filter[orderBy] = orderDir;
    } else {
        filter = {
            '_id': 1
        };
    }
    if (!req.params.id) {
        db.accountRecords.count(query, function (err, pCount) {
            if (err) {
                _errors.push("Can't count");
            }
            _response.totalRecords = pCount;
            db.accountRecords.aggregate([{
                $match: query
            }, {
                $project: {
                    _id: 1,
                    date1: 1,
                    date2: 1,
                    accountsId: {
                        $toObjectId: '$accountsId'
                    },
                    credit: 1,
                    debit: 1,
                    journal: 1
                }
            }, {
                $lookup: {
                    from: "accounts",
                    localField: "accountsId",
                    foreignField: "_id",
                    as: "accountInfo"
                }
            }, {
                $project: {
                    'accountInfo.status': 0,
                    'accountInfo.canceled': 0,
                    'accountInfo.canceledDate': 0,
                    'accountInfo.dateClosed': 0,
                    'accountInfo.dateOpened': 0,
                    'accountInfo.csvType': 0,
                    'accountInfo.accountDescription': 0,
                }
            }, {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [{
                            $arrayElemAt: ["$accountInfo", 0]
                        }, "$$ROOT"]
                    }
                }
            }, {
                $project: {
                    accountInfo: 0
                }
            }, {
                $sort: filter
            }, {
                $skip: ((page * records) - records)
            }, {
                $limit: records
            }], function (err, pResults) {
                if (err) {
                    _errors.push(err);
                }
                if (_errors.length > 0) {
                    _response.status = '01';
                }
                _response.errors = _errors;
                _response.data = pResults;
                res.json(_response);
            });
        });
    } else if (req.params.id == 'all') {
        db.accountRecords.count(query, function (err, pCount) {
            if (err) {
                _errors.push("Can't count");
            }
            _response.totalRecords = pCount;
            db.accountRecords.find(query)
                .sort({
                    'accountDescription': 1
                })
                .toArray(function (err, pResults) {
                    if (err) {
                        _errors.push(err);
                    }
                    if (_errors.length > 0) {
                        _response.status = '01';
                    }
                    _response.errors = _errors;
                    _response.data = pResults;
                    res.json(_response);
                });
        });
    } else {
        db.accountRecords.findOne({
            _id: mongojs.ObjectId(req.params.id)
        }, function (err, pResults) {
            if (err) {
                res.send(err);
            }
            _response.status = '00';
            _response.data = pResults;
            res.json(_response);
        });
    }
});

// sum records for given account
router.post('/accountRecords/sum/:id?', function (req, res, next) {
    _errors = [];
    var query = {};
    if (!req.params.id) {
        if (_errors.length > 0) {}
        _response.status = '01';
        _response.errors = _errors;
        _response.data = [];
        res.json(_response);
    } else if (req.params.id) {
        db.accountRecords.count(query, function (err, pCount) {
            if (err) {
                _errors.push("Can't count");
            }
            _response.totalRecords = pCount;
            db.accountRecords.aggregate([{
                $match: {
                    accountsId: req.params.id
                }
            }, {
                $group: {
                    _id: null,
                    totalCredit: {
                        $sum: "$credit"
                    },
                    totalDebit: {
                        $sum: "$debit"
                    }
                }
            }, {
                $addFields: {
                    balance: {
                        $sum: ["$totalCredit", "$totalDebit"]
                    }
                }
            }, {
                $project: {
                    _id: 0,
                    totalCredit: {
                        $round: ["$totalCredit", 2]
                    },
                    totalDebit: {
                        $round: ["$totalDebit", 2]
                    },
                    balance: {
                        $round: ["$balance", 2]
                    }
                }
            }], function (err, pResults) {
                if (err) {
                    _errors.push(err);
                }
                if (_errors.length > 0) {
                    _response.status = '01';
                }
                _response.errors = _errors;
                if (pResults.length === 1) {
                    _response.data = pResults[0];
                } else {
                    _response.data = {};
                }
                res.json(_response);
            });
        });
    }
});

// create record
router.post('/accountRecords/add', function (req, res, next) {
    var newRecord = req.body;
    if (!newRecord.accountsId || !newRecord.date1) {
        res.status(400);
        res.json({
            "error": "bad data"
        });
    } else {
        db.accountRecords.find({
            accountsId: req.body.accountsId,
            date1: newRecord.date1,
            credit: newRecord.credit,
            debit: newRecord.debit
        }, {}, {}, function (err, pResults) {
            if (err) {
                _errors.push("Can't fetch data");
            }
            if (_errors.length > 0) {
                _response.status = '01';
            }
            _response.errors = _errors;
            _response.data = pResults;
            if (pResults.length == 0) {
                db.accountRecords.save(newRecord, function (err, pResults) {
                    if (err) {
                        res.send(err);
                    }
                    res.json({
                        status: '00',
                        data: pResults,
                        message: 'Record added'
                    });
                });
            } else {
                // record exists
                res.json({
                    status: '02',
                    errors: ['Record exists']
                });
            }
        });
    }
});

// delete record
router.delete('/accountRecords/delete/:id', function (req, res, next) {
    db.accountRecords.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, pResults) {
        if (err) {
            res.send(err);
        }
        res.json(pResults);
    })
});

// update record
router.put('/accountRecords/update/:id', function (req, res, next) {
    var newRecord = req.body;
    if (newRecord._id) {
        delete(newRecord._id);
    }
    if (!newRecord.accountNumber || !(newRecord.accountDescription + '')) {
        res.status(400);
        res.json({
            "error": "bad data"
        });
    } else {
        db.accountRecords.update({
            _id: mongojs.ObjectId(req.params.id)
        }, {
            $set: newRecord
        }, {}, function (err, pResults) {
            if (err) {
                res.send(err);
            }
            if (pResults.ok) {
                _response.status = '00';
                _response.message = 'Record updated';
                _response.data = pResults;
                res.json(_response);
            }
            1
        });
    }
});

module.exports = router;
