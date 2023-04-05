var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var config = require("../config");
var db = mongojs(config.database.host, ['bankAccounts']);

var _response = {
    status: '00',
    totalRecords: null,
    data: null,
    errors: null,
    message: null
};

var _errors = [];

// fetch records
router.post('/bank-accounts/view', function (req, res, next) {
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
        filter = {};
    }
    db.bankAccounts.count(query, function (err, pCount) {
        if (err) {
            _errors.push("Can't count");
        }
        _response.totalRecords = pCount;
        db.bankAccounts.find(query)
            .skip(((page * records) - records))
            .limit(records)
            .sort(filter)
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
});

router.post('/bank-accounts/view/dash', function (req, res, next) {
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
        filter = {};
    }

    db.bankAccounts.count(query, function (err, pCount) {
        if (err) {
            _errors.push("Can't count");
        }
        _response.totalRecords = pCount;
        db.bankAccounts.find(query, {
                _id: 1,
                accountDescription: 1,
                status: 1
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
});

router.post('/bank-accounts/edit/:id?', function (req, res, next) {
    if (req.params.id) {
        db.bankAccounts.findOne({
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

// create record
router.post('/bank-accounts/add', function (req, res, next) {
    var newRecord = req.body;
    if (!newRecord.accountNumber || !(newRecord.accountDescription + '')) {
        res.status(400);
        res.json({
            status: '01',
            errors: ['Bad data']
        });
    } else {
        db.bankAccounts.find({
            accountNumber: req.body.accountNumber
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
                db.bankAccounts.save(newRecord, function (err, pResults) {
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

// update record
router.put('/bank-accounts/update/:id', function (req, res, next) {
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
        db.bankAccounts.update({
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

// delete record
router.delete('/bank-accounts/delete/:id', function (req, res, next) {
    if (!req.params.id) {
        res.status(400);
        res.json({
            "error": "bad data"
        });
    } else {
        db.bankAccounts.remove({
            _id: mongojs.ObjectId(req.params.id)
        }, function (err, pResults) {
            if (err) {
                res.send(err);
            }
            res.json(pResults);
        })
    }
});

// cancel record
router.put('/bank-accounts/cancel/:id', function (req, res, next) {
    var newRecord = {
        canceled: 'true',
        canceledDate: new Date()
    };
    if (!req.params.id) {
        res.status(400);
        res.json({
            "error": "bad data"
        });
    } else {
        db.bankAccounts.update({
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

// enable record
router.put('/bank-accounts/enable/:id', function (req, res, next) {
    var newRecord = {
        canceled: 'false',
        canceledDate: ''
    };
    if (!req.params.id) {
        res.status(400);
        res.json({
            "error": "bad data"
        });
    } else {
        db.bankAccounts.update({
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
