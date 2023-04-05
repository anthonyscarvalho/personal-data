'use strict';
require('../models/bank-accounts-records');
var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
var databaseModel = mongoose.model('bankAccountRecord');
var Utils = require('../utils/utils.js');

exports.view_record = (req, res) => {
	let _response = new Utils.newResponse();
	let body = req.body;
	let page = ((body.page) ? body.page : 1);
	let records = ((body.pagerRecords) ? parseInt(body.pagerRecords) : 20);
	let searchPhrase = ((body.searchPhrase) ? body.searchPhrase : `1`);
	let filter = {
		date1: -1,
		order: -1,
		// description: 1,
		// credit: 1,
		// debit: 1
	};

	let query = {};

	if (searchPhrase != `1`) {
		query = {
			$or: [{
				description: {
					$regex: new RegExp(searchPhrase, 'i')
				}
			}, ]
		};
	}
	if (body.bankAccount && body.bankAccount != '') {
		query['accountsId'] = body.bankAccount;
	}

	databaseModel.countDocuments(query, function (err, pCount) {
		if (err) {
			Utils.returnError(`Can't count`, res);
		}

		_response.totalRecords = pCount;
		databaseModel.find(query)
			.sort(filter)
			.skip(((page * records) - records))
			.limit(records)
			.exec(function (err, pResults) {
				if (err) {
					Utils.returnError(err, res);
				}

				_response.data = pResults;
				Utils.returnSuccess(_response, res);
			});
	});
};

exports.fix_order = (req, res) => {
	let _response = new Utils.newResponse();
	let body = req.body;
	let page = ((body.page) ? body.page : 1);
	let records = ((body.pagerRecords) ? parseInt(body.pagerRecords) : 20);
	let searchPhrase = ((body.searchPhrase) ? body.searchPhrase : `1`);
	let filter = {
		date1: 1,
		order: 1,
		// description: 1,
		// credit: 1,
		// debit: 1
	};

	let query = {};

	if (searchPhrase != `1`) {
		query = {
			$or: [{
				description: {
					$regex: new RegExp(searchPhrase, 'i')
				}
			}, ]
		};
	}

	if (body.bankAccount && body.bankAccount != '') {
		query['accountsId'] = body.bankAccount;
	}

	databaseModel.find(query)
		.sort(filter)
		.exec((err, pResults) => {
			if (err) {
				Utils.returnError(err, res);
			}
			let count = 0;
			pResults.forEach((pResult, pIndex) => {
				let updateRecord = {
					order: count
				};
				if (pIndex > 0) {
					if (pResult.debit || pResult.credit) {
						const previousBalance = exports.round(pResults[pIndex - 1].balance);

						const balance = exports.round(previousBalance + ((pResult.debit) ? pResult.debit : pResult.credit));

						if (balance !== exports.round(pResult.balance)) {
							console.log('Order: ' + pResult.order, 'Balance: ' + pResult.balance, 'Prev: ' + previousBalance, 'Cal: ' + balance, 'Debit: ' + pResult.debit, 'Credit: ' + pResult.credit);
						}
						if (pResult.balance === 0) {
							updateRecord.balance = balance;
						}
					}
				}

				databaseModel.updateOne({
					_id: pResult._id
				}, {
					$set: updateRecord
				}, {
					new: true
				}, (err, pResults) => {});
				count++;
			});

			_response.message = 'Order Updated';
			Utils.returnSuccess(_response, res);
		});
};

exports.sum_records = (req, res) => {
	let _response = new Utils.newResponse();

	if (!req.params.id) {
		Utils.returnError(`Bad data`, res);
	} else if (req.params.id) {
		let query = {};

		databaseModel.countDocuments(query, function (err, pCount) {
			if (err) {
				Utils.returnError(`Can't count`, res);
			}

			_response.totalRecords = pCount;
			databaseModel.aggregate([{
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
					Utils.returnError(err, res);
				}

				if (pResults.length === 1) {
					_response.data = pResults[0];
				} else {
					_response.data = {};
				}
				Utils.returnSuccess(_response, res);
			});
		});
	}
};

exports.last_record = (req, res) => {
	let _response = new Utils.newResponse();

	if (!req.params.id) {
		Utils.returnError(`Bad data`, res);
	} else if (req.params.id) {
		let query = {
			accountsId: req.params.id
		};

		databaseModel.find(query)
			.sort({
				order: -1
			})
			.limit(1)
			.exec(function (err, pResults) {
				if (err) {
					Utils.returnError(err, res);
				}

				_response.data = (pResults[0]) ? pResults[0].order : 0;
				Utils.returnSuccess(_response, res);
			});
	}
};

