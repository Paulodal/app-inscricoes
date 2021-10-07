// IMPORT MODELS HERE
const User = require('../models/User');

exports.getMain = (req, res, next) => {
  res.render("index", {
    pageTitle: "Página Inicial",
    path: "/",
  });
};

exports.getLogin = (req, res, next) => {
  res.render("login", {
    pageTitle: "Página de login",
    path: "/login",
  });
};

exports.postLogin = (req, res, next) => {
  let token = req.body.token;
  
  async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
    }
    verify()
    .then(()=>{
        res.cookie('session-token', token);
        res.send('success')
    })
    .catch(console.error);
};

exports.getUsers = async (req, res, next) => {
  const users = await User.findAll();
  return res.json(users);
};

exports.saveUsers = async (req, res, next) => {
  const user = await User.create({
    name: 'Paulo',
    email: 'paulo@gmail.com',
    password: '222'
  });
  return res.json(user);
};

