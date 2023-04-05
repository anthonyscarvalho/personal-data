'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'expenditure';
var tableName = 'expenditures';

module.exports = mongoose.model(modelName,
	new Schema({
		categories: {
			type: String
		},
		companies: {
			type: String
		},
		date: {
			type: Date
		},
		amount: {
			type: Number
		},
		description: {
			type: String
		},
		type: {
			type: String
		},
	}),
	tableName);
