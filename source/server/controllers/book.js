const Book = require('../models/book');
const mongoose = require('mongoose');

// Add book to database
exports.addbook = function(req, res, next) {
  const newBook = new Book(req.body)
  newBook.addedBy = mongoose.Types.ObjectId(req.user._id);

  newBook.save(function(err, book) {
    if (err) {
      // Respond to request with error
      return res.status(400).send({ error: 'Error adding book to database.'} );
    }

    // Respond to request with new book
    res.json(book);
  });

}

// Remove book from database
exports.deletebook = function(req, res, next) {
  Book.findOne({ _id: req.body._id })
    .remove()
    .exec(function(err, data) {
      if (err) {
        // Respond to request with error
        return res.status(400).send({ error: 'Error removing book.' });
      }

      // Respond to request with id of removed book
      return res.json({ _id: req.body._id });
    })
}

// Get all books in the database
exports.getallbooks = function(req, res, next) {
  Book.find({}, function(err, data) {
      if (err) {
        // Respond to request with error
        return res.status(400).send({ error: 'Error fetching all books.'} )
      }

      // Respond to request with all books
      return res.json(data);
    })
}

// Place a request on a book
exports.requestbook = function(req, res, next) {
  Book.findOne({
      _id: mongoose.Types.ObjectId(req.body._id)
    }, function(err, existingBook) {

    if (err) {
      // Respond to request with error
      return res.status(422).send({ error: 'Error accessing book. Try again later' })
    }

    if (existingBook) {
      // Merge changes into existing book
      const updatedBook = Object.assign(existingBook, { userRequest: { user: mongoose.Types.ObjectId(req.user._id), approved: false } });

          // Update user in database
          Book.update({
              _id: mongoose.Types.ObjectId(req.body._id)
            }, updatedBook, function(err) {
              if (err) {
                // Respond to request with error
                return res.status(400).send({ error: 'Error requesting book. Try again later' })
              }

              // Find and return updated book  - note this is necessary because update does not return the doc
              Book.findOne({
                _id: mongoose.Types.ObjectId(req.body._id)
              }, function(err, returnBook) {
                if (err) {
                  // Respond to request with error
                  return res.status(400).send({ error: 'Book was requested, but something went wrong.' })
                }

                // Respond to request with requested book
                res.json(returnBook)
              })
          });
    }
    else {
    // Could not find book to update in db, respond to request with error
      return res.status(400).send({ error: 'Hmm...Cannot locate book. Try again later' })
    }
  });
}

exports.approverequest = function(req, res, next) {
  Book.findOne({
      _id: mongoose.Types.ObjectId(req.body._id)
    }, function(err, book) {

    if (err) {
      // Respond to request with error
      return res.status(422).send({ error: 'Error accessing book. Try again later' })
    }

    if (book) {
      book.userRequest.approved = true;
      book.save(function(err, savedBook) {
        if (err) {
          // Respond to request with error
          return res.status(400).send({ error: 'Error requesting book. Try again later' })
        }

        // Respond to request with requested book
        return res.json(savedBook)
      });
    }
    else {
    // Could not find book to update in db, respond to request with error
      return res.status(400).send({ error: 'Hmm...Cannot locate book. Try again later' })
    }
  });
}

exports.removerequest = function(req, res, next) {
  Book.findOne({
      _id: mongoose.Types.ObjectId(req.body._id)
    }, function(err, book) {

    if (err) {
      // Respond to request with error
      return res.status(422).send({ error: 'Error accessing book. Try again later' })
    }

    if (book) {
      book.userRequest = undefined;
      book.save(function(err, savedBook) {
        if (err) {
          // Respond to request with error
          return res.status(400).send({ error: 'Error requesting book. Try again later' })
        }

        // Respond to request with requested book id
        return res.json(savedBook)
      });
    }
    else {
    // Could not find book to update in db, respond to request with error
      return res.status(400).send({ error: 'Hmm...Cannot locate book. Try again later' })
    }
  });
}
