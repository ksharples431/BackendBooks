const Book = require('../models/book-model');
const HttpError = require('../models/http-error');

////////// POST //////////
const createBook = async (req, res, next) => {
  const {
    title,
    author,
    imagePath,
    genre,
    description,
    seriesName,
    seriesNumber,
    format,
    owned,
    progress,
    favorite,
    whereToGet,
    wishlist,
  } = req.body;
  let book;

  try {
    book = await Book.create({
      title,
      author,
      imagePath,
      genre,
      description,
      seriesName,
      seriesNumber,
      format,
      owned,
      progress,
      favorite,
      whereToGet,
      wishlist,
    });
  } catch (err) {
    const error = new HttpError(
      'Creating book failed, please try again later.',
      500
    );
    return next(error);
  }
  res.status(201).json(book);
};

////////// GET //////////
// ALL //
const getAllBooks = async (req, res, next) => {
  let books;
  try {
    books = await Book.find();
  } catch (err) {
    const error = new HttpError(
      'Fetching books failed, please try again later.',
      500
    );
    return next(error);
  }
  res.status(200).json(books);
};

// ID //
const getBookById = async (req, res, next) => {
  let book;
  try {
    book = await Book.findOne({ _id: req.params.bid });
  } catch (err) {
    const error = new HttpError(
      'Fetching book failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!book) {
    const error = new HttpError(
      'Could not find a book for the provided id.',
      404
    );
    return next(error);
  }
  res.status(200).json(book);
};

// AUTHOR NAME //
const getAuthorByName = async (req, res, next) => {
  let author;
  try {
    author = await Book.find({ 'author': req.params.authorName });
  } catch (err) {
    const error = new HttpError(
      'Fetching author failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!author) {
    const error = new HttpError(
      'Could not find an author for the provided name.',
      404
    );
    return next(error);
  }
  res.status(200).json(author);
};

// GENRE NAME //
const getGenreByName = async (req, res, next) => {
  let genre;
  try {
    genre = await Book.find({ 'genre': req.params.genreName });
  } catch (err) {
    const error = new HttpError(
      'Fetching genre failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!genre) {
    const error = new HttpError(
      'Could not find an genre for the provided name.',
      404
    );
    return next(error);
  }
  res.status(200).json(genre);
};

////////// PATCH //////////
// ID //
const updateBookById = async (req, res, next) => {
  let updatedBook;
  try {
    updatedBook = await Book.findOneAndUpdate(
      { _id: req.params.bid },
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          imagePath: req.body.imagePath,
          genre: req.body.genre,
          seriesName: req.body.seriesName,
          seriesNumber: req.body.seriesNumber,
          description: req.body.description,
          format: req.body.format,
          whereToGet: req.body.whereToGet,
          progress: req.body.progress,
          owned: req.body.owned,
          favorite: req.body.favorite,
          wishlist: req.body.wishlist,
        },
      },
      { new: true }
    );
  } catch (err) {
    const error = new HttpError(
      'Updating book failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!updatedBook) {
    const error = new HttpError(
      'Could not find a book for the provided id.',
      404
    );
    return next(error);
  }
  res.status(200).json(updatedBook);
};

////////// DELETE //////////
// ID //
const deleteBookById = async (req, res, next) => {
  let deletedBook;
  let bid = req.params.bid;
  try {
    deletedBook = await Book.findOneAndDelete({ _id: bid });
  } catch (err) {
    const error = new HttpError(
      'Deleting book failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!deletedBook) {
    const error = new HttpError(
      'Could not find a book for the provided id.',
      404
    );
    return next(error);
  }
  res.status(200).send(`Book ${bid} was deleted.`);
};

exports.createBook = createBook;
exports.getAllBooks = getAllBooks;
exports.getBookById = getBookById;
exports.getAuthorByName = getAuthorByName;
exports.getGenreByName = getGenreByName;
exports.updateBookById = updateBookById;
exports.deleteBookById = deleteBookById;
