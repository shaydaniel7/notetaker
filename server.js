// Dependencies
// =============================================================
const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json')
const uuid = require('uuid');
// const Note = require("./models/Note")

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// GET-----------------------

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(db);
});

// POST-----------------------
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuid();
  db.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(db));
  res.json(newNote);

});

// DELETE-----------------------

app.delete('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const newNotes = notes.filter((note) => {
    return note.id !== id;
  });
  fs.writeFileSync('./db/db.json', JSON.stringify(newNotes));
  notes = newNotes;
  res.json(newNotes);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log('App listening on PORT ' + PORT);
});
