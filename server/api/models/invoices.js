'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'invoice';
var tableName = 'invoices';

module.exports = mongoose.model(modelName,
	new Schema({
		clients: {
			type: String
		},
		companies: {
			type: String
		},
		creationDate: {
			type: Date
		},
		dueDate: {
			type: Date
		},
		paidDate: {
			type: Date
		},
		invoiceTotal: {
			type: Number
		},
		deposit: {
			type: Number
		},
		notes: {
			type: String
		},
		paid: {
			type: String
		},
		vat: {
			type: Number
		},
		showDate: {
			type: String
		},
		emails: [{
			emailType: {
				type: String
			},
			date: {
				type: Date
			},
		}],
		invoiceItems: [{
			products: {
				type: String
			},
			categories: {
				type: String
			},
			date: {
				type: Date
			},
			description: {
				type: String
			},
			amount: {
				type: Number
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
