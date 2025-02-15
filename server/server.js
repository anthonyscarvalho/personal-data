const express = require('express');
const path = require('path');
const cors = require('cors');
const config = require('./config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const logger = require('./services/logger');

const _logger = logger({
  apiKey: 'XYZ',
});

const app = express();

app.use(cors());

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization,DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content Type,Orgin;');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,DELETE,PUT,POST');
  // Logging
  _logger(req, res);
  next();
});

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose
  .connect(config.database.host, {
    dbName: 'accounts',
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('database connected');
  })
  .catch((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('database connected');
    }
  });

// set debug to true for database connection debugging
// mongoose.set('debug', function(coll, method, query, doc, options) {
//     let set = {
//         coll: coll,
//         method: method,
//         query: query,
//         doc: doc,
//         options: options
//     };

//     console.log(set);
// });

// body parser middle ware
app.use(
  express.urlencoded({
    extended: false,
    limit: '50mb',
  })
);
app.use(
  express.json({
    limit: '50mb',
  })
);

// app.use(bodyParser({
//     limit: '50mb'
// }));

// controllers
require('./api/routes/assets')(app, require('./api/controllers/assets'));
require('./api/routes/bank-accounts-records')(app, require('./api/controllers/bank-account-records'));
require('./api/routes/bank-accounts')(app, require('./api/controllers/bank-accounts'));
require('./api/routes/budget')(app, require('./api/controllers/budget'));
require('./api/routes/clients')(app, require('./api/controllers/clients'));
require('./api/routes/companies')(app, require('./api/controllers/companies'));
require('./api/routes/contacts')(app, require('./api/controllers/contacts'));
require('./api/routes/journal-records')(app, require('./api/controllers/journal-records'));
require('./api/routes/journals')(app, require('./api/controllers/journals'));
require('./api/routes/lotto')(app, require('./api/controllers/lotto'));
require('./api/routes/products')(app, require('./api/controllers/products'));
require('./api/routes/users')(app, require('./api/controllers/users'));
require('./api/routes/utilities')(app, require('./api/controllers/utilities'));

// used to return static assets through the api
// app.use('/' + config.fileRoot, express.static(config.fileRoot));

app.listen(config.port, function () {
  console.log('server started on ' + config.port);
});

// Error Codes
// 00 - Success
// 01 - Failed to execute
// 02 - Record exists
// 03 - Duplicate record
