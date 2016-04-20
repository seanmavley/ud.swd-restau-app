var express = require('express'),
    mongojs = require('mongojs');

var app = express();
var db = mongojs('mongodb://localhost/resta', ['Restaurant']);

var routes = function() {
    var restaRouter = express.Router();

    restaRouter.route('/lists')
        .post(function(req, res) {
            // console.log(req.body);
            db.Restaurant.insert(req.body, function(err, doc) {
                if (err) {
                    res.send(err);
                }
                res.json(doc);
            });
        })
        .get(function(req, res) {
            var query = req.query;
            db.Restaurant.find(query, function(err, doc) {
                if (err) {
                    res.send(err);
                }
                res.json(doc);
            });
        });

    restaRouter.route('/lists/:id')

    .post(function(req, res) {
            console.log(req.body);
            db.Restaurant.update({
                _id: mongojs.ObjectId(req.params.id)
            }, {
                $push: { reviews: req.body }
            }, function(err, doc) {
                if (err) {
                    res.send(err);
                }
                res.json(doc);
            })
        })
        .get(function(req, res) {
            db.Restaurant.findOne({
                _id: mongojs.ObjectId(req.params.id)
            }, function(err, doc) {
                if (err) {
                    res.send(err);
                }
                res.json(doc);
            });
        });


    app.get('*', function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });

    return restaRouter;
}

module.exports = routes;
