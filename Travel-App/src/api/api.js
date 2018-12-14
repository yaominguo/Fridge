const baseURL = process.env.NODE_ENV === 'development'
  ? '/api'
  : 'http://localhost:8080/static/mock'

const api = {
  getIndex: baseURL + '/index.json',
  getCity: baseURL + '/city.json',
  getDetail: baseURL + '/detail.json'
}
module.exports = api
