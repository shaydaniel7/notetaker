const path = require('path');
const fs = require('fs');
const db = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {
    app.get('/api/notes', function (req, res) {
        res.send(db);
    });
    
    //POST -----------------------------
    app.post('/api/notes', (req, res) => {
        const newNote = req.body;
        newNote.id = uuidv4();
        db.push(newNote);
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(db));
        res.json(newNote);
    });

    // DELETE  -----------------------
    app.delete('/api/notes/:id', (req, res) => {
        const noNote = req.params.id;
        db.splice(noNote, 1);
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(db));
        res.json({ ok: true });
    });
}