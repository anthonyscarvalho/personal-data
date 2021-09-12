'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JournalSchema = new Schema({
	accountName: {
		type: String
	},
	accountNumber: {
		type: String
	},
	status: {
		type: String
	},
	canceled: {
		type: String
	},
	canceledDate: {
		type: Date
	},
});

module.exports = mongoose.model('journals', JournalSchema, 'journals');
