const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  image_url: {type: String},
  address: {city: String, street: String},//TODO Colocar new Schema e required
  articles : [{ type: Schema.Types.ObjectId, ref: 'Article'}],
});

module.exports = mongoose.model('User', userSchema);