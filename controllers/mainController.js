// IMPORT MODELS HERE
const User = require('../models/User');

exports.getMain = (req, res, next) => {
  res.render("index", {
    pageTitle: "Página Inicial",
    path: "/",
  });
};

exports.getUsers = async (req, res, next) => {
  const users = await User.findAll();
  return res.json(users);
};
