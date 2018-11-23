let PriorityQueue = (function () {
  /**
   * 使用WeakMap，防止外界破坏，Object.getOwnPropertySymbols() 可获取对象中使用Symbol申明的属性
   */
  let items = new WeakMap()
  /**
   * 优先队列元素类
   */
  class QueueElement {
    constructor(el, pri) {
      this.el = el
      this.pri = pri
    }
  }

  class PriorityQueue {
    constructor(){
      items.set(this, [])
    }
    /**
     * 入队列
     * @param {Object} el 当前节点数据源
     * @param {Number} pri 当前节点数据源权重
     */
    enqueue(el, pri){
      let qe = new QueueElement(el, pri)

      let added = false
      let pqlist = items.get(this)
      const len = pqlist.length
      for (let i = 0; i < len; i++) {
        if (qe.pri < pqlist[i].pri) {
          pqlist.splice(i, 0, qe)
          added = true
          break
        }
      }
      if (!added) {
        pqlist.push(qe)
      }
    }
    /**
     * 出队列
     */
    dequeue() {
      let pqlist = items.get(this)
      let r = pqlist.shift()
      return r
    }
    /**
     * 返回队列首元素
     */
    front() {
      let q = items.get(this)
      return q[0]
    }
    /**
     * 队列是否为空
     */
    isEmpty() {
      return items.get(this).length === 0
    }
    /**
     * 队列长度
     */
    size() {
      return items.get(this).length
    }
    /**
     * 打印队列
     */
    print() {
      let pqlist = items.get(this)
      const len = pqlist.length
      for (let i = 0; i < len; i++) {
        console.log(`${pqlist[i].el}-${pqlist[i].pri}`)
      }
    }
  }
  return PriorityQueue
}())
export default PriorityQueue