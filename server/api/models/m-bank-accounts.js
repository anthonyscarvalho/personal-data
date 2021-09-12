'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BankAccountSchema = new Schema({
	accountNumber: {
		type: String,
		required: 'Enter account number'
	},
	accountDescription: {
		type: String
	},
	status: {
		type: String
	},
	canceled: {
		type: String
	},
	canceledDate: {
		type: String
	},
	dateOpened: {
		type: String
	},
	dateClosed: {
		type: String
	},
	csvType: {
		type: String
	},
});

module.exports = mongoose.model('bankAccount', BankAccountSchema, 'bankAccounts');
