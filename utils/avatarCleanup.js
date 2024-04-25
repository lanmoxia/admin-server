// utils/avatarCleanup.js
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const UserModel = require('../model/UserModel');

const runAvatarCleanup = () => {
  cron.schedule('0 0 * * *', async () => { // 每天午夜 00:00 执行
    console.log('执行了定时任务')
    const users = await UserModel.find({}).select('avatar');
    const avatarSet = new Set(users.map(user => user.avatar));

    fs.readdir(path.join(__dirname, '../public/avatars'), (err, files) => {
      if (err) throw err;

      files.forEach(file => {
        if (!file.startsWith('admin') && !file.startsWith('user')) {
          // 排除默认头像
          const filePath = path.join(__dirname, '../public/avatars', file);
          const fileUrl = `${process.env.BASE_URL}/avatars/${file}`;

          if (!avatarSet.has(fileUrl)) {
            // 如果文件不在用户的头像集合中，则删除它
            fs.unlink(filePath, err => {
              if (err) throw err;
              console.log(`成功删除未引用的头像: ${filePath}`);
            });
          }
        }
      });
    });
  }, {
    scheduled: true,
    timezone: "Asia/Shanghai"
  });
};

module.exports = runAvatarCleanup;
