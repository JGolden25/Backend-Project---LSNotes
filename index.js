const express = require('express');
const db = require('./data/db');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const cors = require('cors');
const server = express();
server.use(express.json());

server.use(helmet());
server.use(cors());


server.get('/notes', (req, res) => {
  try {
    const notes = await db.select().from('notes');
    res.status(200).json(notes);
  } catch (err) {
    console.log('', err);
    res
      .status(500)
      .send({ error: 'Unable to retrieve notes. Please try again later.' });
  }
});

server.post('/notes/', async (req, res) => {
  let note = req.body;
  if (!'title' in note) {
    res.status(400).send({ error: '' });
  } else if (note.title.length > 40) {
    res
      .status(400)
      .send({ error: '' });
  }

server.get('/notes/:id', (req, res) => {
    const { id } = req.params;
    try {
      const note = await db('notes').where({ id });
      res.status(200).json(note);
    } catch (err) {
      console.log('/notes GET error:', err);
      res
        .status(500)
        .send({ error: 'Unable to retrieve this note. Please try again later.' });
    }
  });

  server.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    db('notes')
      .where({ id: id })
      .del()

  

const port = 6000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});