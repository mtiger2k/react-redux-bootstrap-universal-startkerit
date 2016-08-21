const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
require('dotenv').config();

// Create Local Strategy
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify email and password
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(false); }

    // Compare passwords
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }

      // If not, call done without a user object
      if (!isMatch) {
        return done(null, false);
      }

      // Call done with user if verified
      return done(null, user);
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
  // See if the user ID in the payload exists in the database
  User.findOne({ _id: payload.sub },'-password', function(err, user) {
    if (err) { return done(err, false); }

    // If it does, call down with user
    if (user) {
      done(null, user);

    // If not, call done without a user object
    } else {
      done(null, false);
    }

  });
});

// Tell passport to use straegy
passport.use(jwtLogin);
passport.use(localLogin);
