// models
const { Character } = require('../models/characterModel');

//utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const characterExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const character = await Character.findOne({ where: { id } });

  if (!character) {
    return next(new AppError('Character does not exist with given Id', 404));
  }

  //Add character data to the req object
  req.character = character;

  next();
});

module.exports = { characterExist };
