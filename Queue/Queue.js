let Queue = (function(){
  const items = new WeakMap()
  class Queue {
    constructor(){
      items.set(this, [])
    }
    enqueue(el){
      let q = items.get(this)
      q.push(el)
    }
    dequeue(){
      let q = items.get(this)
      return q.shift()
    }
    front(){
      let q = items.get(this)
      return q[0]
    }
    isEmpty() {
      return items.get(this).length === 0
    }
    size() {
      return items.get(this).length
    }
    print() {
      console.log(items.get(this).toString())
    }
  }
  return Queue
}())