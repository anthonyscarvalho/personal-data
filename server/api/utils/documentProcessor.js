var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var config = require("../../config");
var fs = require("fs");
const sharp = require("sharp");
var multer = require("multer");
var crypto = require("crypto");
var ExifImage = require("exif").ExifImage;
var exifr = require("exifr"); // => exifr/dist/full.umd.cjs
var got = require("got");

var db = mongojs(config.database.host, ["media"]);

var _response = {
  status: "00",
  totalRecords: null,
  data: null,
  errors: null,
  message: null,
};

var cleanFileName = null;
var _errors = null;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const body = req.body;
    const _url =
      config.fileRoot + `/` + body.moduleType + `/` + body.entityId + `/`;

    if (!fs.existsSync(_url)) {
      fs.mkdirSync(_url);
    }

    cb(null, _url);
  },
  filename: (req, file, cb) => {
    const body = req.body;
    cleanFileName = Clean_File_Name(body.name);
    cb(null, cleanFileName);
  },
});

var upload = multer({
  storage: storage,
  preservePath: true,
});

var algorithm = "sha1";

router.post(
  `/documentProcessor/upload`,
  upload.single("documentProcessor"),
  (req, res, next) => {

    console.log('test');
    _errors = null;
    var shasum = crypto.createHash(algorithm);
    const filename = req.file;
    if (!filename) {
      _response.status = `01`;
      Update_Error_Log("Please select a document to upload");
    } else if (next instanceof multer.MulterError) {
      _response.status = `01`;
      Update_Error_Log(next.message);
    }

    var newRecord = req.body;
    // var createThumb = req.createThumb;
    delete newRecord.createThumb;
    newRecord.name = cleanFileName;
    if (!newRecord.name) {
      res.status(400);
      _response.status = `01`;
      Update_Error_Log(`Bad data`);
    } else {
      var fileName = newRecord.name;
      var filePath = `${config.fileRoot}/${newRecord.entityId}/`;

      var fullFilePath = filePath + fileName;
      // var largeFile = filePath + 'lg_' + fileName;
      // var mediumFile = filePath + 'md_' + fileName;
      // var smallFile = filePath + 'sm_' + fileName;

      var s = fs.ReadStream(fullFilePath);

      s.on("data", (data) => {
        shasum.update(data);
      });
      // making digest
      s.on("end", () => {
        var hash = shasum.digest("hex");
        newRecord.fileHash = hash;
        // const smThumb = (createThumb) ? createSmallThumb(fullFilePath, smallFile) : false;
        // const mdThumb = (createThumb) ? createMediumThumb(fullFilePath, mediumFile) : false;
        // const lgThumb = (createThumb) ? createLargeThumb(fullFilePath, largeFile) : false;

        // newRecord.nameSm = (smThumb == true) ? smallFile : null;
        // newRecord.nameMd = (mdThumb == true) ? mediumFile : null;
        // newRecord.nameLg = (lgThumb == true) ? largeFile : null;

        Save_Record(newRecord, req, res, next);
      });

      // fs.unlinkSync(req.file.path)
    }
  }
);

router.post("/utils/documentProcessor/get/:id", async (req, res) => {
  Get_All_Media(req, res);
});

router.get("/utils/documentProcessor/get/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    res.json({
      error: "bad data",
    });
  } else {
    Get_Media(req.params.id, res);
  }
});

