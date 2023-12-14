const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: {
      name: String,
      bio: String,
    },
    description: { type: String, required: true },
    genre: {
      name: String,
      description: String,
    },
    imagePath: String,
    seriesName: String,
    seriesNumber: String,
    featured: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
