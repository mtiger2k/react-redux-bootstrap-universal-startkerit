const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const mongoose = require('mongoose');
require('dotenv').config();

// App setup
var app = express();
var PORT = process.env.API_PORT;
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// DB Setup
const mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost/booktrader";

mongoose.connect(mongoUri, function(err) {
    if(err) {
        console.log("connection error", err +" on "+mongoUri);
    } else {
        console.log("connection to "+mongoUri+" successful");
    }
});

app.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});
