'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'user';
var tableName = 'users';

module.exports = mongoose.model(modelName,
	new Schema({
		username: {
			type: String
		},
		password: {
			type: String
		},
		name: {
			type: String
		},
		surname: {
			type: String
		},
		emailAddress: {
			type: String
		},
		lastLogin: {
			type: Date
		},
		roles: {
			type: String
		},
		accessList: {
			type: String
		},
		access: {
			type: String
		},
		created: {
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
