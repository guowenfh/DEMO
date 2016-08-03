function List() {
    this.listSize = 0;
    this.pos = 0;
    this.dataStore = [];
    this.length = this.listSize;
}
/**
 * [清空列表中的所有元素]
 * @return {[type]} [description]
 */
List.prototype.clear = function() {
    this.listSize = this.pos = 0;
    this.dataStore = [];
};
//返回列表的字符串形式
List.prototype.toString = function() {
    return this.dataStore.toString();
};
//返回当前位置的元素
List.prototype.getElement = function(index) {
    return this.dataStore[index];
};
//在现有元素后插入新元素
List.prototype.insert = function() {

};
//在列表的末尾添加新元素
List.prototype.append = function(element) {
    this.dataStore[listSize++] = element;
};
//从列表中删除元素
List.prototype.remove = function() {

};
// 将列表的当前位置设移动到第一个元素
List.prototype.front = function() {

};
// 将列表的当前位置移动到最后一个元素
List.prototype.end = function() {

};
// 将当前位置后移一位
List.prototype.prev = function() {

};
// 将当前位置前移一位
List.prototype.next = function() {

};
// 返回列表的当前位置
List.prototype.currPos = function() {

};
// 将当前位置移动到指定位置
List.prototype.moveTo = function() {

};
