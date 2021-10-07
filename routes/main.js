const path = require('path');
const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', checkAuthenticated, mainController.getMain);
router.get('/login', mainController.getLogin)
router.post('/login', mainController.postLogin)

router.get('/users',  checkAuthenticated, mainController.getUsers);
router.get('/saveusers', mainController.saveUsers); // this is supposed to be a post route, just testing

function checkAuthenticated(req, res, next){

    let token = req.cookies['session-token'];

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