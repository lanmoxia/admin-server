const mongoose = require('mongoose')
const dotenv = require('dotenv')
const seedSVGIcons = require('../utils/svg-seeder')

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DB Connected')
    return seedSVGIcons() // 调用函数以将SVG数据存入数据库
  })