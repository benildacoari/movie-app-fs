import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    likes: { type: Number, default: 0 },
})

export const Book = mongoose.model('Book', bookSchema);

mongoose.connect('mongodb://localhost:27017/test');
