const express = require('express');

//middlewares
const { movieExist } = require('../middlewares/movieMiddleware');

//controlles
const {
  getAllMovies,
  getMovieByParameter,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movieController');

//utils
const { upload } = require('../utils/multer');

const router = express.Router();

router
  .route('/')
  .get(getAllMovies)
  .post(upload.single('imgMovie'), createMovie);

router
  .route('/:id')
  .get(movieExist, getMovieByParameter)
  .patch(movieExist, updateMovie)
  .delete(movieExist, deleteMovie);

module.exports = { movieRoutes: router };
