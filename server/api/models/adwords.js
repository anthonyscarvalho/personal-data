'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'adwords';
var tableName = 'adwords';

module.exports = mongoose.model(modelName,
	new Schema({
		clients: {
			type: String
		},
		date: {
			type: String
		},
		credit: {
			type: Number
		},
		debit: {
			type: Number
		},
		commission: {
			type: Number
		},
	}),
	tableName);
