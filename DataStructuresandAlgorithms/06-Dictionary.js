function Dictionary() {
    var items = {};

    this.has = function(key) {
        return key in items;
    };

    this.set = function(key,value){
        items[key] = value;
    };
}