const User = require('../models/user');
const Book = require('../models/book');
const mongoose = require('mongoose');

exports.getuser = function(req, res, next) {
  // Return authenticated user, sans password
  res.json(req.user);
}

exports.updateuser = function(req, res, next) {
  // Check if user is in database
  User.findOne({
      _id: mongoose.Types.ObjectId(req.user._id)
    }, function(err, existingUser) {

      if (err) {
        return res.status(422).send({ error: 'Error accessing account. Try again later' })
      }

      if (existingUser) {
        // Merge changes into existing user
        const updatedUser = Object.assign(existingUser, req.body.user);

        // Update user in database
        User.update({
            _id: mongoose.Types.ObjectId(req.user._id)
          }, updatedUser, function(err) {
            if (err) {
              return res.status(400).send({ error: 'Error updating account. Try again later' })
            }

            // Find and return updated user  - note this is necessary because update does not return the doc
            User.findOne({
              _id: mongoose.Types.ObjectId(req.user._id)
            },'-password', function(err, returnUser) {
              res.json(returnUser)
            })
        });
      }
      else {
        // Could not find user to update in db
        return res.status(400).send({ error: 'Hmm...Cannot locate account. Try again later' })
      }
    });
}

exports.deleteuser = function(req, res, next) {
  // First delete the user's books
  Book.find(
    { addedBy: mongoose.Types.ObjectId(req.user._id) }
  )
  .remove()
  .exec(function(err, data) {
      if (err) {
        // Respond to request with error
        return res.status(400).send({ error: 'Error removing documents.'} )
      }
  })
  // Then delete the user's requests
  .then(function() {
      Book.find(
        { 'userRequest.user': mongoose.Types.ObjectId(req.user._id) },
        function(err, docs) {
          if (err) {
            // Respond to request with error
            return res.status(422).send({ error: 'Error deleting user requests.' })
          }

          docs.map((book) => {
            book.userRequest = undefined
            book.save(function(err, savedBook){
              return savedBook
            })
          })
      })
  })
  // Then delete the user
  .then(function() {
      User.findOne(
        { _id: mongoose.Types.ObjectId(req.user._id)}
      )
      .remove(function(err) {
          if (err) {
            return res.status(400).json({ error: 'There was an error removing your account.' });
          }
          // Respond with the user ID so the store can be updated
          return res.json({ _id: req.user._id} );
      })
  });
}
