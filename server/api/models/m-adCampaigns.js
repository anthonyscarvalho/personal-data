'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'adCampaign';
var tableName = 'adCampaigns';

module.exports = mongoose.model(modelName,
	new Schema({
		name: {
			type: String
		},
		created: {
			type: String
		},
	}),
	tableName);
