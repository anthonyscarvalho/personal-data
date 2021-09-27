'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BudgetSchema = new Schema({
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
});

module.exports = mongoose.model('budget', BudgetSchema, 'budget');
