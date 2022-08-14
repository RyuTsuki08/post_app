const mongoose = require('mongoose');
const { Schema } = require('mongoose');

//Esquema de la publicacion
const postSchema = new Schema({
    username: {type: String, required: true},
    filename:{type:String || undefined, required: false},
    path: {type: String, required: false},
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Post', postSchema);