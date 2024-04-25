// KeyModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KeySchema = new Schema({
  privateKey: {
    type: String,
    required: true
  }
});

const KeyModel = mongoose.model('Key', KeySchema);

module.exports = KeyModel;
