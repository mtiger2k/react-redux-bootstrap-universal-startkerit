import r from 'rethinkdb';
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
require('dotenv').config();
const bcrypt = require('bcrypt-nodejs');

import connect from './connect';

// Create Local Strategy
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  connect()
    .then(conn => {
      r.table('user').filter(r.row('email').eq(email)).run(conn).then((cursor) => cursor.next())
      .then((user) => {
          bcrypt.compare(password, user.password, function(err, isMatch) {
            if (err) { done(err); }
              // If not, call done without a user object
              if (!isMatch) {
                done(null, false);
              }

              // Call done with user if verified
              done(null, user);
          })
      }).catch((error) => {
        done(error);
      });
    });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  //secretOrKey: config.secret
  secretOrKey: process.env.SECRET
}

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  connect()
    .then(conn => {
      r.table('user')
      .get(payload.sub).run(conn)
      .then((user) => {done(null, user);})
      .catch((error) => {done(null, false);});
    });
});

// Tell passport to use straegy
passport.use(jwtLogin);
passport.use(localLogin);
