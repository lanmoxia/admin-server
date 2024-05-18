const buildTree = (menus) => {
  const menuMap = new Map();

  // 创建映射
  menus.forEach(menu => {
    const menuId = menu._id.toString(); // 将ObjectId转换为字符串
    menuMap.set(menuId, {...menu, children: []});
  });

  const roots = [];

  // 构建树形结构
  menus.forEach(menu => {
    const menuId = menu._id.toString(); // 将ObjectId转换为字符串
    if (menu.parentId) {
      const parentId = menu.parentId.toString(); // 将ObjectId转换为字符串
      const parentMenu = menuMap.get(parentId);
      if (parentMenu) {
        parentMenu.children.push(menuMap.get(menuId));
      }
    } else {
      roots.push(menuMap.get(menuId));
    }
  });

  // 移除空的children数组
  const removeEmptyChildren = (node) => {
    if (node.children.length === 0) {
      delete node.children;
    } else {
      node.children.forEach(child => removeEmptyChildren(child));
    }
  };

  roots.forEach(root => removeEmptyChildren(root));

  return roots;
}

module.exports = buildTree;
