var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
var promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    //This is placed here in place of the Currency Schema
    price: {
        type: Currency,
        required: true
    },
    description: {
        type: String,
        required: true
    }
    },
    {
});
var Promotions = mongoose.model('Promotion', promotionSchema);
module.exports = Promotions;