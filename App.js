const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

const mainRoutes = require ('./routes/main');
app.use('/', mainRoutes);

// temporary, must build online paths later

app.listen(3000);