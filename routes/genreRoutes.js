const express = require('express');

//middlewares
//const { movieExist } = require('../middlewares/movieMiddleware');

//controlles
const {
  getAllGenres,
  createGenre,
  updateGenre,
  deleteGenre,
} = require('../controllers/genreController');

//utils

//Routes
const router = express.Router();

router.route('/').get(getAllGenres).post(createGenre);

router.route('/:id').patch(updateGenre).delete(deleteGenre);

module.exports = { genreRoutes: router };
