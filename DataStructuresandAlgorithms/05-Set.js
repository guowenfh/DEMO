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

    this.union = function(otherSet) {
        var unionSet = new Set();

        var values = this.values();
        for (var i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
        }
        return unionSet;
    };
}
