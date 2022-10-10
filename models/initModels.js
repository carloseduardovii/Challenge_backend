// Establish your models relations inside this function
const { Character } = require('./characterModel');
const { ImgCharacter } = require('./characterImgModel');
const { Movie } = require('./movieModel');
const { ImgMovie } = require('../models/movieImgModel');
const { Genre } = require('./genreModel');

const initModels = () => {
  // 1 Movie ==> many Characters
  Movie.hasMany(Character, { foreignKey: 'movieId' });
  Character.belongsTo(Movie);

  // 1 movie ==> some images
  Movie.hasMany(ImgMovie);
  ImgMovie.belongsTo(Movie);

  // 1 movie ==> some images
  Character.hasMany(ImgCharacter, { foreignKey: 'characterId' });
  ImgCharacter.belongsTo(Character);

  // 1 Genre ==> many movies
  Genre.hasMany(Movie, { foreignKey: 'genreId' });
  Movie.belongsTo(Genre);
};

module.exports = { initModels };
