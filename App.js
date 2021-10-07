const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

require('./database');

const errorController = require('./controllers/error');
const app = express();
const cookieParser = require('cookie-parser')

// google auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '269418576122-6f3tc12u3otbgi12dfso6g9og6r11300.apps.googleusercontent.com' // ID teste (Paulo)
const client = new OAuth2Client(CLIENT_ID);

// middleware
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

const mainRoutes = require ('./routes/main');
app.use('/', mainRoutes);
app.use('/login', mainRoutes)
app.use(errorController.get404);

// temporary, must build online paths later

app.listen(3000);