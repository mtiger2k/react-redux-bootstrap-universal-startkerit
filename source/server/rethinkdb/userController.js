import r from 'rethinkdb';
import connect from './connect';
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
require('dotenv').config();

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

    connect()
    .then(conn => {
      r.table('user').filter(r.row('email').eq(email)).count().run(conn)
      .then((count) => {
          if (count > 0) {
            return res.status(422).send({ error: 'An account with that email already exists.' });
          } else {
            // If a user with email does not exists, create & save user
            const user = {
              dispName: dispName,
              email: email,
              password: password
            };

          // Generate a encryption salt
          bcrypt.genSalt(10, function(err, salt) {
            if (err) { return next(err); }

            // Encrypt the password using the salt
            bcrypt.hash(user.password, salt, null, function(err, hash) {
              if (err) { return next(err); }

              // Overwrite plain text password
              user.password = hash;
            });
          });

            connect()
              .then(conn => {
                r.table('user')
                .insert(user).run(conn)
                .then(response => {
                  const newuser = Object.assign({}, user, {id: response.generated_keys[0]});
                  res.json({ token: tokenForUser(newuser) } );
                }).catch((error) => {
                  next(error);
                });
              });
          }
      });
    });


}

exports.getuser = function(req, res, next) {
  // Return authenticated user, sans password
  res.json(req.user);
}

exports.updateuser = function(req, res, next) {
  return connect()
  .then(conn => {
    return r.table('user')
    .get(req.user.id).update(req.body.user).run(conn)
    .then((response) => {res.json(req.body.user);})
    .catch((error) => {handleError(res);});
  });
}

exports.deleteuser = function(req, res, next) {
  return connect()
  .then(conn => {
    r.table('user')
    .get(req.user.id).delete().run(conn, function(error, result) {
      res.json({
          error: error,
          result: result
      })
    });
  });
}


function handleError(res) {
    return function(error) {
        console.log(error.message);
        return res.send(400, {error: error.message});
    }
}