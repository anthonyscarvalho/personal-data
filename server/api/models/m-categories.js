'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'category';
var tableName = 'categories';

module.exports = mongoose.model(modelName,
	new Schema({
		category: {
			type: String
		},
		price: {
			type: Number
		},
		link: {
			type: String
		},
		canceled: {
			type: String
		},
		canceledDate: {
			type: Date
		},
	}),
	tableName);
