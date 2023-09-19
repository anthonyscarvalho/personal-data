"use strict";
require("../models/media");
var mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
var Utils = require("../utils/utils.js");
var config = require("../../config");
var databaseModel = mongoose.model("media");
var mongojs = require("mongojs");
var multer = require("multer");
var fs = require("fs");

// var db = mongojs(config.database.host, ["media"]);

exports.documentUpload = (req, res, next) => {
  var _response = new Utils.newResponse();
  // var body = req.body;
  var file = req.file;

  if (!file) {
    _response.status = `01`;
    Utils.returnError("Please select a document to upload", res);
  } else if (next instanceof multer.MulterError) {
    _response.status = `01`;
    Utils.returnError(next.message, res);
  }
  // var _filePath = `${config.fileRoot}/${body.documentType}`;
  let new_record = new databaseModel(req.body);
  new_record.filePath = `${config.fileRoot}/${new_record.documentType}/${file.filename}`;
  if (!new_record.fileName) {
    Utils.returnBadData(res);
  } else {
    if (typeof new_record.fileMeta === "string") {
      new_record.fileMeta = JSON.parse(new_record.fileMeta);
    }
    // var fileName = new_record.name;

    // var fullFilePath = _filePath + fileName;
    // // var largeFile = filePath + 'lg_' + fileName;
    // // var mediumFile = filePath + 'md_' + fileName;
    // // var smallFile = filePath + 'sm_' + fileName;

    // var s = fs.ReadStream(fullFilePath);

    // // s.on("data", (data) => {
    // //   shasum.update(data);
    // // });
    // // // making digest
    // // s.on("end", () => {
    // //   var hash = shasum.digest("hex");
    // //   new_record.fileHash = hash;
    // //   // var smThumb = (createThumb) ? createSmallThumb(fullFilePath, smallFile) : false;
    // //   // var mdThumb = (createThumb) ? createMediumThumb(fullFilePath, mediumFile) : false;
    // //   // var lgThumb = (createThumb) ? createLargeThumb(fullFilePath, largeFile) : false;

    // //   // new_record.nameSm = (smThumb == true) ? smallFile : null;
    // //   // new_record.nameMd = (mdThumb == true) ? mediumFile : null;
    // //   // new_record.nameLg = (lgThumb == true) ? largeFile : null;

    // //   Save_Record(new_record, req, res, next);
    // // });

    // // fs.unlinkSync(req.file.path)

    var fullFilePath = `${config.fileRoot}/${new_record.documentType}/${file.filename}`;

    var query = {
      $and: [
        {
          fileHash: new_record.fileHash,
          documentType: new_record.documentType,
          entityId: new_record.entityId,
        },
      ],
    };
    
    databaseModel
    .find(query)
    .then((pResults) => {
        if (pResults) {
          _response.data = pResults;

          if (pResults.length == 0) {
            new_record
              .save()
              .then((pResults) => {
                Utils.returnUpdated(res);
              })
              .catch((err) => {
                Utils.returnError(err, res);
              });
          } else if (pResults.length == 1) {
            fs.unlinkSync(fullFilePath);
            Utils.returnRecordExist(res);
          } else if (pResults.length > 1) {
            Utils.returnDuplicate(res);
          }
        } else {
          Utils.returnFindError(res);
        }
      })
      .catch((err) => {
        Utils.returnError(err, res);
      });
  }
};

exports.files = (req, res) => {
  let _response = new Utils.newResponse();
  let body = req.body;
  let page = body.page ? body.page : 1;
  let records = body.pagerRecords ? parseInt(body.pagerRecords) : 20;
  let orderDir = body.dir === `ASC` ? 1 : -1;
  let searchPhrase = body.searchPhrase ? body.searchPhrase : `1`;
  let query = {};
  if (searchPhrase !== `1` && searchPhrase !== ``) {
    query = {
      $or: [
        {
          fileName: {
            $regex: new RegExp(searchPhrase, `i`),
          },
        },
      ],
    };
  }

  if (body.state != `all`) {
    query["canceled"] = body.state;
  }

  databaseModel
    .countDocuments(query)
    .then((pCount) => {
      _response.totalRecords = pCount;
      databaseModel
        .find(query)
        .sort({
          name: orderDir,
        })
        .skip(page * records - records)
        .limit(records)
        .then((pResults) => {
          _response.data = pResults;
          Utils.returnSuccess(_response, res);
        })
        .catch((err) => {
          Utils.returnError(err, res);
        });
    })
    .catch((err) => {
      Utils.returnCountError(res);
    });
};
