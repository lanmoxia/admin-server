const fs = require('fs');
const path = require('path');
const {Icon} = require('../models'); // 导入已定义的Icon模型

const svgDirectory = path.join(__dirname, '../public/svg');

const seedSVGIcons = async () => {
  try {
    const files = fs.readdirSync(svgDirectory)
    let skippedCount = 0;
    let loadedCount = 0;

    // 获取数据库中所有的图标名称
    const existingIcons = await Icon.find().select('name');
    const existingIconNames = new Set(existingIcons.map(icon => icon.name));

    for (const file of files) {
      if (path.extname(file) === '.svg') {
        const svgContent = fs.readFileSync(path.join(svgDirectory, file), 'utf8')
        const iconName = path.basename(file, '.svg')

        // 检查数据库中是否已存在同名的 SVG 图标
        if (existingIconNames.has(iconName)) {
          console.log('已存在同名图标，跳过填充:', iconName);
          skippedCount++;
          continue;
        }

        // 如果不存在，则将图标插入数据库
        const icon = new Icon({ name: iconName, path: svgContent })
        await icon.save()
        loadedCount++;       
      }
    }

    console.log('SVG 图标已成功加载到数据库，总计加载: ', loadedCount, '个，跳过: ', skippedCount, '个');
  } catch (error) {
    console.error('Error loading SVG icons to DB: ', error);
  }
}

module.exports = seedSVGIcons;