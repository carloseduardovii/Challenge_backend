const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Controllers
const { globalErrorHandler } = require('./controllers/errorsController');

// Routers
const { usersRouters } = require('./routes/usersRoutes');
const { characterRoutes } = require('./routes/characterRoutes');
const { movieRoutes } = require('./routes/movieRoutes');
const { genreRoutes } = require('./routes/genreRoutes');

//utils
const multer = require('multer');

// Init express app
const app = express();

// Enable CORS
app.use(cors());

// Enable incoming JSON data
app.use(express.json());

//Enable imcomming Form-Data
app.use(express.urlencoded({ extended: true }));

// Set Pug as template engine email
app.set('view engine', 'pug');

// Limit IP requests
const limiter = rateLimit({
  max: 10000,
  windowMs: 1 * 60 * 60 * 1000, // 1 hr
  message: 'Too many requests from this IP',
});

app.use(limiter);

// Endpoints
app.use('/api/v1/characters', characterRoutes);
app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/genres', genreRoutes);
app.use('/api/v1/users', usersRouters);

// Global error handler
app.use('*', globalErrorHandler);

module.exports = { app };
