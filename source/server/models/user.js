const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  dispName: String,
  email: { type: String, unique: true, lowercase: true },
  password: String,
  city: String,
  state: String
});

// Pre-save hook to hash password
userSchema.pre('save', function(next) {
  const user = this;
  
  // Generate a encryption salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // Encrypt the password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // Overwrite plain text password
      user.password = hash;
      next();
    });
  });
});

// Compare passwords method
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  })
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
