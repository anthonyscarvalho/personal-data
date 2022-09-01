'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'setting';
var tableName = 'settings';

module.exports = mongoose.model(modelName,
	new Schema({
		name: {
			type: String
		},
		value: {
			type: String
		},
	}),
	tableName);
