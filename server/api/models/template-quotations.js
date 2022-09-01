'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'templateQuotation';
var tableName = 'templateQuotations';

module.exports = mongoose.model(modelName,
	new Schema({
		name: {
			type: String
		},
		companies: {
			type: String
		},
		content: {
			type: String
		},
		signature: {
			type: String
		},
		annexure: {
			type: String
		},
		scope: {
			type: String
		},
		createdDate: {
			type: Date
		},
		canceled: {
			type: String
		},
		canceledDate: {
			type: Date
		},
	}),
	tableName);
