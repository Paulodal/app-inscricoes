const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Volunteer = require('../models/Volunteer');

const connection = new Sequelize(dbConfig);

User.init(connection);
Volunteer.init(connection);

// User.associate(connection.models);

module.exports = connection;