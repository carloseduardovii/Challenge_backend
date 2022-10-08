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
const updateGenre = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { name } = req.body;

  const updatedGenre = await Genre.update({ name });

  res
    .status(200)
    .json({ status: 'Genre have been updated successfully', updatedGenre });
});
const deleteGenre = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedGenre = await Genre.findOne({ where: { id } });

  await deletedGenre.update({ status: 'deativated' });

  res.status(200).json({ status: 'Genre have been deleted successfully' });
});

module.exports = { getAllGenres, createGenre, updateGenre, deleteGenre };
