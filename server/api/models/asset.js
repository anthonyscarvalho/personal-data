'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'assets';
var tableName = 'assets';

module.exports = mongoose.model(modelName,
	new Schema({
		name: {
			type: String
		},
		type: {
			type: Number
		},
		status: {
			type: String
		},
		created: {
			type: String
		},
		dateBought: {
			type: String
		},
		dateSold: {
			type: String
		},
		services:[{
			_id: {
				type: String
			},
			serviceType: {
				type: String
			},
			date: {
				type: String
			}
		}]
	}),
	tableName);
