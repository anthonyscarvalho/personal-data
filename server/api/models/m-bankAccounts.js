'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'bankAccount';
var tableName = 'bankAccounts';


module.exports = mongoose.model(modelName,
	new Schema({
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
	}),
	tableName);
