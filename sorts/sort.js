function Algorithm() {

}
Algorithm.prototype = {
  constructor: Algorithm,
  /**
   * 冒泡
   * 依次两两比较，依次冒泡结束，总有一个数会在正确的位置
   * @param {Object} a 数组
   * @param {Number} n 数组大小
   */
  bubbleSort: function (a, n) {
    if (n <= 1) {
      return
    }
    for (let i = 0; i < n; ++i) {
      // 提前退出冒泡循环的标志位
      flag = false
      for (let j = 0; j < n - i - 1; ++j) {
        if (a[j] > a[j + 1]) { // 交换
          let tmp = a[j]
          a[j] = a[j + 1]
          a[j + 1] = tmp
          flag = true // 表示有数据交换      
        }
      }
      if (!flag) { // 没有数据交换，提前退出
        break
      } 
    }
    return a
  },
  /**
   * 插入
   * 分为已排序、未排序，从为排序中取数据插入已排序区间
   * @param {Object} a 数组
   * @param {Number} n 数组大小
   */
  insertionSort(a, n) {
    if (n <= 1) {
      return
    }

    for (let i = 1; i < n; ++i) {
      let value = a[i]
      let j = i - 1
      // 查找插入的位置
      for (; j >= 0; --j) {
        if (a[j] > value) {
          a[j + 1] = a[j] // 数据移动
        } else {
          break
        }
      }
      a[j + 1] = value // 插入数据
    }
    return a
  },
  /**
   * 选择
   * 类似插入排序，分为已排序、未排序，每次从未排序中选出最小的数据放入已排序末尾
   * @param {Array} a 数组
   * @param {Number} n 数组大小
   */
  selectionSort: function (a, n) {
    if (n <= 1) {
      return
    }

    for (let i = 0; i < n; ++i) {
      // 查找最小值
      let minIndex = i
      let minValue = a[i]
      for (let j = i; j < n; ++j) {
        if (a[j] < minValue) {
          minValue = a[j]
          minIndex = j
        }
      }
      if (minIndex == i) {
        continue
      }
      // 交换
      let tmp = a[i]
      a[i] = a[minIndex]
      a[minIndex] = tmp
    }

    return a
  },
  /**
   * 归并之merge
   * @param {Array} left
   * @param {Array} right
   */
  merge: function (left, right) {
    let tmp = []

    while (left.length && right.length) {
      if (left[0] < right[0]) {
        tmp.push(left.shift())
      }
      else {
        tmp.push(right.shift())
      }
    }

    return tmp.concat(left, right)
  },
  /**
   * 归并（递归）
   * @param {Array} a
   */
  mergeSort: function (a) {
    if (a.length === 1) {
      return a
    }
    let mid = ~~(a.length / 2)
    let left = a.slice(0, mid)
    let right = a.slice(mid)

    return this.merge(mergeSort(left), mergeSort(right))
  },
  /**
   * 快排
   * @param {Array} arr
   */
  quickSort: function(arr) {
    //如果数组<=1,则直接返回
    if (arr.length <= 1) {
      return arr
    }
    let pivotIndex = ~~(arr.length/2)
    //找基准，并把基准从原数组删除
    let pivot = arr.splice(pivotIndex,1)[0]
    //定义左右数组
    let left = []
    let right = []

    //比基准小的放在left，比基准大的放在right
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] <= pivot) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
    }
    //递归
    return quickSort(left).concat([pivot],quickSort(right))
  }   

}
export default new Algorithm()
