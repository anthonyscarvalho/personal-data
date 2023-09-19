"use strict";
var multer = require("multer");
var config = require("../../config");
var fs = require("fs");
var Utils = require("../utils/utils.js");

module.exports = function (app, controller) {
  var baseUrl = "/utilities";
  var _filePath = `${config.fileRoot}/`;

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      var body = req.body;
      _filePath = `${config.fileRoot}/${body.documentType}`;

      if (!fs.existsSync(_filePath)) {
        fs.mkdirSync(_filePath);
      }

      cb(null, _filePath);
    },
    filename: (req, file, cb) => {
      var body = req.body;
      var cleanFileName = Utils.cleanFileName(body.fileName);

      const fileExt = body.fileName.split(`.`).pop();
      const fileName = body.fileName.split(`.`).shift();

      if (
        fs.existsSync(
          `${config.fileRoot}/${body.documentType}/${cleanFileName}`
        )
      ) {
        cleanFileName = Utils.cleanFileName(
          `${fileName} ${new Date()}.${fileExt}`
        );
      }
      cb(null, cleanFileName);
    },
  });

  var upload = multer({
    storage: storage,
    preservePath: true,
  });

  app
    .route(baseUrl + `/documentUpload`)
    .post(upload.single("documentProcessor"), controller.documentUpload);
  app.route(baseUrl + `/files`).post(controller.files);
};
