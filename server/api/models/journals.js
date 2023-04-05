'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'journal';
var tableName = 'journals';

module.exports = mongoose.model(modelName,
	new Schema({
		accountName: {
			type: String
		},
		accountNumber: {
			type: String
		},
		status: {
			type: String
		},
		canceled: {
			type: String
		},
		canceledDate: {
			type: Date
		},
	}),
	tableName);
