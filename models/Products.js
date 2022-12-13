const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./Review')

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload', '/upload/w_100')
})

const ProductSchema = new Schema({
    title: {
        type: String
    },
    brand: {
        type: String
    },
    category: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    },
    price: {
        type: Number
    },
    images: [ImageSchema],

    discount: {
        type: Number,
        default: 0
    },
    countInStock: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    reviews: {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    },
    timeStamp: {
        type: String
    },
    purchased: {
        type: Number,
        default: 0
    }

})

module.exports = mongoose.model('Product', ProductSchema);