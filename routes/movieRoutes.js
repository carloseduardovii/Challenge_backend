const express = require('express');

//middlewares
const { movieExist } = require('../middlewares/movieMiddleware');
const {
  protectToken,
  protectAdmin,
  checkToken,
} = require('../middlewares/usersMiddlewares');

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

router.route('/').get(getAllMovies);
router.route('/:id').get(movieExist, getMovieByParameter);

router.use(protectToken, protectAdmin);
router.get('/check-token', checkToken);

router.route('/').post(upload.single('imgMovie'), createMovie);

router
  .route('/:id')
  .patch(movieExist, updateMovie)
  .delete(movieExist, deleteMovie);

module.exports = { movieRoutes: router };
