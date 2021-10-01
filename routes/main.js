const path = require('path');
const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');


router.get('/', mainController.getMain);

module.exports = router;