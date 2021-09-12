'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JournalSchema = new Schema({
	journalId: {
		type: String
	},
	accountRecordId: {
		type: String
	},
	date: {
		type: String
	},
	description: {
		type: String
	},
	credit: {
		type: String
	},
	debit: {
		type: String
	},
});

module.exports = mongoose.model('journalRecords', JournalSchema, 'journalRecords');
