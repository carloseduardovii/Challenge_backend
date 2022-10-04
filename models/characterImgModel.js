const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const ImgCharacter = db.define('imgCharacter', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  characterImgUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  characterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    defaultValue: 'active',
    type: DataTypes.STRING,
  },
});

module.exports = { ImgCharacter };
