'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'budget';
var tableName = 'budgets';

module.exports = mongoose.model(modelName,
	new Schema({
		description: {
			type: String
		},
		status: {
			type: String
		},
		budget: {
			type: Number
		},
		actual: {
			type: Number
		},
		difference: {
			type: Number
		},
		essential: {
			type: Boolean
		},
		category: {
			type: Number
		},
		keywords: {
			type: String
		},
		canceled: {
			type: String
		},
		canceledDate: {
			type: String
		},
		created: {
			type: String
		},
		breakdown: [{
			description: {
				type: String
			},
			budget: {
				type: String
			},
			status: {
				type: String
			},
			created: {
				type: String
			}
		}],
	}),
	tableName);
