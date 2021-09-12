var express = require('express');
var path = require('path');
var cors = require('cors');
var config = require("./config");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Models
require('./api/models/m-bank-accounts');
require('./api/models/m-bank-accounts-records');
require('./api/models/m-contacts');
require('./api/models/m-journals');
require('./api/models/m-journal-records');

var logger = require('./services/logger');

const _logger = logger({
    apiKey: "XYZ"
});

var port = process.env.PORT || 3000;

var app = express();

app.use(cors());

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.header("Access-Control-Allow-Methods", "OPTIONS,GET,HEAD,DELETE,PUT,POST");
    // Logging
    _logger(req, res);
    next();
});

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database.host, {
    dbName: 'accounts',
    useNewUrlParser: true
}, (error) => {
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
app.use(express.urlencoded({
    extended: false,
    limit: '50mb'
}));
app.use(express.json({
    limit: '50mb'
}));
app.use(bodyParser({
    limit: '50mb'
}));
// app.use('/', require('./routes/journalRecords'));
// app.use('/', require('./routes/logs'));
// app.use('/', require('./routes/transactions'));
// app.use('/', require('./routes/users'));

// controllers
var bankAccountsRoute = require('./api/routes/bank-accounts');
var contactsRoute = require('./api/routes/contacts');
var bankAccountRecordsRoute = require('./api/routes/bank-accounts-records');
var journalsRoute = require('./api/routes/journals');
var journalRecordsRoute = require('./api/routes/journal-records');
bankAccountsRoute(app);
contactsRoute(app);
bankAccountRecordsRoute(app);
journalsRoute(app);
journalRecordsRoute(app);

// used to return static assets through the api
// app.use('/' + config.fileRoot, express.static(config.fileRoot));

app.listen(port, function () {
    console.log('server started on ' + port);
});

// Error Codes
// 00 - Success
// 01 - Failed to execute
// 02 - Record exists
// 03 - Duplicate record