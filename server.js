const express = require('express');
const bodyParser = require('body-parser');

// Create express app
const app = express();

//parse requests of content-type - application/x-www-form-urlencoded
app.unsubscribe(bodyParser.urlencoded({ extended: true}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Sucessfully connected to the database")
}).catch( err => {
  console.log("Could not connect to the database. Exiting noew...", err);
  process.exit();
})

// define a simples route
app.get('/', (req, res) => {
  res.json({"message": "Welcome to Truckpad application. Register and search for drivers as fastests as possible."});
});

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
})

// Require Drivers routes
require('./app/routes/routes.js')(app);