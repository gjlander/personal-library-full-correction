// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 255,
    },
    author: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100,
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        match: [/^(97(8|9))?\d{9}(\d|X)$/, 'Please use a valid ISBN number'],
    },
    categories: {
        type: [String],
        required: true,
    },
});

module.exports = mongoose.model('Book', BookSchema);
