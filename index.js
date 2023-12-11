require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user-routes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();

const cors = require('cors');
let allowedOrigins = ['http://localhost:8080', 'http://localhost:1234'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        let message =
          'The CORS policy for this application doesn’t allow access from origin ' +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'log.txt'),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));


// Routes
app.use('/documentation', express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my book club!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.use('/users', userRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (res.headerSent) {
    return next(err);
  }
  res.status(err.code || 500);
  res.json({ message: err.message || 'An unknown error occured! (index.js)' });
});

// DB Connection
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.CONNECTION_URI)
  .then(() => {
    const port = process.env.PORT || 8080;
    app.listen(port, '0.0.0.0', () => {
      console.log('Listening on Port ' + port);
    });
  })
  .catch((error) => {
    console.log(error);
  });

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});
