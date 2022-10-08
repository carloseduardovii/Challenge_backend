const path = require('path');

//models
const { Movie } = require('../models/movieModel');

//utils
const { catchAsync } = require('../utils/catchAsync');

const renderIndex = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll();

  res.status(200).render('emails/baseEmail');
});

module.exports = { renderIndex };
