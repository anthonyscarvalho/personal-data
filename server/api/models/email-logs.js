'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'emailLog';
var tableName = 'emailLogs';

module.exports = mongoose.model(modelName,
	new Schema({
		users: {
			type: String
		},
		contacts: {
			type: String
		},
		invoices: {
			type: String
		},
		subject: {
			type: String
		},
		body: {
			type: String
		},
		date: {
			type: Date
		},
		status: {
			type: String
		},
		quotes: {
			type: String
		},
	}),
	tableName);
