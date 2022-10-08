const express = require('express');

//controller
const { renderIndex } = require('../controllers/viewsController');

const router = express.Router();

router.get('/', renderIndex);

module.exports = { viewsRoutes: router };