router.get("/utils/documentProcessor/thumb/:id", (req, res, next) => {
  if (!req.params.id) {
    res.status(400);
    res.json({
      error: "bad data",
    });
  } else {
    db.media.findOne(
      {
        _id: mongojs.ObjectId(req.params.id),
      },
      function (err, pResults) {
        if (err) {
          res.send(err);
        }

        let image = req.query.src
          ? req.query.src
          : "https://thumbs.dreamstime.com/b/businessman-hand-writing-demo-marker-business-concep-concept-96434578.jpg";

        let width = parseInt(req.query.width ? req.query.width : 100);
        let height = parseInt(req.query.height ? req.query.height : 100);

        var transformer = sharp()
          .resize(width, height)
          .on("info", function (info) {
            // console.log('Image height is ' + info.height);
          });

        /********* Using GOT */
        got.stream(image).pipe(transformer).pipe(res);

        /********* Using HTTPS */
        // https.get(image, (stream) => {
        //     stream.pipe(transformer).pipe(res);
        // });

        /********* Using REQUEST */
        // request(image).pipe(transformer)
        //     .on('data', function(d){
        //         var img = Buffer.from(d);
        //         res.writeHead(200, {
        //             'Content-Type': 'image/png',
        //             'Content-Length': img.length
        //         });
        //         res.end(img);
        //     })
        //     .on('error', function(e) {
        //         console.log("error", e);

        //     })
        _response.status = `00`;
        _response.data = pResults;
        res.json(_response);
      }
    );
  }
});

function Save_Record(newRecord, req, res, next) {
  let _query = {
    fileHash: newRecord.fileHash,
    moduleType: newRecord.moduleType,
    entityId: newRecord.entityId,
  };

  db.media.find(_query, {}, {}, function (err, pResults) {
    if (err) {
      Update_Error_Log(`Can't fetch data`);
      _response.status = `01`;
    }
    if (pResults.length > 0) {
      Update_Error_Log(`Record exists`);
      _response.status = `02`;
    }
    _response.errors = _errors;
    if (_errors && _errors.length > 0) {
      _response.data = pResults;
      res.json(_response);
    } else {
      if (newRecord.imageMeta) {
        newRecord.imageMeta = JSON.parse(newRecord.imageMeta);
      }
      db.media.save(newRecord, function (err, pSaveResults) {
        if (err) {
          res.send(err);
        }
        _response.status = `00`;
        _response.message = `Record updated`;
        _response.data = pSaveResults;
        res.json(_response);
      });
    }
  });
}

function Get_All_Media(req, res) {
  var body = req.body;
  var moduleType = body.moduleType;
  var entityId = body.entityId;
  var query = {};
  _errors = [];

  if (moduleType) {
    query = {
      moduleType: moduleType,
      entityId: entityId,
    };
    const sort = {
      year: 1,
    };

    db.media.count(query, function (err, pCount) {
      if (err) {
        _errors.push(`Can't count`);
      }

      _response.totalRecords = pCount;
      db.media
        .find(query)
        .sort(sort)
        .toArray(function (err, pResults) {
          if (err) {
            _errors.push(err);
          }
          if (_errors.length > 0) {
            _response.status = `01`;
          }
          _response.errors = _errors;
          _response.data = pResults;
          res.json(_response);
        });
    });
  }
}

function Get_Media(mediaId, res) {
  _errors = [];

  db.media.findOne(
    {
      _id: mongojs.ObjectId(mediaId),
    },
    function (err, pResults) {
      if (err) {
        res.send(err);
      }
      _response.status = `00`;
      _response.data = pResults;
      res.json(_response);
    }
  );
}

function Clean_File_Name(string) {
  string = string.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, ""); // Removes special chars.
  string = string.trim();
  string = string.replace(/\s+/g, "-"); // Replaces all spaces with hyphens.

  return string.replace(/-+/, "-");
}

function createSmallThumb(originalFile, newFile) {
  return saveFile(250, 250, originalFile, newFile);
}

function createMediumThumb(originalFile, newFile) {
  return saveFile(400, 400, originalFile, newFile);
}

function createLargeThumb(originalFile, newFile) {
  return saveFile(600, 600, originalFile, newFile);
}

function saveFile(size1, size2, originalFile, newFile) {
  const result = sharp(originalFile)
    .resize(size1, size2)
    .toBuffer()
    .then((data) => {
      fs.writeFileSync(newFile, data);
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  return result;
}

function Update_Error_Log(pLog) {
  if (pLog != null && pLog != "") {
    if (_errors == null) _errors = [pLog];
    else _errors.push(pLog);
  }
}

module.exports = router;
