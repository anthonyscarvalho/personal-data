'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'bankAccountRecord';
var tableName = 'bankAccountRecords';

module.exports = mongoose.model(modelName,
	new Schema({
		statementId: {
			type: Number
		},
		accountsId: {
			type: String
		},
		transactionId: {
			type: String
		},
		order: {
			type: Number
		},
		date1: {
			type: String
		},
		date2: {
			type: String
		},
		description: {
			type: String
		},
		credit: {
			type: Number
		},
		debit: {
			type: Number
		},
		balance: {
			type: Number
		},
		serviceFee: {
			type: Boolean
		},
		journalId: {
			type: String
		},
		budgetId: {
			type: String
		},
		comments: {
			type: String
		},
		processed: {
			type: Boolean
		},
		originalRecord: {
			type: String
		},
	}),
	tableName);
