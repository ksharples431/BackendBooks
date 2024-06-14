const asyncHandler = require('express-async-handler');
const User = require('../models/user-model');
const createToken = require('../utils/generateToken');

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.login(email, password);

  if (user) {
    createToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const signupUser = asyncHandler(async (req, res, next) => {
  const { username, email, password, verifyPassword } = req.body;

  const user = await User.signup(
    username,
    email,
    password,
    verifyPassword
  );

  if (user) {
    createToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'User logged out' });
});


exports.loginUser = loginUser;
exports.signupUser = signupUser;
exports.logoutUser = logoutUser;
