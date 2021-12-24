'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'transaction';
var tableName = 'transactions';

module.exports = mongoose.model(modelName,
	new Schema({
		clients: {
			type: String
		},
		companies: {
			type: String
		},
		invoices: {
			type: String
		},
		date: {
			type: Date
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
	}),
	tableName);
