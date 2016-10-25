// 栈
function Stack(){
    this._size = 0;
    this._storage = {};
}
Stack.prototype.push = function(data) {
    let size = this._size++;
    this._storage[size] = data;
};
Stack.prototype.pop = function() {
    let size = this._size;
    let deletedData;
    if (size) {
        deletedData = this._storage[size];
        delete this._storage[size];
        this._size--;
        return deletedData;
    }
};
(function(){
    let s1 = new Stack();
    let s2 = new Stack();
    let d = [1,3,5,2,7,3,9,8];
    let len = d.length;
    s1.minindex = 0;
    for (var i = 0;i < len;i++) {
        s1.push(d[i]);
        s2.push();
        if (d[i] < s1[minindex]) {
            s2.push(i);
        }
    }
}());
