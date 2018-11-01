const express = require('express');
const db = knex(knexConfig.development);
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const cors = require('cors');
const server = express();
server.use(express.json());

const corsOptions = {
  origin: 'http://localhost:7777'
};
server.use(helmet());
server.use(cors(corsOptions));


server.get('/notes', async (req, res) => {
  try {
    const notes = await db.select().from('notes');
    res.status(200).json(notes);
  } catch (err) {
    console.log('error GETTING', err);
    res
      .status(500)
      .send({ error: 'Unable to retrieve notes. Please try again later.' });
  }
});

server.post('/notes/', async (req, res) => {
  let note = req.body;
  if (!'title' in note) {
    res.status(400).send({ error: 'Title required' });
  } else if (note.title.length > 40) {
    res
      .status(400)
      .send({ error: 'Title must be shorter than 40 chars' });
  }
  try {
    await db.insert(note).into('notes');
    res.status(201).json({ msg: 'Your note was successfully saved.' });
  } catch (err) {
    console.log('/notes POST error:', err);
    res
      .status(500)
      .send({ error: 'Note was not saved. Try again later.' });
  }
});

server.get('/notes/:id', async (req, res) => {
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


  server.put('/notes/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const title = req.body.title;
    const body = req.body.body;
    const note = { title, body };
    console.log(note);
    if (!note.title || !note.body) {
      res.status(400).json({ error: 'note must have a title and body' });
    }

  //delete  by id
  server.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    db('notes')
      .where({ id: id })
      .del()
      .then(deleteid => {
        db('notes')
          .then(note => {
            res.status(200).json(note);
          })
          .catch(err => {
            res.status(400).json({ error: 'Can not grab notes' });
          });
      })
      .catch(err => {
        res.status(400).json({ error: 'could not delete note' });
      });
  });
  

const port = 7777;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
}

)})
