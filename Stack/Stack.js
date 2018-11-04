let Stack = (function(){
  const items = new WeakMap()
  class Stack {
    constructor () {
      items.set(this, [])
    }
    push(el) {
      let s = items.get(this)
      s.push(el)
    }
    pop() {
      let s = items.get(this)
      return s.pop()
    }
  }
  return Stack
}())