const express = require('express');

const userController = require('../controllers/user-controller');
const protect = require('../middleware/authMiddleware');

const router = express.Router();


///// POST /////
// router.post('/', userController.createUser);

///// GET /////
router.get('/', userController.getAllUsers);
router.get('/:username', userController.getUserByUsername);

///// PATCH /////
router.patch('/:username', userController.updateUserByUsername);
router.patch('/:uid/favorites/:bid', 
  userController.addBookToFavorites
);

///// DELETE /////
router.delete('/:username', userController.deleteUserByUsername);
router.delete(
  '/:uid/favorites/:bid',
  userController.deleteBookFromFavorites
);

module.exports = router;
