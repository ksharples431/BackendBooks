const express = require('express');

const bookController = require('../controllers/book-controller');
// const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// router.use(requireAuth)

///// POST /////
router.post('/', bookController.createBook);

///// GET /////
router.get('/', bookController.getAllBooks);
router.get('/:bid', bookController.getBookById);
router.get('/authors/:authorName', bookController.getAuthorByName);
router.get('/genres/:genreName', bookController.getGenreByName);

///// PATCH /////
router.patch('/:bid', bookController.updateBookById);

///// DELETE /////
router.delete('/:bid', bookController.deleteBookById);

module.exports = router;
