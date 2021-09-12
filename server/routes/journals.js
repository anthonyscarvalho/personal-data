var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var config = require("../config");
var db = mongojs(config.database.host, ['journals']);

var _response = {
    status: '00',
    totalRecords: null,
    data: null,
    errors: null
};

var _errors = [];

// fetch records
router.post('/journals/view/:id?', function (req, res, next) {
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
        db.journals.count(query, function (err, pCount) {
            if (err) {
                _errors.push("Can't count");
            }
            _response.totalRecords = pCount;
            db.journals.aggregate([{
                $match: query
            }, {
                $project: {
                    _id: 1,
                    accountName: 1,
                    accountNumber: 1,
                    canceled: 1
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
        db.journals.count(query, function (err, pCount) {
            if (err) {
                _errors.push("Can't count");
            }
            _response.totalRecords = pCount;
            db.journals.find(query)
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
    } else if (req.params.id == 'dash') {
        db.journals.count(query, function (err, pCount) {
            if (err) {
                _errors.push("Can't count");
            }
            _response.totalRecords = pCount;
            db.journals.find(query, {
                    _id: 1,
                    accountName: 1,
                    canceled: 1
                })
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
        db.journals.findOne({
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
router.post('/journals/sum/:id?', function (req, res, next) {
    _errors = [];
    var query = {};
    if (!req.params.id) {
        if (_errors.length > 0) {}
        _response.status = '01';
        _response.errors = _errors;
        _response.data = [];
        res.json(_response);
    } else if (req.params.id) {
        db.journals.count(query, function (err, pCount) {
            if (err) {
                _errors.push("Can't count");
            }
            _response.totalRecords = pCount;
            db.journals.aggregate([{
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
router.post('/journals/add', function (req, res, next) {
    var newRecord = req.body;
    if (!newRecord.accountName || !newRecord.status || !newRecord.accountNumber) {
        res.status(400);
        res.json({
            status: '01',
            error: "bad data"
        });
    } else {
        db.journals.find({
            accountName: newRecord.accountName,
            accountNumber: newRecord.accountNumber,
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
                db.journals.save(newRecord, function (err, pResults) {
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
router.delete('/journals/delete/:id', function (req, res, next) {
    db.journals.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, pResults) {
        if (err) {
            res.send(err);
        }
        res.json(pResults);
    })
});

// update record
router.put('/journals/update/:id', function (req, res, next) {
    var newRecord = req.body;
    if (newRecord._id) {
        delete(newRecord._id);
    }
    if (!newRecord.accountNumber || !(newRecord.accountDescription + '')) {
        res.status(400);
        res.json({
            status: '01',
            error: ["bad data"]
        });
    } else {
        db.journals.find({
            $or: [{
                accountName: newRecord.accountName
            }, {
                accountNumber: newRecord.accountNumber
            }]
        }, {}, {}, function (err, pResults) {
            if (err) {
                _errors.push("Can't fetch data");
            }
            if (_errors.length > 0) {
                _response.status = '01';
            }
            _response.errors = _errors;
            _response.data = pResults;
            if ((pResults.length === 1) && (pResults[0]._id == req.params.id) ) {
                db.journals.update({
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

module.exports = router;
