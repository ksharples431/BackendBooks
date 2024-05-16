const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: String,
    genre: String,
    imagePath: String,
    seriesName: String,
    seriesNumber: String,
    format: String,
    whereToGet: String,
    read: String,
    favorite: Boolean,
    wishlist: Boolean,
    owned: Boolean,

  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
