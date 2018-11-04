function PriorityQueue(){
  let items = []
  function QueueElement(el, pri) {
    this.el = el
    this.pri = pri
  }

  this.enqueue = function(el, pri){
    let qe = new QueueElement(el, pri)

    let added = false
    for (let i = 0;i < items.length;i++) {
      if (qe.pri < items[i].pri) {
        items.splice(i, 0, qe)
        added = true
        break
      }
    }
    if (!added) {
      items.push(qe)
    }
  }

  this.print = function(){
    for (let i = 0; i < items.length;i++) {
      console.log(`${items[i].el}-${items[i].pri}`)
    }
  }
}