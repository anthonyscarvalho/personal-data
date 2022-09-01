'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'ticket';
var tableName = 'tickets';

module.exports = mongoose.model(modelName,
	new Schema({
		clients: {
			type: String
		},
		contacts: {
			type: String
		},
		emailFrom: {
			type: String
		},
		emailTo: {
			type: String
		},
		subject: {
			type: String
		},
		content: {
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
