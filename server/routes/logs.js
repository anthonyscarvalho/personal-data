var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var config = require("../config");
var db = mongojs(config.database.host, ['logs']);

var _response = {
    status: '00',
    totalRecords: null,
    data: null,
    errors: null
};

var _singleUrl = 'log';
var _multiUrl = 'logs';

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
    db.logs.find(function (err, pResults) {
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
    db.logs.count(filter, function (err, pCount) {
        if (err) {
            _errors.push("Can't count");
        }
        _response.totalRecords = pCount;
        db.logs.find({}, filter, {
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
    db.logs.findOne({
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
        db.logs.save(newRecord, function (err, pResults) {
            if (err) {
                res.send(err);
            }
            res.json(pResults);
        });
    }
});

// delete record
router.delete('/' + _singleUrl + '/:id', function (req, res, next) {
    db.logs.remove({
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
        db.logs.update({
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
