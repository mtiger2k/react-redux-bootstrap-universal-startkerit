const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  google_id: String,
  title: String,
  authors: [{
    type: String
  }],
  thumbnail: String,
  description: String,
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userRequest: {
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    approved:Boolean
  }
});

// Create the model class
const ModelClass = mongoose.model('book', bookSchema);

// Export the model
module.exports = ModelClass;
