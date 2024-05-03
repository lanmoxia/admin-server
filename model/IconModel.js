const mongoose = require('mongoose');

const iconSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  data: {
    type: String,
    required: true
  }
});

const Icon = mongoose.model('Icon', iconSchema);

module.exports = Icon;