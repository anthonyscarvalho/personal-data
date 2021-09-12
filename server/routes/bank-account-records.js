const {
    resolveInclude
} = require('ejs');
let express = require('express');
let router = express.Router();
let mongojs = require('mongojs');
var config = require("../config");
let db = mongojs(config.database.host, ['bankAccountRecords']);

function newResponse() {
    return {
        status: '00'
    };
}

// fetch records
router.post('/bank-account-records/view/:id?', function (req, res, next) {
    viewRecords(req, res, next);
});

// sum records for given account
router.post('/bank-account-records/sum/:id?', function (req, res, next) {
    sumAccountRecords(req, res, next);
});

// create record
router.post('/bank-account-records/add', function (req, res, next) {
    addAccountRecord(req, res, next);
});

// delete record
router.delete('/bank-account-records/delete/:id', function (req, res, next) {
    let _response = newResponse();
    let _errors = [];

    db.bankAccountRecords.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, pResults) {
        if (err) {
            res.send(err);
        }
        if (pResults.ok) {
            _response.status = '00';
            _response.message = 'Record deleted';
            _response.data = pResults;
            res.json(_response);
        }
    })
});

// update record
router.put('/bank-account-records/update/:id', function (req, res, next) {
    let newRecord = req.body;

    if (newRecord._id) {
        delete(newRecord._id);
    }
    if (!newRecord.accountNumber || !(newRecord.accountDescription + '')) {
        res.status(400);
        res.json({
            "error": "bad data"
        });
    } else {
        updateRecord(newRecord, req.params.id, res, next);
    }
});

// delete record
router.delete(`/profiles/delete/:id`, function (req, res, next) {
    if (!req.params.id) {
        res.status(400);
        res.json({
            "error": "bad data"
        });
    } else {
        updateRecord(newRecord, req.params.id, res, next);
    }
});

router.get('/bank-account-records/updateDate', function (req, res, next) {
    let _response = newResponse();
    let _errors = [];

    let newRecord = req.body;

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

function viewRecords(req, res, next) {
    let body = req.body;
    let page = ((body.page) ? body.page : 1);
    let records = ((body.pagerRecords) ? parseInt(body.pagerRecords) : 20);
    let orderBy = ((body.column) ? body.column : '');
    let orderDir = ((body.dir === 'ASC') ? 1 : -1);
    let sort = {};

    let _response = newResponse();
    let _errors = [];

    // if (orderBy) {
    //     filter[orderBy] = orderDir;
    // } else {
    //     filter = {
    //         '_id': 1
    //     };
    // }

    sort = {
        date1: 1,
        description: 1,
        credit: 1,
        debit: 1
    }

    if (req.params.id) {
        let query = {
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
                .sort(sort)
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
}

function sumAccountRecords(req, res, next) {
    let _response = newResponse();
    let _errors = [];

    let query = {};

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
}

function addAccountRecord(req, res, next) {
    let _response = newResponse();
    let _errors = [];

    let newRecord = req.body;
    if (!newRecord.accountsId || !newRecord.date1) {
        res.status(400);
        res.json({
            status: '01',
            errors: ['Bad data']
        });
    } else {
        db.bankAccountRecords.find({
            accountsId: newRecord.accountsId,
            date1: newRecord.date1,
            date2: newRecord.date2,
            credit: newRecord.credit,
            debit: newRecord.debit,
            balance: newRecord.balance,
            description: newRecord.description
        }, function (err, pResults) {
            if (err) {
                _errors.push('Find error');
                _response.status = '01';
            }

            if (pResults.length == 0) {
                db.bankAccountRecords.save(newRecord, function (err, pSaveResults) {
                    if (err) {
                        _errors.push('Error adding record');
                        _response.status = '01';
                    }
                    _response['data'] = newRecord;
                    _response['message'] = 'Record added';
                    _response.status = '00';
                    res.json(_response);
                });
            } else {
                // record exists
                _response.status = '02';
                _errors.push('Record exists');
                if (pResults.length > 1) {
                    _response.status = '03';
                    _errors.push('Duplicate entries for record');
                }

                _response.errors = _errors;
                res.json(_response);
            }
        });
    }
}
// function addAccountRecord(req, res, next) {
//     let _response = newResponse();
//     let _errors = [];
//     let addedRecords = 0;
//     let errorRecords = 0;
//     let existingRecords = 0;
//     let duplicateRecords = 0;

//     let newRecord = req.body;
//     if (newRecord && newRecord.length > 0) {
//         let updatedRecords = (pRecord) => {
//             return new Promise((resolve, reject) => {
//                 if (!pRecord.accountsId || !pRecord.date1) {
//                     pRecord.processed = 'false';
//                     errorRecords++;
//                     console.log('invalid data');
//                 } else {

//                     db.bankAccountRecords.find({
//                         accountsId: pRecord.accountsId,
//                         date1: pRecord.date1,
//                         date2: pRecord.date2,
//                         credit: parseInt(pRecord.credit),
//                         debit: parseInt(pRecord.debit),
//                         balance: parseInt(pRecord.balance),
//                         description: pRecord.description
//                     }, function (err, pResults) {
//                         console.log(pRecord, pResults[0]);
//                         if (err) {
//                             pRecord.processed = 'false';
//                             errorRecords++;
//                             console.log('error finding');
//                         }

//                         if (pResults.length == 0) {
//                             console.log('not found');
//                             db.bankAccountRecords.save(pRecord, function (err, pResults) {
//                                 if (err) {
//                                     pRecord.processed = 'false';
//                                     errorRecords++;
//                                     console.log('error saving');
//                                 }
//                                 pRecord.processed = 'true';
//                             });
//                             addedRecords++;
//                         } else {
//                             console.log('exists');
//                             // record exists
//                             pRecord.processed = 'exists';
//                             existingRecords++;
//                         }

//                         if (pResults.length > 1) {
//                             console.log('duplicate entries');
//                             pRecord.processed = 'duplicated';
//                             duplicateRecords++;
//                         }
//                         resolve(pRecord);
//                     });
//                 }
//             });
//         };
//         Promise.all(newRecord.map(pRecord => {
//             updatedRecords(pRecord);
//         })).then(pResults => {
//             _response.status = '01';
//             _response.data = pResults;
//             _response.addedRecords = addedRecords;
//             _response.errorRecords = errorRecords;
//             _response.existingRecords = existingRecords;
//             _response.duplicateRecords = duplicateRecords;
//             res.json(_response);
//         });
//     }
// }

function updateRecord(newRecord, pProfileId, res, next) {
    let _response = newResponse();
    let _errors = [];

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
    });
}

module.exports = router;
