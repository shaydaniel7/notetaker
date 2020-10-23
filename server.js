// Dependencies
const express = require('express');

// Set up Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

//ROUTES ------------------------
require('./routes/api-routes')(app);
require('./routes/html-routes')(app);

// Starts the server to begin listening-------------------------
app.listen(PORT, () => { console.log('App listening on PORT ' + PORT); });
