const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = path.join(__dirname, '../public/uploads');

// 配置存储
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const filePath = path.join(UPLOAD_DIR, file.originalname);

    // 检查文件是否已存在
    if (fs.existsSync(filePath)) {
      // 如果文件已存在，创建一个带有时间戳的新文件名
      cb(null, `${Date.now()}-${file.originalname}`);
    } else {
      // 如果文件不存在，使用原始文件名
      cb(null, file.originalname);
    }
  }
});

// 配置上传对象
const upload = multer({ storage: storage });

module.exports = upload;