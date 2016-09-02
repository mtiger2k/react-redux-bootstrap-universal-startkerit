const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
//const router = require('./router');
const router = require('./rethinkdb/router');
const mongoose = require('mongoose');

import { apolloServer } from 'graphql-tools';
import Schema from './data/schema';
import Resolvers from './data/resolvers';

require('dotenv').config();

// DB Setup
const mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost/booktrader";

mongoose.connect(mongoUri, function(err) {
    if(err) {
        console.log("connection error", err +" on "+mongoUri);
    } else {
        console.log("connection to "+mongoUri+" successful");
    }
});


// App setup
var app = express();
var PORT = process.env.API_PORT;
app.use(bodyParser.json({ type: '*/*' }));
router(app);

app.use('/graphql', apolloServer({
    graphiql: true,
    pretty: true,
    schema: Schema,
    resolvers: Resolvers,
    //mocks: Mocks,
}));

app.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});
