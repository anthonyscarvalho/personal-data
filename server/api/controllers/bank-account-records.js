'use strict';
require('../models/bank-accounts-records');
var mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
var databaseModel = mongoose.model('bankAccountRecord');
var Utils = require('../utils/utils.js');
var moment = require('moment');

exports.view_record = (req, res) => {
    let _response = new Utils.newResponse();
    let body = req.body;
    let page = body.page ? body.page : 1;
    let records = body.pagerRecords ? parseInt(body.pagerRecords) : 20;
    let searchPhrase = body.searchPhrase ? body.searchPhrase : `1`;
    let filter = {
        date1: -1,
        order: -1
        // description: 1,
        // credit: 1,
        // debit: 1
    };

    let query = {};

    if (searchPhrase != `1`) {
        query = {
            $or: [
                {
                    description: {
                        $regex: new RegExp(searchPhrase, 'i')
                    }
                }
            ]
        };
    }
    if (body.bankAccount && body.bankAccount != '') {
        query['accountsId'] = body.bankAccount;
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

exports.fix_order = (req, res) => {
    let body = req.body;
    let page = body.page ? body.page : 1;
    let records = body.pagerRecords ? parseInt(body.pagerRecords) : 20;
    let searchPhrase = body.searchPhrase ? body.searchPhrase : `1`;
    let filter = {
        date1: 1,
        order: 1
        // description: 1,
        // credit: 1,
        // debit: 1
    };

    let query = {};

    if (searchPhrase != `1`) {
        query = {
            $or: [
                {
                    description: {
                        $regex: new RegExp(searchPhrase, 'i')
                    }
                }
            ]
        };
    }

    if (body.bankAccount && body.bankAccount != '') {
        query['accountsId'] = body.bankAccount;
    }

    databaseModel
        .find(query)
        .sort(filter)
        .then((pResults) => {
            let count = 0;
            pResults.forEach((pResult, pIndex) => {
                let updateRecord = {
                    order: count
                };
                if (pIndex > 0) {
                    if (pResult.debit || pResult.credit) {
                        const previousBalance = exports.round(pResults[pIndex - 1].balance);

                        const balance = exports.round(previousBalance + (pResult.debit ? pResult.debit : pResult.credit));

                        if (balance !== exports.round(pResult.balance)) {
                            console.log('Order: ' + pResult.order, 'Balance: ' + pResult.balance, 'Prev: ' + previousBalance, 'Cal: ' + balance, 'Debit: ' + pResult.debit, 'Credit: ' + pResult.credit);
                        }
                        if (pResult.balance === 0) {
                            updateRecord.balance = balance;
                        }
                    }
                }

                databaseModel
                    .updateOne(
                        {
                            _id: pResult._id
                        },
                        {
                            $set: updateRecord
                        },
                        {
                            new: true
                        }
                    )
                    .then((pResults) => {});
                count++;
            });

            Utils.returnOrderUpdated(res);
        })
        .catch((err) => {
            Utils.returnError(err, res);
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
                                accountsId: req.params.id
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                totalCredit: {
                                    $sum: '$credit'
                                },
                                totalDebit: {
                                    $sum: '$debit'
                                }
                            }
                        },
                        {
                            $addFields: {
                                balance: {
                                    $sum: ['$totalCredit', '$totalDebit']
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                totalCredit: {
                                    $round: ['$totalCredit', 2]
                                },
                                totalDebit: {
                                    $round: ['$totalDebit', 2]
                                },
                                balance: {
                                    $round: ['$balance', 2]
                                }
                            }
                        }
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

exports.get_income = (req, res) => {
    let _response = new Utils.newResponse();

    if (!req.params.id) {
        Utils.returnBadData(res);
    } else if (req.params.id) {
        const query = {
            $match: {
                $and: [
                    {
                        accountsId: req.params.id
                    },
                    {
                        year: req.body.year.toString()
                    }
                ]
            }
        };

        databaseModel
            .aggregate([
                query,
                {
                    $group: {
                        _id: { budgetMonth: '$budgetMonth' },
                        totalIncome: {
                            $sum: '$credit'
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        month: '$_id.budgetMonth',
                        totalIncome: {
                            $round: ['$totalIncome', 2]
                        }
                    }
                }
            ])
            .then((pResults) => {
                _response.data = pResults.sort((a, b) => {
                    // console.log(a, b);
                    if (Number(a.month) < Number(b.month)) {
                        return -1;
                    }
                    if (Number(a.month) > Number(b.month)) {
                        return 1;
                    }
                });
                Utils.returnSuccess(_response, res);
            })
            .catch((err) => {
                Utils.returnError(err, res);
            });
    }
};

exports.add_year_month = (req, res) => {
    var _response = new Utils.newResponse();

    var query = {
        // day: 1,
    };

    databaseModel
        .find(query)
        .then((pResults) => {
            if (pResults.length >= 1) {
                pResults.map((record) => {
                    var day = moment(record.date1, 'YYYY/MM/DD').date();
                    var month = 1 + moment(record.date1, 'YYYY/MM/DD').month();
                    var year = moment(record.date1, 'YYYY/MM/DD').year();

                    // record.year = date.year();
                    // record.month = (month < 10 ? `0` + month : month).toString();
                    // record.day = day;

                    record.budgetYear = year;
                    switch (true) {
                        case day >= 25:
                            if (month == 12) {
                                record.budgetYear = year++;
                                record.budgetMonth = '01';
                            } else {
                                const _month = month + 1;
                                record.budgetMonth = (_month < 10 ? `0` + _month : _month).toString();
                            }
                            break;

                        default:
                            record.budgetMonth = (month < 10 ? `0` + month : month).toString();
                            break;
                    }

                    databaseModel
                        .updateOne(
                            {
                                _id: new ObjectId(record._id)
                            },
                            {
                                $set: record
                            },
                            {
                                new: true
                            }
                        )
                        .then((pResults) => {
                            // console.log(JSON.stringify(pResults));
                        })
                        .catch((err) => {
                            Utils.returnError(err, res);
                        });
                });
            }
            Utils.returnSuccess(_response, res);
        })
        .catch((err) => {
            Utils.returnError(err, res);
        });
};

exports.last_record = (req, res) => {
    let _response = new Utils.newResponse();

    if (!req.params.id) {
        Utils.returnBadData(res);
    } else if (req.params.id) {
        let query = {
            accountsId: req.params.id
        };

        databaseModel
            .find(query)
            .sort({ order: -1 })
            .limit(1)
            .then((pResults) => {
                _response.data = pResults[0] ? pResults[0].order : 0;
                Utils.returnSuccess(_response, res);
            })
            .catch((err) => {
                Utils.returnError(err, res);
            });
    }
};

exports.view_dash = (req, res) => {
    let _response = new Utils.newResponse();
    let body = req.body;
    let page = body.page ? body.page : 1;
    let records = body.pagerRecords ? parseInt(body.pagerRecords) : 20;
    let orderBy = body.column ? body.column : `1`;
    let orderDir = body.dir === `ASC` ? 1 : -1;
    let searchPhrase = body.searchPhrase ? body.searchPhrase : `1`;
    let filter = {};
    let query = {};

    if (searchPhrase != `1`) {
        query = {
            $or: [
                {
                    accountDescription: {
                        $regex: new RegExp(searchPhrase, 'i')
                    }
                },
                {
                    accountNumber: {
                        $regex: new RegExp(searchPhrase, 'i')
                    }
                }
            ]
        };
    }

    if (body.state != `all`) {
        query['canceled'] = body.state;
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

exports.account_records = async (req, res) => {
    var _response = new Utils.newResponse();
    var body = req.body;
    var monthsToShow = body.months;

    var filter = {
        date1: -1,
        order: -1
    };
    var date = new Date();
    var count = 0;
    var queryYears = [];
    var queryMonths = [];

    while (count < monthsToShow) {
        if (!queryYears.includes('' + date.getFullYear())) {
            queryYears.push('' + date.getFullYear());
        }

        var dateMonth = date.getMonth() + 1;
        if (!queryMonths.includes(dateMonth)) {
            queryMonths.push(dateMonth < 10 ? '0' + dateMonth : '' + dateMonth);
        }

        date.setMonth(date.getMonth() - 1);
        count++;
    }

    var query = {
        accountsId: req.params.id,
        year: { $in: queryYears },
        month: { $in: queryMonths }
    };

    var accountRecordsCount = await databaseModel
        .countDocuments(query)
        .then((pCount) => {
            return pCount;
        })
        .catch((err) => {
            Utils.returnCountError(res);
        });

    var accountRecords = await databaseModel
        .find(query)
        .sort(filter)
        .then((pResults) => {
            return pResults;
        })
        .catch((err) => {
            Utils.returnError(err, res);
        });

    _response.totalRecords = accountRecordsCount;
    _response.data = accountRecords;
    Utils.returnSuccess(_response, res);
};

exports.filter_record = (req, res) => {
    let _response = new Utils.newResponse();
    let body = req.body;
    let page = body.page ? body.page : 1;
    let records = body.pagerRecords ? parseInt(body.pagerRecords) : 20;
    let orderBy = body.column ? body.column : `1`;
    let orderDir = body.dir === `ASC` ? 1 : -1;
    let searchPhrase = body.searchPhrase ? body.searchPhrase : `1`;
    let filter = {
        date1: 1,
        order: 1
    };
    let queryAnd = [
        {
            date1: {
                $gte: body.dateStart,
                $lte: body.dateEnd
            }
        }
    ];

    if (body.account != `` && body.account != null && body.account != undefined) {
        queryAnd.push({
            accountsId: {
                $eq: body.account
            }
        });
    }

    let query = {
        $and: queryAnd
    };

    databaseModel
        .countDocuments(query)
        .then((pCount) => {
            _response.totalRecords = pCount;
            databaseModel
                .find(query)
                .sort(filter)
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
                hash: new_record.hash
            }
        ]
    };

    if (!new_record.accountsId || !new_record.date1) {
        Utils.returnBadData(res);
    } else {
        databaseModel
            .find(query)
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
    if (!newRecord.date1) {
        Utils.returnBadData(res);
    } else {
        databaseModel
            .updateOne(
                {
                    _id: new ObjectId(req.params.id)
                },
                {
                    $set: newRecord
                },
                {
                    new: true
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

/* #region  global_utils */
exports.update_status = (req, res) => {
    Utils.update_status(req, res, databaseModel);
};

exports.delete_record = (req, res) => {
    Utils.delete_record(req, res, databaseModel);
};
/* #endregion */

exports.round = function (num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
};

/* #region budget */
exports.budget = (req, res) => {
    let _response = new Utils.newResponse();
    let body = req.body;
    let page = body.page ? body.page : 1;
    let records = body.pagerRecords ? parseInt(body.pagerRecords) : 20;

    if (!req.params.id) {
        Utils.returnBadData(res);
    } else if (req.params.id) {
        let query = {
            budgetId: req.params.id
        };

        databaseModel
            .countDocuments(query)
            .then((pCount) => {
                _response.totalRecords = pCount;
                databaseModel
                    .find(query)
                    .sort({
                        date1: -1,
                        order: -1
                    })
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
    }
};

exports.budget_search = (req, res) => {
    let _response = new Utils.newResponse();
    let body = req.body;
    let keywords = body.keywords;

    if (!keywords) {
        Utils.returnBadData(res);
    } else {
        let keywordsArray = keywords.split(',');
        if (keywordsArray.length > 0) {
            let orQuery = [];

            keywordsArray.forEach((keyword) => {
                const item = {
                    description: {
                        $regex: new RegExp(keyword, 'i')
                    }
                };

                orQuery.push(item);
            });

            let query = {
                $or: orQuery,
                $and: [
                    {
                        $or: [
                            {
                                budgetId: {
                                    $exists: false
                                }
                            },
                            {
                                budgetId: undefined
                            }
                        ]
                    }
                ]
            };

            databaseModel
                .find(query)
                .sort({
                    date1: -1,
                    order: -1
                })
                .then((pResults) => {
                    _response.totalRecords = pResults.length;
                    _response.data = pResults;
                    Utils.returnSuccess(_response, res);
                })
                .catch((err) => {
                    Utils.returnError(err, res);
                });
        }
    }
};

exports.add_to_budget = (req, res) => {
    let body = req.body;
    let records = body.records;
    let budgetId = body.budgetId;

    if (!records || !budgetId) {
        Utils.returnBadData(res);
    } else {
        databaseModel
            .updateMany(
                {
                    _id: {
                        $in: records
                    }
                },
                {
                    $set: {
                        budgetId: budgetId
                    }
                },
                {
                    multi: true
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

exports.remove_from_budget = (req, res) => {
    const body = req.body;
    const recordId = body.recordId;

    if (!recordId) {
        Utils.returnBadData(res);
    } else {
        databaseModel
            .updateOne(
                {
                    _id: recordId
                },
                {
                    $set: {
                        budgetId: undefined
                    }
                },
                {
                    new: true
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

exports.view_dashItem = (req, res) => {
    let _response = new Utils.newResponse();
    let body = req.body;

    databaseModel
        .aggregate([
            {
                $match: {
                    $and: [
                        {
                            date1: {
                                $gte: body.year + '-01-01'
                            }
                        },
                        {
                            date1: {
                                $lt: body.year + 1 + '-01-01'
                            }
                        },
                        {
                            budgetId: body.budgetId
                        }
                    ]
                }
            },
            {
                $project: {
                    _id: 0,
                    debit: {
                        $round: ['$debit', 2]
                    },
                    date1: 1
                }
            }
        ])
        .then((pResults) => {
            _response.data = pResults;
            Utils.returnSuccess(_response, res);
        })
        .catch((err) => {
            Utils.returnError(err, res);
        });
};
/* #endregion */
