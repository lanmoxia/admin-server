// utils/imageUploader.js
const multer = require('multer');
const path = require('path');

// Multer配置
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../public/avatars'));
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('avatar');

// 导出上传函数
module.exports = (req, res, next) => {
    upload(req, res, function(err) {
        if (err) {
            console.error('Upload error:', err);
            // 处理上传过程中的错误
            return res.status(500).send({ message: '上传错误' });
        }
        // 如果没有错误，继续下一个中间件或路由处理器
        next();
    });
};
