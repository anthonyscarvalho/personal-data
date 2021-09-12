'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BankAccountRecordSchema = new Schema({
	statementId: {
		type: Number
	},
	accountsId: {
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
	journal: {
		type: Boolean
	},
	comments: {
		type: String
	},
	processed: {
		type: Boolean
	}
});

module.exports = mongoose.model('bankAccountRecord', BankAccountRecordSchema, 'bankAccountRecords');
