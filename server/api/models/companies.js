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
		invoiceHeader: {
			type: String
		},
		accountDetails: {
			type: String
		},
		created: {
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
