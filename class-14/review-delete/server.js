'use strict';

require('dotenv').config();
const express = require('express');
const pg = require('pg');

const app = express();
app.set('view engine', 'ejs');
const client = new pg.Client(process.env.DATABASE_URL);

app.get('/', showPeople);

function showPeople(req, res) {
  const SQL = 'SELECT * FROM people ORDER BY name ASC';
  client.query(SQL)
    .then(results => {
      res.status(200).render('index', { people: results.rows });
    });
}

function startServer() {
  app.listen(process.env.PORT, () => console.log('Server listening on', process.env.PORT));
}
client.connect()
  .then(startServer);
