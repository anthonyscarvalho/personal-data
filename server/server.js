var express = require('express');
var path = require('path');
var cors = require('cors');
var config = require("./config");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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
require('./api/routes/bank-accounts')(app);
require('./api/routes/companies')(app);
require('./api/routes/contacts')(app);
require('./api/routes/clients')(app);
require('./api/routes/bank-accounts-records')(app);
require('./api/routes/budget')(app);
require('./api/routes/journals')(app);
require('./api/routes/journal-records')(app);
require('./api/routes/products')(app);
require('./api/routes/users');
require('./api/routes/users')(app);

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
