"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var modelName = "media";
var tableName = "media";

module.exports = mongoose.model(
  modelName,
  new Schema({
    contentType: { type: String },
    date: { type: String },
    description: { type: String },
    documentType: { type: String },
    entityId: { type: String },
    fileHash: { type: String },
    fileMeta: Schema.Types.Mixed,
    fileName: { type: String },
    filePath: { type: String },
    fileSize: { type: Number },
    labels: [{ type: String}],
    name: { type: String },
    year: { type: Number },
    canceled: { type: String },
    canceledDate: { type: Date },
  }),
  tableName
);
