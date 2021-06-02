const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class Promise {
  status = PENDING
  value = undefined
  reason = undefined

  resolvedCallbacks = []
  rejectedCallbacks = []

  constructor(executor){
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.resolvedCallbacks.forEach(cb => {
          cb.apply(null, this.value)
        })
      }
    }
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.rejectedCallbacks.forEach(cb => {
          cb.apply(null, this.reason)
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
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.reason)
    }

    if (this.status === PENDING) {
      this.resolvedCallbacks.push(onFulfilled)
      this.rejectedCallbacks.push(onRejected)
    }
  }

}

export default Promise