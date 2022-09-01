'use strict';
require('../models/companies');
var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
var databaseModel = mongoose.model('company');
var Utils = require('../utils/utils.js');

exports.view = (req, res) => {
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
				description: {
					$regex: new RegExp(searchPhrase, `i`)
				}
			}]
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

exports.view_active = (req, res) => {
	let _response = new Utils.newResponse();
	let filter = {
		company: 1,
	};
	let query = {
		canceled: 'false',
	};

	databaseModel.find(query).sort(filter).exec(function (err, pResults) {
		if (err) {
			Utils.returnError(err, res);
		}

		_response.data = pResults;
		Utils.returnSuccess(_response, res);
	});
};

exports.dash = (req, res) => {
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

exports.edit = (req, res) => {
	let _response = new Utils.newResponse();

	databaseModel.findById(req.params.id, function (err, pResults) {
		if (err) {
			Utils.returnError(err, res);
		}

		_response.data = pResults;
		Utils.returnSuccess(_response, res);
	});
};

exports.add = (req, res) => {
	let _response = new Utils.newResponse();
	let new_record = new databaseModel(req.body);

	let query = {
		$and: [{
			company: new_record.company
		}]
	};

	if (!new_record.company) {
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

exports.update = (req, res) => {
	let _response = new Utils.newResponse();
	let newRecord = req.body;

	if (newRecord._id) {
		delete(newRecord._id);
	}
	if (!newRecord.company) {
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
				Utils.returnError(`Can't update`, res);
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

exports.status = (req, res) => {
	Utils.update_status(req, res, databaseModel);
};

exports.delete = (req, res) => {
	Utils.delete_record(req, res, databaseModel);
};
