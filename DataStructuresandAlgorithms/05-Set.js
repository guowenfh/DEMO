function Set() {
    var items = {};
    this.has = function(value) {
        return items.hasOwnProperty(value);
    };
    this.add = function(value) {
        if (!this.has(value)) {
            items[value] = value;
            return true;
        }
        return false;
    };
    this.remove = function(value) {
        if (this.has(value)) {
            delete items[value];
            return true;
        }
        return false;
    };
    this.clear = function() {
        items = {};
    };
    this.size = function() {
        return Object.keys(items).length;
    };
    this.sizelegacy = function() {
        var count = 0;
        for (var prop in items) {
            if (items.hasOwnproperty(prop)) {
                ++count;
            }
        }
        return count;
    };
    this.values = function() {
        return Object.keys(items);
    };
    this.valuesLegacy = function() {
        var keys = [];
        for (var key in items) {
            keys.push(key);
        }
        return keys;
    };
}

var set = new Set();
set.add(1);
console.log(set.values()); // 输出["1"]
console.log(set.has(1)); // 输出true
console.log(set.size()); // 输出1
set.add(2);
console.log(set.values()); // 输出["1", "2"]
console.log(set.has(2)); // true
console.log(set.size()); // 2
set.remove(1);
console.log(set.values()); // 输出["2"]
set.remove(2);
console.log(set.values()); // 输出[]

