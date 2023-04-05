'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'userAccess';
var tableName = 'userAccess';

module.exports = mongoose.model(modelName,
	new Schema({
		campaigns: {
			type: String
		},
		categories: {
			type: String
		},
		clients: {
			type: String
		},
		companies: {
			type: String
		},
		contacts: {
			type: String
		},
		emailLog: {
			type: String
		},
		expenditure: {
			type: String
		},
		invoices: {
			type: String
		},
		logs: {
			type: String
		},
		jobs: {
			type: String
		},
		products: {
			type: String
		},
		statements: {
			type: String
		},
		templateAttachments: {
			type: String
		},
		templateEmails: {
			type: String
		},
		templateQuotations: {
			type: String
		},
		transactions: {
			type: String
		},
		users: {
			type: String
		},
		userAccess: {
			type: String
		},
		userRoles: {
			type: String
		},
		companyIncome: {
			type: String
		},
		reportOverview: {
			type: String
		},
		reportControlSheet: {
			type: String
		},
		quotations: {
			type: String
		},
	}),
	tableName);
