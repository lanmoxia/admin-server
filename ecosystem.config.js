module.exports = {
  apps: [{
    name: 'admin_server', // 这是你的项目名称
    script: './bin/www', // 你的项目入口文件
    instances: 1, // 启动多少个实例
    autorestart: true, // 自动重启
    watch: false, // 是否监听文件变化
    max_memory_restart: '1G', // 内存占用超过1GB时重启
    env: {
      NODE_ENV: 'development',
      PORT: 3000, // 本地开发端口
      MONGO_URL: 'mongodb://lanmoxia:lyfxs520@ac-zqxe8it-shard-00-00.07r94y5.mongodb.net:27017,ac-zqxe8it-shard-00-01.07r94y5.mongodb.net:27017,ac-zqxe8it-shard-00-02.07r94y5.mongodb.net:27017/lyfAdmin?ssl=true&replicaSet=atlas-hd175h-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0',
      BASE_URL: 'http://localhost:3000',
      ADMIN_AVATAR_URL: 'http://localhost:3000/avatars/admin.png',
      USER_AVATAR_URL: 'http://localhost:3000/avatars/user.jpg'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 8000, // 生产环境端口
      MONGO_URL: 'mongodb://lanmoxia:lyfxs520@ac-zqxe8it-shard-00-00.07r94y5.mongodb.net:27017,ac-zqxe8it-shard-00-01.07r94y5.mongodb.net:27017,ac-zqxe8it-shard-00-02.07r94y5.mongodb.net:27017/lyfAdmin?ssl=true&replicaSet=atlas-hd175h-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0',
      BASE_URL: 'http://47.96.9.58:8000', // 用你的公网IP和端口号替换
      ADMIN_AVATAR_URL: 'http://47.96.9.58:8000/avatars/admin.png', // 用你的公网IP和端口号替换
      USER_AVATAR_URL: 'http://47.96.9.58:8000/avatars/user.jpg' // 用你的公网IP和端口号替换
    }
  }]
};