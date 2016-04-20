var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestaurantModel = new Schema({
    title: {
        type: String
    },
    address: {
        type: String
    },
    open_hours: {
        type: Number
    },
    about: {
        type: String
    },
    reviews: [
        {
            rate: {
                type: Number
            },
            date: {
                type: Date
            },
            name: {
                type: String
            },
            email: {
                type: String
            },
            message: {
                type: String
            }
        }
    ]
});

module.exports = mongoose.model('Restaurant', RestaurantModel, 'Restaurant');