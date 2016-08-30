/**
 * 字典类
 */
function Dictionary() {
    var items = {};

    /**
     * 查找字典中是否有某个健
     * @param {any} key 键
     * @returns {boolean} 存在返回true
     */
    this.has = function(key) {
        return key in items;
    };

    /**
     * 向字典添加新元素
     * @param {any} key 键
     * @param {any} value 值
     */
    this.set = function(key, value) {
        items[key] = value;
    };

    /**
     * 通过使用键值来从字典中移除键值对应的数据值
     * @param {any} key 键
     * @returns {boolean} 成功返回true
     */
    this.remove = function(key) {
        if (this.has(key)) {
            delete items[key];
            return true;

        }
        return false;
    };
    /**
     * 通过键值，查找到特定的数值并返回
     * @param {any} key 键
     * @returns {any} 找到返回值，否则undefined
     */
    this.get = function(key) {
        return this.has(key) ? items[key] : undefined;
    };

    /**
     * 将字典所包含的所有数值以数组形式返回
     * @returns {arrary} 返回所有值的数组
     */
    this.values = function() {
        var values = {};
        for (var k in items) {
            if (this.has(k)) {
                values.push(items[k]);
            }
        }
        return values;
    };
    /**
     * 将这个字典中所有的元素删除
     */
    this.clear = function() {
        items = {};
    };
    /**
     * 将这个字典所包含的元素的数量，与数组的length类似
     * @returns {number} 长度
     */
    this.size = function() {
        return Object.keys(items).length;
    };
    /**
     * 将字典所包含的所有键名以数组形式返回
     * @returns {array}键的数组
     */
    this.keys = function() {
        return Object.keys(items);
    };
    /**
     * 返回items变量
     * @returns {object} 整个字典存入的值
     */
    this.getItems = function() {
        return items;
    };
}