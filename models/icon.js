const mongoose = require('mongoose');

const iconSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  path: {
    type: String,
    required: true
  }
})

module.exports = iconSchema;