const {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
} = require('firebase/storage');

//models
const { Character } = require('../models/characterModel');
const { characterImgUrl } = require('../models/characterImgModel');
const { Movie } = require('../models/movieModel');

//utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { storage } = require('../utils/firebase');

//CRUD's
const getAllCharacters = catchAsync(async (req, res, next) => {
  const characters = await Character.findAll({
    where: { status: 'active' },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      model: Movie,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
    //  attributes: ['name'],
  });

  const charactersPromise = characters.map(async character => {
    const imgRef = ref(storage, character.characterImgUrl);
    const url = await getDownloadURL(imgRef);

    //Update characters's image property
    character.characterImgUrl = url;
    return character;
  });

  const charactersResolve = await Promise.all(charactersPromise);

  res.status(201).json({ characters: charactersResolve });
});

const getCharacterById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  // const { sessionuser } = req;

  const character = await Character.findOne({
    where: {
      id,
      status: 'active',
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      model: Movie,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
  });

  // sessionUser.id

  //Get URL image from firebase
  const imgRef = ref(storage, character.characterImgUrl);
  const url = await getDownloadURL(imgRef);

  //Update movie's image property
  character.characterImgUrl = url;

  res.status(200).json({ status: 'Success', character });
});

const createCharacter = catchAsync(async (req, res, next) => {
  const { characterImgUrl, name, age, weigth, history, movieId } = req.body;
  // const { usersession } = req;

  //Creating route of img files and upload them to firebase
  const imgRef = ref(storage, `characters/${req.file.originalname}`);

  //use uploadBytes to use img buffer
  await uploadBytes(imgRef, req.file.buffer);

  //get url image
  const url = await getDownloadURL(imgRef);

  const newCharacter = await Character.create({
    characterImgUrl: url,
    name,
    age,
    weigth,
    history,
    movieId,
    // userId: sessionUser.id,
  });

  res.status(201).json({
    status: 'Character have been created successfully',
    newCharacter,
  });
});

const updateCharacter = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, age, weigth, history } = req.body;

  const character = await Character.findOne({ where: { id } });

  await character.update({ name, age, weigth, history });

  res
    .status(200)
    .json({ status: 'Character have been updated successfully', character });
});

const deleteCharacter = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const character = await Character.findOne({ where: { id } });

  await character.update({ status: 'deleted' });

  res.status(200).json({ status: 'Product have been deleted successfully' });
});

module.exports = {
  getAllCharacters,
  createCharacter,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
};
