'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'email';
var tableName = 'emails';

module.exports = mongoose.model(modelName,
	new Schema({
		name: {
			type: String
		},
		subject: {
			type: String
		},
		body: {
			type: String
		},
	}),
	tableName);
