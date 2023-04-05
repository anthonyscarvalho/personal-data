'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'session';
var tableName = 'sessions';

module.exports = mongoose.model(modelName,
	new Schema({
		session: {
			type: String
		},
		loggedIn: {
			type: String
		},
		time: {
			type: String
		},
		user: {
			type: String
		},
		lastUrl: {
			type: String
		},
	}),
	tableName);
