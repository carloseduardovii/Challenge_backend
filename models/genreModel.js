const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Genre = db.define('genre', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    defaultValue: 'active',
    type: DataTypes.STRING,
  },
});

module.exports = { Genre };
