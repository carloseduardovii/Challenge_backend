const express = require('express');

// Middlewares
const {
  userExists,
  protectToken,
  protectAccountOwner,
} = require('../middlewares/usersMiddlewares');

// Controller
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  checkToken,
} = require('../controllers/usersController');

const router = express.Router();

router.post('/', createUser);

router.post('/login', login);

// Apply protectToken middleware
router.use(protectToken);

router.get('/', getAllUsers);

router.get('/check-token', checkToken);

router
  .route('/:id')
  .get(userExists, getUserById)
  .patch(userExists, protectAccountOwner, updateUser)
  .delete(userExists, protectAccountOwner, deleteUser);

module.exports = { usersRouters: router };
