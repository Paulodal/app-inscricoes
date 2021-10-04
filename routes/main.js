const path = require('path');
const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.getMain);
router.get('/users', mainController.getUsers);

module.exports = router;