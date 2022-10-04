const express = require('express');

//middlewares
const { characterExist } = require('../middlewares/characterMiddleware');

//controllers
const {
  getAllCharacters,
  createCharacter,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
} = require('../controllers/characterController');

//utils
const { upload } = require('../utils/multer');

const router = express.Router();

router
  .route('/')
  .get(getAllCharacters)
  .post(upload.single('imgCharacter'), createCharacter);

router
  .route('/:id')
  .get(characterExist, getCharacterById)
  .patch(characterExist, updateCharacter)
  .delete(characterExist, deleteCharacter);

module.exports = { characterRoutes: router };
