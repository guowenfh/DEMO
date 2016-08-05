'use strict';
function List() {
    this.listSize = 0;
    this.pos = 0;
    this.dataStore = [];
    this.length = function () {
        return this.listSize;
    };
}
/**
 * [清空列表中的所有元素]
 * @return {[type]} [description]
 */
List.prototype.clear = function () {
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
//在现有元素后插入新元素
List.prototype.insert = function () {

};
//在列表的末尾添加新元素
List.prototype.append = function (element) {
    this.dataStore[this.listSize++] = element;
};
// 查找列表中某个元素，返回其索引
List.prototype.find = function (element) {
    // for (var i = 0; i < this.dataStore.length; ++i) {
    //     if (this.dataStore[i] == element) {
    //         return i;
    //     }
    // }
    // return -1;
    return this.dataStore.indexOf(element);
}
//从列表中删除元素
List.prototype.remove = function (element) {
    var foundAt = this.find(element);
    if (foundAt > -1) {
        this.dataStore.splice(foundAt, 1);
        --this.listSize;
        return true;
    } else {
        return false;
    }
};
// 将列表的当前位置设移动到第一个元素
List.prototype.front = function (element) {
    var isElement = false;
    var foundAt = this.find(element);
    if (foundAt > -1) {
        this.dataStore.splice(foundAt, 1);
        isElement = true;
    }
    if (isElement) {
        this.dataStore.unshift(element);
        return true;
    } else {
        return true;
    }
};
// 将列表的当前位置移动到最后一个元素
List.prototype.end = function (element) {
    var isElement = false;
    var foundAt = this.find(element);
    if (foundAt > -1 && this.dataStore.length !== 1) {
        this.dataStore.splice(foundAt, 1);
        isElement = true;
    }
    if (isElement) {
        this.dataStore.push(element);
        return true;
    } else {
        return false;
    }
};
// 将当前位置后移一位
List.prototype.prev = function (element) {
    var isElement = false;
    var foundAt = this.find(element);
    if (foundAt > 0) {
        this.dataStore.splice(foundAt, 1);
        isElement = true;
    }
    if (isElement) {
        this.dataStore.splice(foundAt, 1, element);
        this.dataStore.splice(foundAt + 1, 0, element);
        return true;
    } else {
        return false;
    }
};
// 将当前位置前移一位
List.prototype.next = function () {
    var isElement = false;
    var foundAt = this.find(element);
    if (foundAt > 0) {
        this.dataStore.splice(foundAt, 1);
        isElement = true;
        return true;
    }
    if (isElement) {
        this.dataStore.splice(foundAt, 1, element);
        this.dataStore.splice(foundAt - 1, 0, element);
        return true;
    } else {
        return false;
    }
};
// 返回列表的当前位置
List.prototype.currPos = function (element) {
    return this.find(element);
};
// 将当前位置移动到指定位置
List.prototype.moveTo = function (element, index) {
    var foundAt = this.find(element);
    var isElement = false;
    var length = this.dataStore.length;
    if (foundAt > 0) {
        this.dataStore.splice(foundAt, 1);
        isElement = true;
        if (length !== 0 && index >= 0 && index <= length) {
             this.dataStore.splice(index,0,index)
            return true;
        }
    }else{
        return false;
    }

};