exports.view_dash = (req, res) => {
	let _response = new Utils.newResponse();
	let body = req.body;
	let page = ((body.page) ? body.page : 1);
	let records = ((body.pagerRecords) ? parseInt(body.pagerRecords) : 20);
	let orderBy = ((body.column) ? body.column : `1`);
	let orderDir = ((body.dir === `ASC`) ? 1 : -1);
	let searchPhrase = ((body.searchPhrase) ? body.searchPhrase : `1`);
	let filter = {};
	let query = {};

	if (searchPhrase != `1`) {
		query = {
			$or: [{
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
		query["canceled"] = body.state;
	}

	if (orderBy) {
		filter[orderBy] = orderDir;
	} else {
		filter = {};
	}
	databaseModel.countDocuments(query, function (err, pCount) {
		if (err) {
			Utils.returnError(`Can't count`, res);
		}

		_response.totalRecords = pCount;
		databaseModel.find(query)
			.sort(filter)
			.exec(function (err, pResults) {
				if (err) {
					Utils.returnError(err, res);
				}

				_response.data = pResults;
				Utils.returnSuccess(_response, res);
			});
	});
};

exports.filter_record = (req, res) => {
	let _response = new Utils.newResponse();
	let body = req.body;
	let page = ((body.page) ? body.page : 1);
	let records = ((body.pagerRecords) ? parseInt(body.pagerRecords) : 20);
	let orderBy = ((body.column) ? body.column : `1`);
	let orderDir = ((body.dir === `ASC`) ? 1 : -1);
	let searchPhrase = ((body.searchPhrase) ? body.searchPhrase : `1`);
	let filter = {
		date1: 1,
		order: 1,
	};
	let queryAnd = [{
		date1: {
			$gte: body.dateStart,
			$lte: body.dateEnd
		}
	}, ];

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

	databaseModel.countDocuments(query, function (err, pCount) {
		if (err) {
			Utils.returnError(`Can't count`, res);
		}

		_response.totalRecords = pCount;
		databaseModel.find(query)
			.sort(filter)
			.exec(function (err, pResults) {
				if (err) {
					Utils.returnError(err, res);
				}

				_response.data = pResults;
				Utils.returnSuccess(_response, res);
			});
	});
};

exports.edit_record = (req, res) => {
	let _response = new Utils.newResponse();

	databaseModel.findById(req.params.id, function (err, pResults) {
		if (err) {
			Utils.returnError(err, res);
		}

		_response.data = pResults;
		Utils.returnSuccess(_response, res);
	});
};

exports.add_record = (req, res) => {
	let _response = new Utils.newResponse();
	let new_record = new databaseModel(req.body);

	let query = {
		$and: [{
			accountsId: new_record.accountsId
		}, {
			date1: new_record.date1
		}, {
			date2: new_record.date2
		}, {
			credit: new_record.credit
		}, {
			debit: new_record.debit
		}, {
			balance: new_record.balance
		}, {
			description: new_record.description
		}]
	};

	if (!new_record.accountsId || !new_record.date1) {
		Utils.returnError(`Bad data`, res);
	} else {
		databaseModel.find(query, {}, {}, function (err, pResults) {
			if (err) {
				Utils.returnError(err, res);
			}
			if (pResults) {
				_response.data = pResults;

				if (pResults.length == 0) {
					new_record.save(function (err, pResults) {
						if (err) {
							Utils.returnError(err, res);
						}

						_response.message = `Record updated`;
						_response.data = pResults;
						Utils.returnSuccess(_response, res);
					});
				} else if (pResults.length == 1) {
					_response.status = `02`;
					_response.message = `Record exists`;
					Utils.returnSuccess(_response, res);
				} else if (pResults.length > 1) {
					_response.status = `03`;
					_response.message = `Duplicate entries for record`;
					Utils.returnSuccess(_response, res);
				}
			} else {
				Utils.returnError(`find results error`, res);
			}
		});
	}
};

exports.update_record = (req, res) => {
	let _response = new Utils.newResponse();
	let newRecord = req.body;

	if (newRecord._id) {
		delete(newRecord._id);
	}
	if (!newRecord.date1) {
		Utils.returnError(`Bad data`, res);
	} else {
		databaseModel.updateOne({
			_id: ObjectID(req.params.id)
		}, {
			$set: newRecord
		}, {
			new: true
		}, function (err, pResults) {
			if (err) {
				Utils.returnError(`Can't count`, res);
			}

			if (pResults.acknowledged) {
				_response.message = `Record updated`;
			} else {
				_response.status = `01`;
				_response.message = `Record not updated`;
			}

			Utils.returnSuccess(_response, res);
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
	return (Math.round((num + Number.EPSILON) * 100) / 100);
}

/* #region budget */
exports.budget = (req, res) => {
	let _response = new Utils.newResponse();
	let body = req.body;
	let page = ((body.page) ? body.page : 1);
	let records = ((body.pagerRecords) ? parseInt(body.pagerRecords) : 20);

	if (!req.params.id) {
		Utils.returnError(`Bad data`, res);
	} else if (req.params.id) {
		let query = {
			budgetId: req.params.id
		};

		databaseModel.countDocuments(query, function (err, pCount) {
			if (err) {
				Utils.returnError(`Can't count`, res);
			}

			_response.totalRecords = pCount;
			databaseModel.find(query)
				.sort({
					date1: -1,
					order: -1
				})
				.skip(((page * records) - records))
				.limit(records)
				.exec(function (err, pResults) {
					if (err) {
						Utils.returnError(err, res);
					}

					_response.data = pResults;
					Utils.returnSuccess(_response, res);
				});
		});
	}
};

exports.budget_search = (req, res) => {
	let _response = new Utils.newResponse();
	let body = req.body;
	let keywords = body.keywords;

	if (!keywords) {
		Utils.returnError(`Bad data`, res);
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
				$and: [{
					$or: [{
							budgetId: {
								$exists: false
							}
						},
						{
							budgetId: undefined
						}
					]
				}],
			};

			databaseModel.find(query)
				.sort({
					date1: -1,
					order: -1
				})
				.exec(function (err, pResults) {
					if (err) {
						Utils.returnError(err, res);
					}

					_response.totalRecords = pResults.length;
					_response.data = pResults;
					Utils.returnSuccess(_response, res);
				});
		}
	}
};

exports.add_to_budget = (req, res) => {
	let _response = new Utils.newResponse();
	let body = req.body;
	let records = body.records;
	let budgetId = body.budgetId;

	if (!records || !budgetId) {
		Utils.returnError(`Bad data`, res);
	} else {
		databaseModel.updateMany({
			_id: {
				$in: records
			}
		}, {
			$set: {
				budgetId: budgetId
			}
		}, {
			multi: true
		}, function (err, pResults) {
			if (err) {
				Utils.returnError(`Can't count`, res);
			}
			
			if (pResults.acknowledged) {
				_response.message = `Record updated`;
			} else {
				_response.status = `01`;
				_response.message = `Record not updated`;
			}

			return Utils.returnSuccess(_response, res);
		});
	}
};

exports.remove_from_budget = (req, res) => {
	let _response = new Utils.newResponse();
	const body = req.body;
	const recordId = body.recordId;


	if (!recordId) {
		Utils.returnError(`Bad data`, res);
	} else {
		databaseModel.updateOne({
			_id: recordId
		}, {
			$set: {
				budgetId: undefined
			}
		}, {
			new: true
		}, function (err, pResults) {
			if (err) {
				Utils.returnError(`Can't count`, res);
			}

			if (pResults.acknowledged) {
				_response.message = `Record updated`;
			} else {
				_response.status = `01`;
				_response.message = `Record not updated`;
			}

			return Utils.returnSuccess(_response, res);
		});
	}
};

exports.view_dashItem = (req, res) => {
	let _response = new Utils.newResponse();
	let body = req.body;

	databaseModel.aggregate([{
		$match: {
			$and: [{
					date1: {
						$gte: body.year + '-01-01'
					}
				},
				{
					date1: {
						$lt: (body.year + 1) + '-01-01'
					}
				},
				{
					budgetId: body.budgetId
				}
			]
		}
	}, {
		$project: {
			_id: 0,
			debit: {
				$round: ["$debit", 2]
			},
			date1: 1
		}
	}], function (err, pResults) {
		if (err) {
			Utils.returnError(err, res);
		}

		_response.data = pResults
		Utils.returnSuccess(_response, res);
	});
};
/* #endregion */
