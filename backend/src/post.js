const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  postBy: String,
  email: String,
  picture: String,
  header: String,
  content: String,
});

module.exports = mongoose.model('Post', postSchema);
