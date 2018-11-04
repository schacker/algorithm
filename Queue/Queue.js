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
  }
  return Queue
}())