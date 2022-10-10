const express = require('express');

//middlewares
const {
  protectToken,
  protectAdmin,
  protectAccountOwner,
  checkToken,
} = require('../middlewares/usersMiddlewares');

const { genreExist } = require('../middlewares/movieMiddleware');

//controlles
const {
  getAllGenres,
  createGenre,
  updateGenre,
  deleteGenre,
  getMoviesByGenreId,
} = require('../controllers/genreController');

//utils

//Routes
const router = express.Router();

router.route('/').get(getAllGenres);
router.route('/:id').get(genreExist, getMoviesByGenreId);

router.use(protectToken);
router.get('/check-token', checkToken);

router.route('/').post(protectAdmin, createGenre);
router.route('/:id').patch(updateGenre).delete(deleteGenre);

module.exports = { genreRoutes: router };
