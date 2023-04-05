'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'userRole';
var tableName = 'userRoles';

module.exports = mongoose.model(modelName,
	new Schema({
		role: {
			type: String
		},
		save: {
			type: String
		},
		edit: {
			type: String
		},
		delete: {
			type: String
		},
		create: {
			type: String
		},
		status: {
			type: String
		},
	}),
	tableName);
