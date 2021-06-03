// https://promisesaplus.com/ Promise/A+规范
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

/**
 * 抽象 [[Resolve]](promise, x) 2.3.1
 * @param promise 
 * @param x 
 * @param resolve 
 * @param reject 
 * @returns 
 */
const resolvePromise = (promise, x, resolve, reject) => {
  if (promise === x) {
    return reject(new TypeError('Chaining cycle detected for promise!'))
  }
  let called = false
  if (x && (typeof x === 'object' || typeof x === 'function')) {
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (called) {
            return
          }
          called = true
          resolvePromise(promise, y, resolve, reject)
        }, (r) => {
          if (called) {
            return
          }
          called = true
          reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (error) {
      if (called) {
        return
      }
      called = true
      reject(error)
    }

  } else {
    resolve(x)
  }
}

class Promise {
  
  constructor(executor){
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
  
    this.resolvedCallbacks = []
    this.rejectedCallbacks = []

    const resolve = (value) => {
      if (value instanceof Promise) {
        return value.then(resolve, reject)
      }
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.resolvedCallbacks.forEach(cb => {
          cb()
        })
      }
    }
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.rejectedCallbacks.forEach(cb => {
          cb()
        })
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
     reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    const that = this
    const r1 = typeof onFulfilled === 'function' ? onFulfilled : v => v
    const r2 = typeof onRejected === 'function' ? onRejected : e => {throw e}
    let p = null

    return p = new Promise((resolve, reject) => {
      // 处理 fullfilled
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = r1(this.value)
            // 如果x是Promise，则需要等待该Promise状态转为 FULFILLED 或 REJECTED
            resolvePromise(p, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0);
      }
      // 处理 rejected
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = r2(this.reason)
            resolvePromise(p, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0);
      }
      // onRejected(this.reason)
      // 处理 pending，其实也就是异步Promise
      if (this.status === PENDING) {
        this.resolvedCallbacks.push((v) => {
            setTimeout(() => {
              try {
                const x = r1(this.value)
                resolvePromise(p, x, resolve, reject)
              } catch (error) {
                reject(error)
              }
            }, 0);
          })
        this.rejectedCallbacks.push((v) => {
          setTimeout(() => {
            try {
              const x = r2(this.reason)
              resolvePromise(p, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0);
        })
      }
    })
  }

}
// 测试相关代码
Promise.defer = Promise.deferred = function () {
  const dfd = {};
  dfd.promise = new Promise((resolve,reject)=>{
      dfd.resolve = resolve;
      dfd.reject = reject;
  })
  return dfd;
}

module.exports = Promise