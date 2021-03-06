const path = require('path');
const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

// google auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '269418576122-6f3tc12u3otbgi12dfso6g9og6r11300.apps.googleusercontent.com' // ID teste (Paulo)
const client = new OAuth2Client(CLIENT_ID);

router.get('/', checkAuthenticated, mainController.getMain);
router.get('/login', mainController.getLogin)
router.post('/login', mainController.postLogin)

router.get('/users',  checkAuthenticated, mainController.getUsers);
router.get('/saveusers', checkAuthenticated, mainController.saveUsers); // this is supposed to be a post route, just testing

function checkAuthenticated(req, res, next){

    let token = req.cookies['session-token'];
    // console.log(token)

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        user.email = payload.email;
      }
      verify()
      .then(()=>{
          req.user = user;
          next(); // Como faço para o redirect ir para a página onde a pessoa estava?
      })
      .catch(err=>{
          res.redirect('/login')
      })

}

module.exports = router;