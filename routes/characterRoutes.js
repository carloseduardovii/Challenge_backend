const express = require('express');

//middlewares
const { characterExist } = require('../middlewares/characterMiddleware');
const {
  protectToken,
  protectAdmin,
  checkToken,
} = require('../middlewares/usersMiddlewares');

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

router.route('/').get(getAllCharacters).get(characterExist, getCharacterById);

router.use(protectToken, protectAdmin);
router.get('/check-token', checkToken);

router
  .route('/')
  .post(upload.single('imgCharacter'), protectAdmin, createCharacter);

router
  .route('/:id')
  .patch(characterExist, updateCharacter)
  .delete(characterExist, deleteCharacter);

module.exports = { characterRoutes: router };
