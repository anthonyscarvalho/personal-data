"use strict";
require("../models/users");
var mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
var Utils = require("../utils/utils.js");
var config = require("../../config");
var mongojs = require("mongojs");
const multer = require("multer");

var db = mongojs(config.database.host, ["media"]);

 
var upload = multer({dest: config.fileRoot});

exports.documentUpload = (req, res) => {
  let _response = new Utils.newResponse();
  let body = req.body;
  let page = body.page ? body.page : 1;
  let records = body.pagerRecords ? parseInt(body.pagerRecords) : 20;
  let orderDir = body.dir === `ASC` ? 1 : -1;
  let searchPhrase = body.searchPhrase ? body.searchPhrase : `1`;
  let query = {};


  // upload(req, res, function (err) {
  //   if (err) {
  //     return res.end(err.toString());
  //   }
 
  //   res.end('File is uploaded');
  // });
 
};

