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
		accountNumbers: [{
			number: {
				type: String
			},
			comment: {
				type: String
			},
			created: {
				type: String
			},
			closed: {
				type: String
			},
			status: {
				type: String
			}
		}],
		accountDescription: {
			type: String
		},
		bank: {
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
		currency: {
			type: String
		},
		defaultAccount: {
			type: String
		},
		symbol: {
			type: String
		},
	}),
	tableName);
