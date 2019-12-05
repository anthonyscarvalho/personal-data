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

var _singleUrl = 'account';
var _multiUrl = 'accounts';

// fetch all records
router.get('/' + _multiUrl, function (req, res, next) {
    var body = req.body;
    var page = ((body.page) ? body.page : 1);
    var records = ((body.records) ? body.records : 20);
    var _errors = [];
    var filter = {};

    if (body.filter) {
        filter = body.filter;
    } else {
        filter = {};
    }
    db.accounts.find(function (err, pResults) {
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

router.post('/' + _multiUrl, function (req, res, next) {
    var body = req.body;
    var page = ((body.page) ? body.page : 1);
    var records = ((body.records) ? body.records : 20);
    var _errors = [];
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
});

// fetch single record
router.get('/' + _singleUrl + '/:id', function (req, res, next) {
    db.accounts.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, pResults) {
        if (err) {
            res.send(err);
        }
        res.json(pResults);
    })
});

// create record
router.post('/' + _singleUrl, function (req, res, next) {
    var newRecord = req.body;
    if (!newRecord.title || !(newRecord.isDone + '')) {
        res.status(400);
        res.json({
            "error": "bad data"
        });
    } else {
        db.accounts.save(newRecord, function (err, pResults) {
            if (err) {
                res.send(err);
            }
            res.json(pResults);
        });
    }
});

// delete record
router.delete('/' + _singleUrl + '/:id', function (req, res, next) {
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
router.put('/' + _singleUrl + '/:id', function (req, res, next) {
    var newRecord = req.body;
    var updRecord = {};

    if (newRecord.isDone) {
        updRecord.isDone = newRecord.isDone;
    }
    if (newRecord.title) {
        updRecord.title = newRecord.title;
    }

    if (!updRecord) {
        res.status(400);
        res.json({
            "error": "bad data"
        });
    } else {
        db.accounts.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updRecord, {}, function (err, pResults) {
            if (err) {
                res.send(err);
            }
            res.json(pResults);
        });
    }
});

module.exports = router;
