//models
const { Genre } = require('../models/genreModel');
const { Movie } = require('../models/movieModel');

//utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

//CRUD's
const getAllGenres = catchAsync(async (req, res, next) => {
  const genres = await Genre.findAll({
    where: {
      status: 'active',
    },
    attributes: { exclude: ['movieId', 'createdAt', 'updatedAt'] },
    include: {
      model: Movie,
      attributes: { exclude: ['genreId', 'createdAt', 'updatedAt'] },
    },
  });

  res.status(201).json({ genres });
});

const createGenre = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const newGenre = await Genre.create({ name });
  res
    .status(201)
    .json({ status: 'Genre have been created successfully', newGenre });
});
const updateGenre = catchAsync(async (req, res, next) => {});
const deleteGenre = catchAsync(async (req, res, next) => {});

module.exports = { getAllGenres, createGenre, updateGenre, deleteGenre };
