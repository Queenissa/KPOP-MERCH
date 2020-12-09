const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {type: String, required: true},
    imageUrl: {type: String},
    price: {type: Number, required: true},
    stock:{type: Number,required: true},
    description: {type: String, required: true},
    category: {type: String, enum:["bts", "blackpink", "twice", "redvelvet", "exo", "momoland"], required: true},
    createdAt:{type: Date, default: new Date()},
    updatedAt:{type: Date, default: null}
});

module.exports = mongoose.model('Product', productSchema);