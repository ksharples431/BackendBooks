const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    imagePath: String,
    genre: String,
    description: String,
    seriesName: String,
    seriesNumber: String,
    format: String,
    owned: Boolean,
    progress: String,
    favorite: Boolean,
    whereToGet: String,
    wishlist: Boolean,

  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
