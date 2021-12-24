'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'client';
var tableName = 'clients';

module.exports = mongoose.model(modelName,
	new Schema({
		business: {
			type: String
		},
		vat: {
			type: String
		},
		number: {
			type: String
		},
		fax: {
			type: String
		},
		billingAddress: {
			type: String
		},
		city: {
			type: String
		},
		postalCode: {
			type: String
		},
		notes: {
			type: String
		},
		signupDate: {
			type: String
		},
		badClient: {
			type: String
		},
		registration: {
			type: String
		},
		products: [{
			companies: {
				type: String
			},
			categories: {
				type: String
			},
			date: {
				type: Date
			},
			year: {
				type: Number
			},
			month: {
				type: Number
			},
			description: {
				type: String
			},
			amount: {
				type: Number
			},
			renewable: {
				type: String
			},
			period: {
				type: Number
			},
			canceled: {
				type: String
			},
			canceledDate: {
				type: Date
			},
		}],
		canceled: {
			type: String
		},
		canceledDate: {
			type: String
		},
	}),
	tableName);
