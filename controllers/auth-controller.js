const jwt = require('jsonwebtoken');

const User = require('../models/user-model');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

////////// POST //////////
// LOGIN //
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    const userInfo = {
      username: user.username,
      email: user.email,
      token: token,
      id: user._id,
      image: user.imagePath,
      birthday: user.birthday,
      favorites: user.favorites,
    };

    res.status(200).json({ userInfo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

///// SIGNUP /////
const signupUser = async (req, res, next) => {
  const {username, email, password, birthday } = req.body;
  try {
    const user = await User.signup(username, email, password, birthday);
    const token = createToken(user._id);
    const displayBirthday = new Date(user.birthday).toISOString().split('T')[0];
    const userInfo = {
      username: user.username,
      email: user.email,
      token: token,
      id: user._id,
      image: user.imagePath,
      birthday: displayBirthday,
      favorites: user.favorites,
    };

    res.status(200).json({ userInfo });
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};

exports.loginUser = loginUser;
exports.signupUser = signupUser;
