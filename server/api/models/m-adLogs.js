'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'adLog';
var tableName = 'adLogs';

module.exports = mongoose.model(modelName,
	new Schema({
		campaigns: {
			type: String
		},
		affectedTable: {
			type: String
		},
		action: {
			type: String
		},
		date: {
			type: Date
		},
		data: {
			type: Date
		},
	}),
	tableName);
