var express = require('express'),
    mongojs = require('mongojs'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');

var app = express();

// Let's connect to MongoDB
var db = mongojs('mongodb://localhost/resta', ['Restaurant']);
db.on('error', function(err) {
        console.log('database error ', err);
    })
    .on('connect', function() {
        console.log('database connected');
    })


var port = process.env.PORT || 3005;

// Routes
restaRouter = require('./app/routes')();

// Let's use some things
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(morgan('dev')); // log every request to the console

// Let's catch some routes
app.use('/api', restaRouter);

app.listen(port)
console.log('I am working on port ' + port);