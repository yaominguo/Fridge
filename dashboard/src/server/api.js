let IMG_URL = ''
let FILE_URL = ''
switch (process.env.NODE_ENV) {
case 'production':
  IMG_URL = 'http://10.221.1.181:8080/dist/static/'
  FILE_URL = '/dist/static/'
  break
default:
  IMG_URL = 'http://localhost:8080/static/'
  FILE_URL = '/static/'
};
export default {
  BASE_URL: 'http://sunmonster.vicp.cc:41318/pudong/',
  IMG_URL,
  FILE_URL,
  GET_SMART_INFO: '/api/discoverInfo',
  GET_SMART_DETAIL: '/api/discoverDetail',
  GET_TS_LIST: '/api/findUnCaseTsList',
  GET_BX_LIST: '/api/findUnCaseBxList',
  GET_COMPANY_CYCLE: '/api/findCycle',
  GET_CREDIT_HIGH: '/api/findCreditHigh',
  GET_CREDIT_MIDDLE: '/api/findCreditMiddle',
  GET_CREDIT_LOW: '/api/findCreditLow',
}
