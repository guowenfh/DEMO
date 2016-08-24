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

var setA = new Set();
setA.add(1);
setA.add(2);
var setB = new Set();
setB.add(1);
setB.add(2);
setB.add(3);
var setC = new Set();
setC.add(2);
setC.add(3);
setC.add(4);
console.log(setA.subset(setB));
console.log(setA.subset(setC));