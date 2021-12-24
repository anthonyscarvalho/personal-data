'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'company';
var tableName = 'companies';

module.exports = mongoose.model(modelName,
	new Schema({
		company: {
			type: String
		},
		invoice_header: {
			type: String
		},
		account_details: {
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
