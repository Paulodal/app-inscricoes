const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

require('./database');

const errorController = require('./controllers/error');
const app = express();
const cookieParser = require('cookie-parser')

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