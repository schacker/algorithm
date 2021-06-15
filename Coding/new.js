function objectFactory() {

  let constructor = Array.prototype.shift.call(arguments)
  if (typeof constructor !== 'function') {
    return
  }
  // 创建一个空对象
  let obj = null
  // 将空对象的原型指向构造函数的prototype
  obj = Object.create(constructor.prototype)
  let result = null
  // 将构造函数this指向该对象
  result = constructor.apply(obj, arguments)
  // 判断返回类型，值则返回值，反之返回对象
  let flag = result && (typeof result !== 'object' || typeof result !== 'function')
  return flag ? result : obj

}