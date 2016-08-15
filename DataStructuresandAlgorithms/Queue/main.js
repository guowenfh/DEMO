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

    /**
     *  创建一个最小优先队列，优先级的值较小的元素被放置在队列最前面
     */
    function PriorityQueue() {
        this.items = [];

        /**
         * 创建一个特殊的元素
         * @param {any} element 待添加到队列的元素
         * @param {any} priority 队列中的优先级
         */
        function QueueElement(element, priority) {
            this.element = element;
            this.priority = priority;
        }
        this.enqueue = function(element, priority) {
            var queueElement = new QueueElement(element, priority);
            if (this.isEmpty()) {
                this.items.push(queueElement);
            } else {
                var added = false;
                for (var i = 0; i < this.items.length; i++) {
                    if (queueElement.priority < this.items[i].priority) {
                        this.items.splice(i, 0, queueElement);
                        added = true;
                        break;
                    }

                }
                if (!added) {
                    this.items.push(queueElement);
                }
            }

        };
    }

    /**
     *  从队列的顶部移除一个元素（第一个）
     * @returns {any} 被弹出的元素
     */
    PriorityQueue.prototype.dequeue = function() {
        return this.items.shift();
    };

    /**
     *  返回队列的第一个元素（不移除）
     * @returns {any} 被弹出的元素
     */
    PriorityQueue.prototype.front = function() {
        return this.items[0];
    };

    /**
     * 判断当前队列是否为空
     * @returns {boolean} 空为true
     */
    PriorityQueue.prototype.isEmpty = function() {
        return this.items.length === 0;
    };

    /**
     * 清空这个队列
     */
    PriorityQueue.prototype.clear = function() {
        this.items = [];
    };

    /**
     * 拿到队列中元素的个数
     * @returns {number} 队列的长度
     */
    PriorityQueue.prototype.size = function() {
        return this.items.length;
    };

    /**
     * 打印当前栈内所有元素
     */
    PriorityQueue.prototype.print = function() {
        this.items.forEach(function(element) {
            console.log(element);
        });
    };

    window.PriorityQueue = PriorityQueue;
})(window);