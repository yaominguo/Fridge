<script>
import config from './config'
export default {
  name: 'App',
  created () {
    wx.request({
      url: config.host + '/weapp/demo',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
}
</script>
