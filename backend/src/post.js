const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  postBy: String,
  email: String,
  header: String,
  content: Object
});

module.exports = mongoose.model('Post', postSchema);