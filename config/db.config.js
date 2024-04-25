const mongoose = require('mongoose')
const dotenv = require('dotenv')


dotenv.config()

// const options = {
//   connectTimeoutMS: 10000, // 连接超时设置为10秒
//   serverSelectionTimeoutMS: 10000, // 服务器选择超时设置为10秒
// };

// mongoose.connect(process.env.MONGO_URL, options)
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log(err))