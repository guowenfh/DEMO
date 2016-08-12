(function() {

    /**
     * 创建一个栈
     */
    function Stack() {
        this.items = [];
    }

    /**
     * 向栈里面添加元素 (尾部)
     * @param {any} element 待添加的元素
     */
    Stack.prototype.push = function(element) {
        this.items.push(element);
    };

    /**
     *
     *  从栈的顶部移除一个元素
     * @returns {any} 被弹出的元素
     */
    Stack.prototype.pop = function() {
        return this.items.pop();
    };

    /**
     *
     * 拿到栈的最后一个元素
     * @returns {any} 栈里最后一个元素
     */
    Stack.prototype.peek = function() {
        return this.items[this.items.length - 1];
    };

    /**
     *
     * 判断当前栈是否为空
     * @returns {boolean} 空为false
     */
    Stack.prototype.isEmpty = function() {
        return this.items.length === 0;
    };

    /**
     * 清空这个栈
     */
    Stack.prototype.clear = function() {
        this.items = [];
    };

    /**
     *
     * 拿到栈中元素的个数
     * @returns {number} 栈的长度
     */
    Stack.prototype.size = function() {
        return this.items.length;
    };

    /**
     * 打印当前栈内所有元素
     */
    Stack.prototype.print = function() {
        console.log(this.items.toString());
    };

    window.Stack = Stack;


    /**
     * 10进制转化成其它进制
     * @param {number} number 待转化的数字
     * @param {number} base 转化成几进制
     * @returns {number} baseString 转化后的值
     */
    function baseConverter(number, base) {
        var baseString = '';
        return baseString;
    }

})();

