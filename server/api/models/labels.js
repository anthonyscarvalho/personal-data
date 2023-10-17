"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var modelName = "label";
var tableName = "labels";

module.exports = mongoose.model(
  modelName,
  new Schema({
    label: {
      type: String,
    },
    parent: {
      type: Number,
    },
    created: {
      type: String,
    },
    canceled: {
      type: String,
    },
    canceledDate: {
      type: String,
    },
  }),
  tableName
);
