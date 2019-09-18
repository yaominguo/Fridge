let BASE_URL = ''
switch (process.env.NODE_ENV) {
case 'sit': // sit环境下
  BASE_URL = 'https://sit/api'
  break
case 'uat': // uat环境下
  BASE_URL = 'https://uat/api'
  break
case 'production': // 生产环境下
  BASE_URL = 'https://pro/api'
  break
default: // 默认环境下（开发环境）
  // BASE_URL = 'https://cnodejs.org/api/v1'
  BASE_URL = 'http://localhost:8080'
  break
};

export default {
  BASE_URL,
  GET_TOKEN: '/uaa/oauth/token', // 获取token
}
