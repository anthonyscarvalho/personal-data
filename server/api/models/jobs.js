'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'job';
var tableName = 'jobs';

module.exports = mongoose.model(modelName,
	new Schema({
		clients: {
			type: String
		},
		users: {
			type: String
		},
		categories: {
			type: String
		},
		quoted: {
			type: Number
		},
		received: {
			type: Date
		},
		end: {
			type: Date
		},
		design: {
			type: Date
		},
		seo: {
			type: Date
		},
		google: {
			type: Date
		},
		yahoo: {
			type: Date
		},
		bing: {
			type: Date
		},
		dmz: {
			type: Date
		},
		traveldex: {
			type: Date
		},
		links: {
			type: Date
		},
		portfolio: {
			type: Date
		},
		facebook: {
			type: Date
		},
		invoice: {
			type: Date
		},
		paid: {
			type: Date
		},
		notes: {
			type: String
		},
		complete: {
			type: String
		},
		creationDate: {
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
