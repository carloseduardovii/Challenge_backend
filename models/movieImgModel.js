const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const ImgMovie = db.define('imgMovie', {
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
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    defaultValue: 'active',
    type: DataTypes.STRING,
  },
});

module.exports = { ImgMovie };
