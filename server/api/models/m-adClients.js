'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'adClient';
var tableName = 'adClients';

module.exports = mongoose.model(modelName,
	new Schema({
		campaigns: {
			type: String
		},
		clients: {
			type: String
		},
		added: {
			type: Date
		},
	}),
	tableName);
