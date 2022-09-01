'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'templateAttachment';
var tableName = 'templateAttachments';

module.exports = mongoose.model(modelName,
	new Schema({
		name: {
			type: String
		},
		template: {
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
