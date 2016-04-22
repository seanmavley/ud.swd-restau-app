var express = require('express'),
    mongojs = require('mongojs'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');

var app = express();

// let's connect to MongoDB
var db = mongojs('mongodb://localhost/resta', ['Restaurant']);
db.on('error', function(err) {
        console.log('database error ', err);
    })
    .on('connect', function() {
        console.log('database connected');
    })

// uses 8000 if gulp started the server
var port = process.env.PORT || 3005;

// let's use some things
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(morgan('dev')); // log every request to the console

// routes
restaRouter = require('./server/routes')(mongojs, db);
app.use('/api', restaRouter);

app.listen(port)
console.log('I am working on port ' + port);