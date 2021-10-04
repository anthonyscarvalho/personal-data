// core modules
'use strict';
var mongoose = require('mongoose');
// mongodb models
var databaseModel = mongoose.model('budget');
// utile
var Utils = require('../utils/utils.js');

exports.view_filtered = function (req, res) {
	let _response = new Utils.newResponse();
	let body = req.body;
	let page = ((body.page) ? body.page : 1);
	let records = ((body.pagerRecords) ? parseInt(body.pagerRecords) : 20);
	let orderBy = ((body.column) ? body.column : `1`);
	let orderDir = ((body.dir === `ASC`) ? 1 : -1);
	let searchPhrase = ((body.searchPhrase) ? body.searchPhrase : `1`);
	let filter = {};
	let query = {};
	if (searchPhrase !== `1` && searchPhrase !== ``) {
		query = {
			$or: [{
					accountDescription: {
						$regex: new RegExp(searchPhrase, `i`)
					}
				},
				{
					accountNumber: {
						$regex: new RegExp(searchPhrase, `i`)
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

exports.view_dash = function (req, res) {
	let _response = new Utils.newResponse();
	let body = req.body;
	let filter = {
		description: 1
	};
	let query = {
		canceled: 'false'
	};

	databaseModel.countDocuments(query, function (err, pCount) {
		if (err) {
			Utils.returnError(`can't count`, res);
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

exports.view_all = function (req, res) {
	let _response = new Utils.newResponse();
	let body = req.body;
	let filter = {
		accountDescription: 1
	};
	let query = {};

	databaseModel.countDocuments(query, function (err, pCount) {
		if (err) {
			Utils.returnError(`can't count`, res);
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

exports.edit_record = function (req, res) {
	let _response = new Utils.newResponse();
	databaseModel.findById(req.params.id, function (err, pResults) {
		if (err) {
			Utils.returnError(err, res);
		}

		_response.data = pResults;
		Utils.returnSuccess(_response, res);
	});
};

exports.add_record = function (req, res) {
	let _response = new Utils.newResponse();
	let new_record = new databaseModel(req.body);

	let query = {
		$and: [{
			description: new_record.description
		}]
	};

	if (!new_record.description) {
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

exports.update_record = function (req, res) {
	let newRecord = req.body;
	if (newRecord._id) {
		delete(newRecord._id);
	}
	if (!newRecord.description) {
		Utils.returnError(`bad data`, res);
	} else {
		let _response = new Utils.newResponse();
		databaseModel.updateOne({
			_id: req.params.id
		}, {
			$set: newRecord
		}, {
			new: true
		}, function (err, pResults) {
			if (err) {
				Utils.returnError(err, res);
			}

			if (pResults.ok) {
				_response.message = `Record updated`;
				_response.data = pResults;
				Utils.returnSuccess(_response, res);
			}
		});
	}
};

exports.update_status = function (req, res) {
	let newRecord = req.body;
	if (!newRecord.action) {
		Utils.returnError(`bad data`, res);
	} else {
		let _response = new Utils.newResponse();
		databaseModel.updateOne({
			_id: req.params.id
		}, {
			$set: {
				canceled: newRecord.action
			}
		}, {
			new: true
		}, function (err, pResults) {
			if (err) {
				Utils.returnError(err, res);
			}

			if (pResults.ok) {
				_response.status = `00`;
				_response.message = `Record updated`;
			} else {
				_response.status = `01`;
				_response.message = `Record not updated`;
			}

			Utils.returnSuccess(_response, res);
		});
	}
};

exports.delete_record = function (req, res) {
	if (!req.params.id) {
		Utils.returnError(`bad data`, res);
	} else {
		let _response = new Utils.newResponse();
		databaseModel.remove({
			_id: req.params.id
		}, function (err, pResults) {
			if (err) {
				Utils.returnError(err, res);
			}

			if (pResults.ok) {
				_response.message = `Record delete`;
				_response.data = pResults;
				Utils.returnSuccess(_response, res);
			}
		});
	}
};
