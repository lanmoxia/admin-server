const mongoose = require('mongoose')
const dotenv = require('dotenv')
const seedSVGIcons = require('../utils/svg-seeder')
const seedPermissions = require('../utils/permissions-seeder');

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DB Connected');
    // return seedSVGIcons(); // 调用函数以将SVG数据存入数据库
  })
  // .then(()=>{
  //   console.log('SVG 数据填充成功！');
  //   // return seedPermissions()// 然后调用函数以填充权限数据到数据库
  // })
  // .then(() => {
  //   console.log('权限数据填充成功！');
  //   // mongoose.disconnect(); // 填充成功后断开数据库连接
  // })
  // .catch((err) => {
  //   console.error('数据库处理错误: ', err);
  //   // mongoose.disconnect(); // 发生错误时也断开数据库连接
  // });