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
// router.patch(
//   '/id/:uid/favorites/id/:bid',
//   userController.addBookToFavorites
// );
// USERNAME //
////////// DELETE //////////
// ID //
// router.delete(
//   '/id/:uid/favorites/id/:bid',
//   userController.deleteBookFromFavorites
// );

module.exports = router;
