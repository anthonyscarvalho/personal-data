var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var accounts = require('./routes/accounts');
var accountRecords = require('./routes/accountRecords');
var logs = require('./routes/logs');
var transactions = require('./routes/transactions');
var users = require('./routes/users');

var port = 3000;

var app = express();

app.use(cors());

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.header("Access-Control-Allow-Methods", "OPTIONS,GET,HEAD,DELETE,PUT,POST");
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

app.use('/', index);
app.use('/api', accounts);
app.use('/api', accountRecords);
app.use('/api', logs);
app.use('/api', transactions);
app.use('/api', users);

app.listen(port, function () {
    console.log('server started on ' + port);
});


// Error Codes
// 00 - Success
// 01 - Failed to execute
// 02 - Record exists
