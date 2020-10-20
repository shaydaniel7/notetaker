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
var app = express();
var PORT = process.env.PORT || 3000;

//notes
const notes = [];

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

// GET-----------------------

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname,'./public/notes.html'));

  // if (notes.length === 0) {
  //   return res.json({ message: "You have no notes." })
  // } else {
  //   return res.json(notes);
  // }
});

app.get('/api/notes', (req, res) => {
  return res.json(db);
});

// POST-----------------------

app.post('/api/notes/new', (req, res) => {
  const id = uuid();
  const newNote = {
    id: id,
    title: req.body.title,
    text: req.body.text
  };

  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    const myNotes = JSON.parse(data);
    myNotes.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(myNotes, null, 2), err => {
      if (err) throw err;
      res.send(db);
      console.log("Note created!")
    });
  });
});
  // const noteBody = req.body.note;
  // const note = new Note(id, noteBody);
  // db.push(note);
  // console.log(noteBody);
  // res.json(notes);
// });

// DELETE-----------------------

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log('App listening on PORT ' + PORT);
});
