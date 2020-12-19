var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');

var logger = require('./services/logger');

const _logger = logger({
    apiKey: "XYZ"
});

var port = 3000;

var app = express();

app.use(cors());

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.header("Access-Control-Allow-Methods", "OPTIONS,GET,HEAD,DELETE,PUT,POST");
    // Logging
    _logger(req,res);
    next();
});

// app.options('*', cors()) // include before other routes

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// set static folder
// app.use(express.static(path.join(__dirname, 'client')));

// body parser middle ware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/', require('./routes/index'));
app.use('/', require('./routes/bank-accounts'));
app.use('/', require('./routes/bank-account-records'));
app.use('/', require('./routes/journals'));
app.use('/', require('./routes/journalRecords'));
app.use('/', require('./routes/logs'));
app.use('/', require('./routes/transactions'));
app.use('/', require('./routes/users'));

app.listen(port, function () {
    console.log('server started on ' + port);
});

// Error Codes
// 00 - Success
// 01 - Failed to execute
// 02 - Record exists
// 03 - Duplicate record
