'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'templateEmail';
var tableName = 'templateEmails';

module.exports = mongoose.model(modelName,
	new Schema({
		name: {
			type: String
		},
		subject: {
			type: String
		},
		body: {
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
