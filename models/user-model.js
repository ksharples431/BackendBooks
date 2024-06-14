const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    // books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (
  username,
  email,
  password,
  verifyPassword
) {
  if (!username || !email || !password || !verifyPassword) {
    throw new Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw new Error('Email not valid');
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error('Please choose a stronger password');
  }
  if (password !== verifyPassword) {
    throw new Error('Passwords do not match');
  }

  const userExists = await this.findOne({ email });

  if (userExists) {
    throw new Error('Email already in use');
  }

  try {
    const user = await this.create({ username, email, password });
    return user; 
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw error; 
  }
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error('All fields must be filled');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error('No user exists with this email');
  }

  const isMatch = await user.comparePassword(password); 

  if (!isMatch) {
    throw new Error('Incorrect password');
  }

  return user;
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
