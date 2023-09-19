"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var modelName = "product";
var tableName = "products";

module.exports = mongoose.model(
  modelName,
  new Schema({
    description: {
      type: String,
    },
    price: {
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
