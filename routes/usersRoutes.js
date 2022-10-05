const express = require('express');

// Middlewares
const {
  userExists,
  protectToken,
  protectAccountOwner,
  protectAdmin,
  checkToken,
} = require('../middlewares/usersMiddlewares');

// Controller
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
} = require('../controllers/usersController');

const router = express.Router();

router.post('/auth/register', createUser);

router.post('/auth/login', login);

// Apply protectToken middleware
router.use(protectToken);

router.get('/', protectAdmin, getAllUsers);

router.get('/check-token', checkToken);

router
  .route('/:id')
  .get(userExists, protectAdmin, getUserById)
  .patch(userExists, protectAccountOwner, updateUser)
  .delete(userExists, protectAccountOwner, deleteUser);

module.exports = { usersRouters: router };
