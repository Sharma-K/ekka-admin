const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = new Schema({
    body: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Reviews', Review);