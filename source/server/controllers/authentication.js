const jwt = require('jwt-simple');
const User = require('../models/user');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
}

exports.signin = function(req, res, next) {
  // User is authenticated by passport, but needs a token
  res.send( { token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
  const dispName = req.body.dispName;
  const email = req.body.email;
  const password = req.body.password;

  // Check that both email and password were provided
  if(!email || !password) {
    return res.status(422).send({ error: 'You must provide both an email and a password.' });
  }

  // See if a user with given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return error
    if (existingUser) {
      return res.status(422).send({ error: 'An account with that email already exists.' });
    }

    // If a user with email does not exists, create & save user
    const user = new User({
      dispName: dispName,
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) { return next(err); }

      // Respond to request with new user
      res.json({ token: tokenForUser(user) } );
    });
  });
}
