var LinkedList = require('./04-LinkedList');
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
        var values = [];
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
// var dictionary = new Dictionary();
// dictionary.set('Gandalf', 'gandalf@email.com');
// dictionary.set('John', 'johnsnow@email.com');
// dictionary.set('Tyrion', 'tyrion@email.com');
// console.log(dictionary.has('Gandalf'));

// console.log(dictionary.size());

// console.log(dictionary.keys());
// console.log(dictionary.values());
// console.log(dictionary.get('Tyrion'));

/**
 * 散列表
 */
function HashTable() {
    var table = [];

    var loseloseHashCode = function(key) {
        var hash = 0;
        for (var i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % 37;
    };
    /**
     * 向散列表增加一个新的项（也能更新散列表
     * @param {any} key 键
     * @param {any} value 值
     */
    this.put = function(key, value) {
        var position = loseloseHashCode(key);
        console.log(position + '-' + key);
        table[position] = value;
    };

    /**
     * 返回根据键值检索到特定的值
     * @param {any} key 键
     * @return {any} 对应的值
     */
    this.get = function(key) {
        return table[loseloseHashCode(key)];
    };
    /**
     * 根据键值从散列表中移除值
     * @param {any} key 键
     */
    this.remove = function(key) {
        table[loseloseHashCode(key)] = undefined;
    };

    this.print = function() {
        for (var i = 0; i < table.length; i++) {
            if (table[i] !== undefined) {
                console.log(i + ': ' + table[i]);
            }
        }
    };

    /**
     *  1.分离链接，解决散列值相同的问题
     */
    var ValuePair = function(key, value) {
        this.key = key;
        this.value = value;

        this.toString = function() {
            return '[' + this.key + ' - ' + this.value + ']';
        };
        this.put = function(key, value) {
            var position = loseloseHashCode(key);
            if (table[position] === undefined) {
                table[position] = new LinkedList();
            }
            table[position].append(new ValuePair(key, value));
        };
    };

}

var hash = new HashTable();
hash.put('Gandalf', 'gandalf@email.com');
hash.put('John', 'johnsnow@email.com');
hash.put('Tyrion', 'tyrion@email.com');
hash.put('Aaron', 'aaron@email.com');
hash.put('Donnie', 'donnie@email.com');
hash.put('Ana', 'ana@email.com');
hash.put('Jonathan', 'jonathan@email.com');
hash.put('Jamie', 'jamie@email.com');
hash.put('Sue', 'sue@email.com');
hash.put('Mindy', 'mindy@email.com');
hash.put('Paul', 'paul@email.com');
hash.put('Nathan', 'nathan@email.com');
hash.print();

console.info(new LinkedList());