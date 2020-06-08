const express = require('express');
const app = express();

const path = require('path');

//Set our views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Our routes
const routes = require('./routes.js');
app.use('/', routes);

//Start out server
app.listen(process.env.PORT || 3000);
 