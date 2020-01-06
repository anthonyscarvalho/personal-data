var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/accounts', ['accounts']);

var _response = {
    status: '00',
    totalRecords: null,
    data: null,
    errors: null
};

var _errors = [];

// fetch records
router.post('/accounts/view/:id?', function (req, res, next) {
    if (!req.params.id) {
        var body = req.body;
        var page = ((body.page) ? body.page : 1);
        var records = ((body.records) ? body.records : 20);
        var filter = {};

        if (body.filter) {
            filter = body.filter;
        } else {
            filter = {};
        }
        db.accounts.count(filter, function (err, pCount) {
            if (err) {
                _errors.push("Can't count");
            }
            _response.totalRecords = pCount;
            db.accounts.find({}, filter, {
                skip: ((page * records) - records),
                limit: records
            }, function (err, pResults) {
                if (err) {
                    _errors.push("Can't fetch data")
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
        db.accounts.findOne({
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
router.put('/accounts/add', function (req, res, next) {
    var newRecord = req.body;
    if (!newRecord.accountNumber || !(newRecord.accountDescription + '')) {
        res.status(400);
        res.json({
            "error": "bad data"
        });
    } else {
        db.accounts.find({
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
                db.accounts.save(newRecord, function (err, pResults) {
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
router.delete('/accounts/delete/:id', function (req, res, next) {
    db.accounts.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, pResults) {
        if (err) {
            res.send(err);
        }
        res.json(pResults);
    })
});

// update record
router.put('/accounts/update/:id', function (req, res, next) {
    var newRecord = req.body;
    if (newRecord._id) {
        delete(newRecord._id);
    }
    console.log(newRecord);
    if (!newRecord.accountNumber || !(newRecord.accountDescription + '')) {
        res.status(400);
        res.json({
            "error": "bad data"
        });
    } else {
        db.accounts.update({
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
