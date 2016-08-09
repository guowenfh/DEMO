'use strict';

/**
 * 创建列表
 */
function List() {
    this.listSize = 0; // 保存元素个数
    this.pos = 0; // 初始化索引
    this.dataStore = []; // 初始化一个空数组来保存列表元素

}

/**
 * 给列表添加元素（末尾）
 * @param {any} element 待添加的元素
 */
List.prototype.append = function(element) {
    this.dataStore[this.listSize++] = element;
};

/**
 * 查找列表中某个元素，返回其索引，未找到返回－1
 * @param {any} element 待查找的元素
 * @returns {Number} 索引
 */
List.prototype.find = function(element) {
    // for (var i = 0; i < this.dataStore.length; ++i) {
    //     if (this.dataStore[i] == element) {
    //         return i;
    //     }
    // }
    // return -1;
    return this.dataStore.indexOf(element);
};

/**
 * 从列表中删除元素
 * @param {any} element 待删除的元素
 * @returns {Boolean} 删除成功返回true，否则反之
 */
List.prototype.remove = function(element) {
    var foundAt = this.find(element);
    if (foundAt > -1) {
        this.dataStore.splice(foundAt, 1);
        --this.listSize;
        return true;
    } else {
        return false;
    }
};

/**
 * 该方法用来返回当前列表中的元素个数
 * @returns {Number} 列表长度
 */
List.prototype.length = function() {
    return this.listSize;
};

/**
 * 显示列表中的元素(字符串)
 * @returns {String} 列表元素的字符串形式
 */
List.prototype.toString = function() {
    return this.dataStore.toString();
};

/**
 * 向列表中插入一个元素
 * @param {any} element 待插入的元素
 * @param {any} after 插到这个元素后面
 * @returns {Boolean} 插入成功返回true
 */
List.prototype.insert = function(element, after) {
    var insertPos = this.find(after);
    if (insertPos > -1) {
        this.dataStore.splice(insertPos + 1, 0, element);
        ++this.listSize;
        return true;
    } else {
        return false;
    }
};

/**
 * 清空列表中的所有元素
 */
List.prototype.clear = function() {
    delete this.dataStore;
    this.dataStore = [];
    this.listSize = this.pos = 0;
};


/**
 * 查找给定值是否在列表中
 * @param {any} element 待查找的元素
 * @returns {Boolean} 查找到了返回true
 */
List.prototype.contains = function(element) {
    // for (var i = 0; i < this.dataStore.length; ++i) {
    //     if (this.dataStore[i] == element) {
    //         return i;
    //     }
    // }
    // return -1;
    var findIndex = this.dataStore.indexOf(element);
    return findIndex > -1 ? true : false;
};

// 遍历列表
// 最后的一组方法允许用户在列表上自由移动,最后一个方法 getElement() 返回列表的当前元素:

/**
 * 将列表的当前位置设移动到第一个元素
 */
List.prototype.front = function() {
    this.pos = 0;
};

/**
 * 将列表的当前位置移动到最后一个元素
 */
List.prototype.end = function() {
    this.pos = this.listSize - 1;
};

/**
 * 将当前位置后移一位
 */
List.prototype.prev = function() {
    if (this.pos > 0) {
        --this.pos;
    }
};

/**
 * 将当前位置前移一位
 */
List.prototype.next = function() {
    if (this.pos < this.listSize - 1) {
        ++this.pos;
    }
};

/**
 * 返回列表的当前位置
 * @returns {Number} 当前位置索引
 */
List.prototype.currPos = function() {
    return this.pos;
};

/**
 * 将当前位置移动到指定位置
 * @param {Number} position 索引位置
 */
List.prototype.moveTo = function(position) {
    this.pos = position;
};

/**
 * 返回当前位置的元素
 * @returns {any} 当前位置的元素
 */
List.prototype.getElement = function() {
    return this.dataStore[this.pos];
};

var names = new List();
names.append("Clayton");
names.append("Raymond");
names.append("Cynthia");
names.append("Jennifer");
names.append("Bryan");
names.append("Danny");
names.front();
console.info(names.getElement());// Clayton
names.next();
console.info(names.getElement());// Clayton
names.next();
names.next();
names.prev();
console.info(names.toString());
console.info(names.getElement()); // 显示Cynthia