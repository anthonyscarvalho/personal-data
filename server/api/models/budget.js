"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var modelName = "budget";
var tableName = "budgets";

var tableSchema = {
  description: {
    type: String,
  },
  status: {
    type: String,
  },
  budget: {
    type: Number,
  },
  actual: {
    type: Number,
  },
  essential: {
    type: Boolean,
  },
  category: {
    type: Number,
  },
  keywords: {
    type: String,
  },
  canceled: {
    type: String,
  },
  canceledDate: {
    type: String,
  },
  created: {
    type: String,
  },
  breakdown: [
    {
      description: {
        type: String,
      },
      budget: {
        type: String,
      },
      status: {
        type: String,
      },
      created: {
        type: String,
      },
    },
  ],
  history: [],
};

module.exports = mongoose.model(modelName, new Schema(tableSchema), tableName);
