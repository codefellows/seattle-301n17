'use strict';

require('dotenv').config();
const express = require('express');

const app = express();

const PORT = process.env.PORT;

// Express Setup
app.set('view engine', 'ejs');

// Route Definitions
app.use( express.static('./www'));

// When someone does a get request for '/', run handleHomePage
app.get('/', handleHomePage);
app.get('/add', handleAddItem);
app.get('/bad', causeError);
app.use('*', notFoundHandler);
app.use(errorHandler);

// Route Handlers

function handleHomePage( request, response ) {
  // Send a response to the browser with a code of 200
  // Render the contents of './views/pages/index.ejs'
  response.status(200).render('pages/index');
}

function handleAddItem( request, response ) {
  response.status(200).render('pages/add');
}

function causeError( request, response ) {
  throw new Error('This just happened');
}

function notFoundHandler( request, response ) {
  response.status(404).render('pages/404');
}

function errorHandler( error, request, response, next ) {
  // JS Shorthand Trick: {error} is the same thing as {error:error}
  response.status(500).render('pages/500', {error});
}

function startServer(PORT) {
  app.listen(PORT, () => console.log(`Up on port ${PORT}`));
}

startServer(PORT);
