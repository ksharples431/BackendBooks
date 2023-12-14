const express = require('express');

const userController = require('../controllers/user-controller');

const router = express.Router();

router.post('/', userController.createUser);

///// GET /////
router.get('/', userController.getAllUsers);
router.get('/:username', userController.getUserByUsername);

///// PATCH /////
router.patch('/:username', userController.updateUserByUsername);

///// DELETE /////
router.delete('/:username', userController.deleteUserByUsername);

////////// FAVORITES //////////
////////// POST //////////
// ID //
router.patch(
  '/:uid/favorites/:bid',
  userController.addBookToFavorites
);
// USERNAME //
////////// DELETE //////////
// ID //
router.delete(
  '/:uid/favorites/:bid',
  userController.deleteBookFromFavorites
);

module.exports = router;
