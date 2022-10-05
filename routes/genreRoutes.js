const express = require('express');

//middlewares
const {
  protectToken,
  protectAdmin,
  protectAccountOwner,
  checkToken,
} = require('../middlewares/usersMiddlewares');

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

router.use(protectToken);
router.get('/check-token', checkToken);

router.route('/').get(getAllGenres).post(protectAdmin, createGenre);

router.route('/:id').patch(updateGenre).delete(deleteGenre);

module.exports = { genreRoutes: router };
