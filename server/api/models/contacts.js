'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'contact';
var tableName = 'contacts';

module.exports = mongoose.model(modelName,
	new Schema({
		name: {
			type: String
		},
		surname: {
			type: String
		},
		numbers: [{
			label: {
				type: String
			},
			value: {
				type: String
			}
		}],
		emails: [{
			label: {
				type: String
			},
			value: {
				type: String
			}
		}],
		urls: [{
			label: {
				type: String
			},
			value: {
				type: String
			}
		}],
		relatives: [{
			label: {
				type: String
			},
			value: {
				type: String
			}
		}],
		socialMedia: [{
			label: {
				type: String
			},
			value: {
				type: String
			}
		}],
		notes: {
			type: String
		}
	}),
	tableName);
