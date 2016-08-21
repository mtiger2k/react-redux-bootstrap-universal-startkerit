const Authentication = require('./controllers/authentication');
const User = require('./controllers/user');
const Book = require('./controllers/book');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false } );
const requireSignin = passport.authenticate('local', { session: false} );

module.exports = function(app) {
  // sign up and sign in are handled by auth controller
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

  // fetching and changing user account is handled by user controller
  app.get('/user', requireAuth, User.getuser);
  app.put('/user', requireAuth, User.updateuser);
  app.delete('/user', requireAuth, User.deleteuser);

  // adding and requesting books is handled by book controller
  app.get('/books', Book.getallbooks);
  app.post('/books', requireAuth, Book.addbook);
  app.delete('/books', requireAuth, Book.deletebook);

  app.post('/books/request', requireAuth, Book.requestbook);
  app.put('/books/request', requireAuth, Book.approverequest);
  app.delete('/books/request', requireAuth, Book.removerequest);

}
