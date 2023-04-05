'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'attachment';
var tableName = 'attachments';

module.exports = mongoose.model(modelName,
	new Schema({
		clients: {
			type: String
		},
		description: {
			type: String
		},
		date: {
			type: Date
		},
		attachment: {
			type: Blob
		},
		accepted: {
			type: String
		},
		accepted_date: {
			type: Date
		},
	}),
	tableName);
