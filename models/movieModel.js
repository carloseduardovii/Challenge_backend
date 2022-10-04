const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Movie = db.define('movie', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  movieImgUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  releaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  genreId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rate: {
    type: DataTypes.INTEGER,
  },
  status: {
    defaultValue: 'active',
    type: DataTypes.STRING,
  },
});

module.exports = { Movie };
