'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'journalRecord';
var tableName = 'journalRecords';

module.exports = mongoose.model(modelName,
	new Schema({
		journalId: {
			type: String
		},
		accountRecordId: {
			type: String
		},
		date: {
			type: String
		},
		description: {
			type: String
		},
		credit: {
			type: String
		},
		debit: {
			type: String
		},
	}),
	tableName);
