'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'adEmail';
var tableName = 'adEmails';

module.exports = mongoose.model(modelName,
	new Schema({
		campaigns: {
			type: String
		},
		users: {
			type: String
		},
		contacts: {
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
		attachment: {
			type: Blob
		},
		status: {
			type: String
		},
	}),
	tableName);
