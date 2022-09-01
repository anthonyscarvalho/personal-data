'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'quotation';
var tableName = 'quotations';

module.exports = mongoose.model(modelName,
	new Schema({
		clients: {
			type: String
		},
		deposit: {
			type: Number
		},
		companies: {
			type: String
		},
		template: {
			type: String
		},
		domain: {
			type: String
		},
		creationDate: {
			type: Date
		},
		acceptedDate: {
			type: Date
		},
		notes: {
			type: String
		},
		accepted: {
			type: String
		},
		canceled: {
			type: String
		},
		products: {
			type: String
		},
		scope: {
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
		link: {
			type: String
		},
		acceptedBy: [{
			contacts: {
				type: String
			},
			date: {
				type: Date
			},
			status: {
				type: String
			},
		}],
		emails: [{
			date: {
				type: Date
			},
		}],
		canceled: {
			type: String
		},
		canceledDate: {
			type: Date
		},
	}),
	tableName);
