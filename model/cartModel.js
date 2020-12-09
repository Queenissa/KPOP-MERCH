const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = Schema({
    productId:{type: Schema.Types.ObjectId, ref: 'Product', required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    quantity: {type: Number, required: true},
    status: {type: String, enum:["uncheckout","checkout","delivered"], default: "uncheckout"},
    createdAt: {type: Date, default: new Date()},
    updatedAt: {type: Date, default: null}
})
module.exports = mongoose.model('Cart', cartSchema);