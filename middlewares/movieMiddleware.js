// models
const { Movie } = require('../models/movieModel');

//utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const movieExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({ where: { id, status: 'active' } });

  if (!movie) {
    return next(new AppError('¡Sorry! Movie does not exist', 404));
  }

  //Add character data to the req object
  req.movie = movie;

  next();
});

module.exports = { movieExist };
