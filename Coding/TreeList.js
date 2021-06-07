// 使用一维数组实现树形组件

class Node {
  constructor(text, value, next){
    this.text = text
    this.value = value
    this._next = next
  }
  hasNext() {
    return !!this._next
  }
  next(){
    return this._next
  }
}

function TreeList() {
  const treelist = []
  for ( let i = 1;i < 10;i++ ) {
    treelist.push(new Node(`${i}`, `第一级 ${i}`))
    for ( let j = i;j < 10;j++ ) {
      treelist.push(new Node(`${i}.${j}`, `第二级 ${i}.${j}`))
    }
  }
  return treelist
}
console.log(TreeList())