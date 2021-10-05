const path = require('path');
const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.getMain);
router.get('/users', mainController.getUsers);
router.get('/saveusers', mainController.saveUsers); // this is supposed to be a post route, just testing

module.exports = router;