(function() {

    /**
     *  创建
     */
    function Strack() {
        this.items = [];
    }
    Strack.prototype.push = function(element) {
        this.items.push(element);
    };
    Strack.prototype.pop = function(element) {
        return this.items.pop();
    };
    Strack.prototype.isEmpty = function() {
        return this.items.length === 0 ? false : true;
    };
    Strack.prototype.clear = function() {
        this.items = [];
    };
    Strack.prototype.size = function() {
        return this.items.length;
    };
})();
