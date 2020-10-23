const path = require('path');

module.exports = function (app) {

    //GET -------------------------
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    app.get('/api/notes', (req, res) => {
        res.json(db);
    });
}