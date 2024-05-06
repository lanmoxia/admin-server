const fs = require('fs');
const path = require('path');
// 删除这行：const mongoose = require('mongoose');
const {Icon} = require('../models'); // 导入已定义的Icon模型

const svgDirectory = path.join(__dirname, '../public/svg');

const seedSVGIcons = async () => {
  try {
    const files = fs.readdirSync(svgDirectory);

    for (const file of files) {
      if (path.extname(file) === '.svg') {
        const svgContent = fs.readFileSync(path.join(svgDirectory, file), 'utf8');
        const iconName = path.basename(file, '.svg');

        // 检查数据库中是否已存在同名的 SVG 图标
        const iconExists = await Icon.findOne({ name: iconName });

        if (!iconExists) {
          // 如果不存在，则将图标插入数据库
          const icon = new Icon({ name: iconName, data: svgContent });
          await icon.save();
        }
      }
    }

    console.log('SVG 图标已成功加载到数据库');
  } catch (error) {
    console.error('Error loading SVG icons to DB: ', error);
  }
};

module.exports = seedSVGIcons;