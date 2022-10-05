const {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
} = require('firebase/storage');

//models
const { Movie } = require('../models/movieModel');
const { Character } = require('../models/characterModel');
const { ImgMovie } = require('../models/movieImgModel');
const { Genre } = require('../models/genreModel');

//utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { storage } = require('../utils/firebase');

//CRUD's
const getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({
    where: { status: 'active' },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: { model: Genre },
    include: { model: Character, attributes: ['characterImgUrl', 'name'] },
  });

  const moviesPromise = movies.map(async movie => {
    const imgRef = ref(storage, movie.movieImgUrl);
    const url = await getDownloadURL(imgRef);

    //Update movie's image property
    movie.movieImgUrl = url;
    return movie;
  });

  const moviesResolve = await Promise.all(moviesPromise);

  res.status(200).json({ movies: moviesResolve });
});

const getMovieByParameter = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({
    where: { id, status: 'active' },
    attributes: ['movieImgUrl', 'title', 'releaseDate', 'rate', 'genreId'],
    include: { model: Genre, attributes: ['name'] },
    include: { model: Character, attributes: ['characterImgUrl', 'name'] },
  });

  //Get URL image from firebase
  const imgRef = ref(storage, movie.movieImgUrl);
  const url = await getDownloadURL(imgRef);

  //Update movie's image property
  movie.movieImgUrl = url;

  res.status(200).json({ status: 'Success', movie });
});

const createMovie = catchAsync(async (req, res, next) => {
  const { movieImgUrl, title, genreId, releaseDate, rate } = req.body;

  // console.log(req.file);
  // console.table(req.body);

  //Creating route of img files and upload them to firebase
  const imgRef = ref(storage, `movies/${req.file.originalname}`);

  //use uploadBytes to use img buffer
  await uploadBytes(imgRef, req.file.buffer);

  //get url image
  const url = await getDownloadURL(imgRef);

  //create movie info and firebase img
  const newMovie = await Movie.create({
    movieImgUrl: url,
    title,
    genreId,
    releaseDate,
    rate,
  });

  res.status(201).json({ status: 'success', newMovie });
});

const updateMovie = catchAsync(async (req, res, next) => {
  const { movie } = req;
  const { imgMovie, title, releaseDate, rate, characterId } = req.body;

  await movie.update({
    imgMovie,
    title,
    releaseDate,
    rate,
    characterId,
  });

  res.status(200).json({ status: 'success', movie });
});

const deleteMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({ where: { id } });

  await movie.update({ status: 'deativated' });

  res
    .status(200)
    .json({ status: 'Movie have been deleted successfully', movie });
});

module.exports = {
  getAllMovies,
  getMovieByParameter,
  createMovie,
  updateMovie,
  deleteMovie,
};
