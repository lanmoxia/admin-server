const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ResourceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  unique: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  status: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = ResourceSchema