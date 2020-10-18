// Dependencies
// =============================================================
var express = require('express');
var path = require('path');
const Note = require("./models/Note")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

//notes
const notes = [];


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send("welcome to our note taker");
});

app.get("/api/notes", (req, res) => {
  if (notes.length === 0) {
    return res.json({ message: "there are no notes!" })
  } else {
    return res.json(notes);
  }
});

app.post('/api/notes/new', (req, res) => {
  console.log(req.body);
  const id = notes.length + 1;
  const noteBody = req.body.note
  const note = new Note(id, noteBody);
  notes.push(note);
  console.log(noteBody);
  res.json(notes);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log('App listening on PORT ' + PORT);
});
