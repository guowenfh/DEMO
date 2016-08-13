(function(window) {

    /**
     * 创建一个队列
     */
    function Queue() {
        this.items = [];
    }

    /**
     * 向队列里面添加元素 (尾部)(可多个)
     * @param {any} element 待添加的元素
     */
    Queue.prototype.enqueue = function(element) {
        this.items.push(element);
    };

    /**
     *  从队列的顶部移除一个元素（第一个）
     * @returns {any} 被弹出的元素
     */
    Queue.prototype.dequeue = function() {
        return this.items.shift();
    };

    /**
     *  返回队列的第一个元素（不移除）
     * @returns {any} 被弹出的元素
     */
    Queue.prototype.front = function() {
        return this.items[0];
    };

    /**
     * 判断当前队列是否为空
     * @returns {boolean} 空为true
     */
    Queue.prototype.isEmpty = function() {
        return this.items.length === 0;
    };

    /**
     * 清空这个队列
     */
    Queue.prototype.clear = function() {
        this.items = [];
    };

    /**
     * 拿到队列中元素的个数
     * @returns {number} 队列的长度
     */
    Queue.prototype.size = function() {
        return this.items.length;
    };

    /**
     * 打印当前栈内所有元素
     */
    Queue.prototype.print = function() {
        console.log(this.items.toString());
    };
    window.Queue = Queue;
})(window);