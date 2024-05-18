
// 解析 xls 文件
const xlsx = require('xlsx');

const parseExcelFile = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetNames = workbook.SheetNames;
  const sheet = workbook.Sheets[sheetNames[0]];
  // 添加配置选项 { defval: "" } 来为缺失的值设置默认空字符串
  const data = xlsx.utils.sheet_to_json(sheet, { defval: "" });
  return data;
};

module.exports = parseExcelFile;
