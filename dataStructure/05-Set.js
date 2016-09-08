/**
 * 集合
 */
function Set() {
    var items = {};

    /**
     * 查看集合中是否有某个元素
     * @param {any} value 待判断的元素
     * @returns {Boolean} 查找到返回true
     */
    this.has = function(value) {
        return items.hasOwnProperty(value);
    };
    /**
     * 向集合中添加一个新的项
     * @param {any} value 添加元素
     * @returns {Boolean} 成功返回turec
     */
    this.add = function(value) {
        if (!this.has(value)) {
            items[value] = value;
            return true;
        }
        return false;
    };
    /**
     * 从集合中移除一个值
     * @param {any} value 待移除的元素
     * @returns {Boolean} 成功返回ture
     */
    this.remove = function(value) {
        if (this.has(value)) {
            delete items[value];
            return true;
        }
        return false;
    };
    /**
     * 移除集合中所有的项
     */
    this.clear = function() {
        items = {};
    };
    /**
     * 返回集合所包含的元素的数量，与数组的length属性类似
     * @returns {Number} 元素的数量
     */
    this.size = function() {
        return Object.keys(items).length;
    };
    /**
     * 返回集合所包含的元素的数量，兼容版实现
     * @returns {Number} 元素的数量
     */
    this.sizelegacy = function() {
        var count = 0;
        for (var prop in items) {
            if (items.hasOwnproperty(prop)) {
                ++count;
            }
        }
        return count;
    };

    /**
     * 返回集合中所有的元素
     * @returns {Array} 元素数组
     */
    this.values = function() {
        return Object.keys(items);
    };
    /**
     * 返回集合中所有的元素兼容版
     * @returns {Array} 元素数组
     */
    this.valuesLegacy = function() {
        var keys = [];
        for (var key in items) {
            keys.push(key);
        }
        return keys;
    };

    /**
     * 并集
     * @param {any} otherSet 用来对比的集合
     * @returns {any} 返回合并过后的集合
     */
    this.union = function(otherSet) {
        var unionSet = new Set();

        var values = this.values();
        for (var i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
        }
        return unionSet;
    };


    /**
     * 交集
     * @param {any} otherSet 用来对比的集合
     * @returns {any} 两个集合共有的部分
     */
    this.intersection = function(otherSet) {
        var intersectionSet = new Set();
        var values = this.values();
        for (var i = 0; i < values.length; i++) {
            if (otherSet.has(values[i])) {
                intersectionSet.add(values[i]);
            }
        }
        return intersectionSet;
    };

    /**
     * 差集
     * @param {any} otherSet 用来对比的集合
     * @returns {any} 对比后a独有的部分
     */
    this.difference = function(otherSet) {
        var differebceSet = new Set();
        var values = this.values();
        for (var i = 0; i < values.length; i++) {
            if (!otherSet.has(values[i])) {
                differebceSet.add(values[i]);
            }
        }
        return differebceSet;
    };

    /**
     *
     * 子集
     * @param {any} otherSet 用来对比的集合
     * @returns {Boolean} 当对比集合每一个元素都存在当前集合中时，为true
     */
    this.subset = function(otherSet) {
        if (this.size() > otherSet.size()) {
            return false;
        } else {
            var values = this.values();
            for (var i = 0; i < values.length; i++) {
                if (!otherSet.has(values[i])) {
                    return false;
                }
            }
            return true;
        }
    };
}