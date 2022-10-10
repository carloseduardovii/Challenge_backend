// models
const { Movie } = require('../models/movieModel');
const { Genre } = require('../models/genreModel');

//utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const movieExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({ where: { id, status: 'active' } });

  if (!movie) {
    return next(new AppError('¡Sorry! Movie does not exist', 404));
  }

  req.movie = movie;

  next();
});

const genreExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const genre = await Genre.findOne({ where: { id, status: 'active' } });

  if (!genre) {
    return next(new AppError('¡Sorry! Genre does not exist', 404));
  }

  req.genre = genre;

  next();
});

module.exports = { movieExist, genreExist };
