const express = require('express');

const bookController = require('../controllers/book-controller');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

///// POST /////
router.post('/', protect, bookController.createBook);

///// GET /////
router.get('/', protect, bookController.getAllBooks);
router.get('/:bid', bookController.getBookById);
router.get('/authors/:authorName', bookController.getAuthorByName);
router.get('/genres/:genreName', bookController.getGenreByName);

///// PATCH /////
router.patch('/:bid', bookController.updateBookById);

///// DELETE /////
router.delete('/:bid', bookController.deleteBookById);

module.exports = router;
