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
  return res.json(db);
});

// POST-----------------------
app.post('/notes', (req, res) => {
  fs.readFile('/db/db.json', (err, data) => {
    if (err) throw err;
    db = JSON.parse(data);
    db.push(req.body);
    fs.writeFile('/db/db.json', JSON.stringify(db));
  });
});


app.post('/api/notes', (req, res) => {
  const id = uuid();
  const newNote = {
    id: id,
    title: req.body.title,
    text: req.body.text
  };

  fs.readFile('/db/db.json', (err, data) => {
    if (err) throw err;
    db = JSON.parse(data);
    db.push(newNote);
    fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(db));
    res.json(db);
  });
});



// DELETE-----------------------

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log('App listening on PORT ' + PORT);
});
