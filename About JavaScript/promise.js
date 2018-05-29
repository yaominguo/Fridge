// Promise的简单实现
class GPromise {
  constructor (executor) {
    this._promiseStatus = this.PENDING
    this._promiseValue
    this.PENDING = 'pending'
    this.FULFILLED = 'resolved'
    this.REJECTED = 'rejected'
    this.init(executor)
  }
  // 初始化
  init (executor) {
    if (typeof executor != 'function') {
      throw new Error(`GPromise resolver ${executor} is not a function!`)
    }
    try {
      // resolve和reject的实现
      executor (
        data => {
          this._promiseStatus = this.FULFILLED
          this._promiseValue = data
        },
        data => {
          this._promiseStatus = this.REJECTED
          this._promiseValue = data
        }
      )
    } catch (err) {
      this._promiseStatus = this.REJECTED
      this._promiseValue = err
    }
  }
  then (onFulfilled, onRejected) {
    let _ref = null, timer = null, result = new GPromise(() => {})
    // 监听状态变化
    timer = setInterval(() => {
      if ((typeof onFulfilled == 'function' && this._promiseStatus == this.FULFILLED)
        || (typeof onRejected == 'function' && this._promiseStatus == this.REJECTED)) {
          // 状态发生变化，取消监听
          clearInterval(timer)
          try {
            if (this._promiseStatus == this.FULFILLED) {
              _ref = onFulfilled(this._promiseValue)
            } else {
              _ref = onRejected(this._promiseValue)
            }
            if (_ref instanceof GPromise) {
              // 如果回调中返回的是GPromise的实例，则监听其状态变化，返回新实例的状态是根据其变化对应的
              timer = setInterval(() => {
                if (_ref._promiseStatus == this.FULFILLED || _ref._promiseStatus == this.REJECTED) {
                  clearInterval(timer)
                  result._promiseStatus = _ref._promiseStatus
                  result._promiseValue = _ref._promiseValue
                }
              }, 0)
            } else {
              // 如果返回的是非GPromise实例
              result._promiseStatus = this.FULFILLED
              result._promiseValue = _ref
            }
          } catch (err) {
            result._promiseValue = err
            result._promiseStatus = this.REJECTED
          }
      }
    }, 0)
    return result
  }
}