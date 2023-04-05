'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'adTransaction';
var tableName = 'adTransactions';

module.exports = mongoose.model(modelName,
	new Schema({
		campaigns: {
			type: String
		},
		clients: {
			type: String
		},
		Date: {
			type: Date
		},
		credit: {
			type: Number
		},
		debit: {
			type: Number
		},
		comment: {
			type: String
		},
		commission: {
			type: String
		},
	}),
	tableName);
