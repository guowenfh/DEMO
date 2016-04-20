function List (){
    this.listSize = 0;
    this.pos = 0;
    this.dataStore = [];   
    this.length = this.listSize;
}
//返回列表的字符串形式
List.prototype.clear =function () {
    this.listSize = this.pos = 0;
    this.dataStore = [];
};
//返回列表的字符串形式
List.prototype.toString = function () {
    return this.dataStore.toString();
};
//返回当前位置的元素
List.prototype.getElement = function (index) {
    return this.dataStore[index];
};
//
List.prototype.insert = function(){
    
};

List.prototype.append = function(){
    this.dataStore.push();
};

var aa = new List();
aa.dataStore = [123,324];
// console.info(aa.listSize());