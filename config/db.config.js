const mongoose = require('mongoose')
const dotenv = require('dotenv')
const seedSVGIcons = require('../utils/svg-seeder')

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DB Connected')
    return seedSVGIcons() 
  })