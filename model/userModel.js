const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    img: { type: String, default: "default1.jpg" },
    role:{type: String, enum:["admin","client"], default:"client"},
});



//'User' => users
module.exports = mongoose.model('User', userSchema);