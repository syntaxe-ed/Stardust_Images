const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const galleryPagesSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    parentPage: {
        type: String,
        required: true,
        trim: true
    }
})

const galleryPages = mongoose.model('galleryPages', galleryPagesSchema)
module.exports = galleryPages;