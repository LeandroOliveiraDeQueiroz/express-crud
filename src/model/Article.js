const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {type: String, index: {unique: false, background: false }, required: true},
  body: {type: String, required: true },
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Article', articleSchema);