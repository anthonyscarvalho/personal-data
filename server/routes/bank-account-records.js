var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/accounts', ['bankAccountRecords']);

function newResponse() {
    return {
        status: '00'
    };
}

// fetch records
router.post('/bank-account-records/view/:id?', function (req, res, next) {
    var body = req.body;
    var page = ((body.page) ? body.page : 1);
    var records = ((body.pagerRecords) ? parseInt(body.pagerRecords) : 20);
    var orderBy = ((body.column) ? body.column : '');
    var orderDir = ((body.dir === 'ASC') ? 1 : -1);
    var filter = {};

    var _response = newResponse();
    var _errors = [];

    if (orderBy) {
        filter[orderBy] = orderDir;
    } else {
        filter = {
            '_id': 1
        };
    }
    if (req.params.id) {
        var query = {
            accountsId: req.params.id
        };
        db.bankAccountRecords.count(query, function (err, pCount) {
            if (err) {
                _errors.push("Can't count");
            }
            _response.totalRecords = pCount;
            db.bankAccountRecords.find(query)
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
                    _response.status = '00';
                    _response.message = '';
                    _response.errors = _errors;
                    _response.data = pResults;
                    res.json(_response);
                });
        });
    }
});

// sum records for given account
router.post('/bank-account-records/sum/:id?', function (req, res, next) {
    var _response = newResponse();
    var _errors = [];

    var query = {};

    if (!req.params.id) {
        if (_errors.length > 0) {}
        _response.status = '01';
        _response.errors = _errors;
        _response.data = [];
        res.json(_response);
    } else if (req.params.id) {
        db.bankAccountRecords.count(query, function (err, pCount) {
            if (err) {
                _errors.push("Can't count");
            }
            _response.totalRecords = pCount;
            db.bankAccountRecords.aggregate([{
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
router.post('/bank-account-records/add', function (req, res, next) {
    var _response = newResponse();
    var _errors = [];
    var addedRecords = 0;
    var errorRecords = 0;
    var existingRecords = 0;
    var duplicateRecords = 0;

    var newRecord = req.body;
    if (newRecord && newRecord.length > 0) {
        var updatedRecords = (pRecord) => {
            return new Promise(pResolve => {
                if (!pRecord.accountsId || !pRecord.date1 || pRecord.balance == 0) {
                    pRecord.processed = 'false';
                    errorRecords++;
                    console.log('invalid data');
                } else {
                    db.bankAccountRecords.find({
                        accountsId: pRecord.accountsId,
                        date1: pRecord.date1,
                        date2: pRecord.date2,
                        credit: pRecord.credit,
                        debit: pRecord.debit,
                        description: pRecord.description
                    }, function (err, pResults) {
                        if (err) {
                            pRecord.processed = 'false';
                            errorRecords++;
                            console.log('error finding');
                        }
                        
                        if (pResults.length == 0) {
                            console.log('not found');
                            db.bankAccountRecords.save(pRecord, function (err, pResults) {
                                if (err) {
                                    pRecord.processed = 'false';
                                    errorRecords++;
                                    console.log('error saving');
                                }
                                console.log('saved');
                                pRecord.processed = 'true';
                                addedRecords++;
                            });
                        } else {
                            console.log('exists');
                            // record exists
                            pRecord.processed = 'exists';
                            existingRecords++;
                        }
                        
                        if (pResults.length > 1) {
                            console.log('duplicate entries');
                            pRecord.processed = 'duplicated';
                            duplicateRecords++;
                        }
                        pResolve(pRecord);
                    });
                }
            });
        };
        Promise.all(newRecord.map(pRecord => updatedRecords(pRecord))).then(pResults => {
            _response.status = '01';
            _response.data = pResults;
            _response.addedRecords = addedRecords;
            _response.errorRecords = errorRecords;
            _response.existingRecords = existingRecords;
            _response.duplicateRecords = duplicateRecords;
            res.json(_response);
        });
    }

    // if (!newRecord.accountsId || !newRecord.date1 || newRecord.balance == 0) {
    //     res.status(400);
    //     res.json({
    //         "error": "bad data"
    //     });
    // } else {
    //     db.bankAccountRecords.find({
    //         accountsId: req.body.accountsId,
    //         date1: newRecord.date1,
    //         date2: newRecord.date2,
    //         credit: newRecord.credit,
    //         debit: newRecord.debit,
    //         description: newRecord.description
    //     }, function (err, pResults) {
    //         if (err) {
    //             _errors.push("Can't fetch data");
    //             _response.status = '01';
    //             _response.errors = _errors;
    //         }
    //         _response.data = pResults;

    //         if (pResults.length == 0) {
    //             db.bankAccountRecords.save(newRecord, function (err, pResults) {
    //                 if (err) {
    //                     res.send(err);
    //                 }
    //                 _response.message = 'Record added';
    //             });
    //         } else {
    //             // record exists
    //             _response.status = '02';
    //             _response.errors = ['Record exists'];
    //         }

    //         if (pResults.length > 1) {
    //             _response.status = '03';
    //         }
    //         res.json(_response);
    //     });
    // }
});

// delete record
router.delete('/bank-account-records/delete/:id', function (req, res, next) {
    db.bankAccountRecords.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, pResults) {
        if (err) {
            res.send(err);
        }
        res.json(pResults);
    })
});

// update record
router.put('/bank-account-records/update/:id', function (req, res, next) {
    var _response = newResponse();
    var _errors = [];

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
        db.bankAccountRecords.update({
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


router.get('/bank-account-records/updateDate', function (req, res, next) {
    var _response = newResponse();
    var _errors = [];

    var newRecord = req.body;

    if (newRecord._id) {
        delete(newRecord._id);
    }

    db.bankAccountRecords.find({}, {}, {}, function (err, pResults) {
        if (err) {
            _errors.push("Can't fetch data");
        }
        if (_errors.length > 0) {
            _response.status = '01';
        }
        _response.errors = _errors;
        let counter = 0;
        if (pResults.length > 0) {
            pResults.map(pRecord => {
                if (pRecord.debit == '') {
                    debit = null;

                    db.bankAccountRecords.update({
                        _id: mongojs.ObjectId(pRecord._id)
                    }, {
                        $set: {
                            debit: debit
                        }
                    }, {}, function (err, pResult) {
                        if (err) {
                            res.send(err);
                        }
                        if (pResult.ok) {
                            counter++;
                        }
                    });
                }

            });
            _response.status = '00';
            _response.message = 'Records updated: ' + counter;
            // _response.data = pResults;
            res.json(_response);

        } else {
            // record exists
            res.json({
                status: '02',
                errors: ['Record exists']
            });
        }
    });


});

module.exports = router;
