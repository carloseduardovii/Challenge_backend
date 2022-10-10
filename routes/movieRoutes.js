const express = require('express');

//middlewares
const { movieExist, genreExist } = require('../middlewares/movieMiddleware');
const {
  protectToken,
  protectAdmin,
  checkToken,
} = require('../middlewares/usersMiddlewares');

//controlles
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movieController');

//utils
const { upload } = require('../utils/multer');

const router = express.Router();

router.route('/').get(getAllMovies);

router.route('/:id').get(movieExist, getMovieById);

router.use(protectToken, protectAdmin);
router.get('/check-token', checkToken);

router.route('/').post(upload.single('imgMovie'), createMovie);

router
  .route('/:id')
  .patch(movieExist, updateMovie)
  .delete(movieExist, deleteMovie);

module.exports = { movieRoutes: router };
