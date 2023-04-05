'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'item';
var tableName = 'items';

module.exports = mongoose.model(modelName,
	new Schema({
		item: {
			type: String
		},
		price: {
			type: Number
		},
		canceled: {
			type: String
		},
		canceledDate: {
			type: Date
		},
	}),
	tableName);
