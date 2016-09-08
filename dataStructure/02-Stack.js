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
     *  从栈的顶部移除一个元素（最后一个）
     * @returns {any} 被弹出的元素
     */
    Stack.prototype.pop = function() {
        return this.items.pop();
    };

    /**
     * 拿到栈的最后一个元素
     * @returns {any} 栈里最后一个元素
     */
    Stack.prototype.peek = function() {
        return this.items[this.items.length - 1];
    };

    /**
     * 判断当前栈是否为空
     * @returns {boolean} 空为true
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

    /**
     * 10进制转化成其它进制
     * @param {number} decNumber 待转化的数字
     * @param {number} base 转化成几进制
     * @returns {String} baseString 转化后对应进制的值
     */
    function baseConverter(decNumber, base) {
        base = base || 2; // 默认2进制
        var remStack = new Stack();
        var rem;
        var baseString = '';
        var digits = '0123456789ABCDEF';
        while (decNumber > 0) {
            rem = Math.floor(decNumber % base); // 获得当前结果和2的余数, 放到栈里
            remStack.push(rem);
            decNumber = Math.floor(decNumber / base); // 然后让结果和2做整除,使用Math.floor函数让除法的操作仅返回整 数部分
        }
        while (!remStack.isEmpty()) {
            // baseString += remStack.pop().toString(); // 用pop方法把栈中的元素都移除,把出栈的元素变成连接成字符串
            baseString += digits[remStack.pop()]; // 对栈中的数字做个转化，主要是16进制
        }
        return baseString;
    }
    // console.info(baseConverter(233, 2)); // 输出11101001
    // console.info(baseConverter(10, 2)); // 输出1010
    // console.info(baseConverter(1000, 2)); // 输出1111101000
    // console.log(baseConverter(100345, 2)); // 出11000011111111001
    // console.log(baseConverter(100345, 8)); // 输出303771
    console.log(baseConverter(100345, 16)); // 输出187F9

    // var stack = new Stack();
    // console.info(stack.isEmpty())
    // stack.push(5);
    // stack.push(8);
    // console.info(stack.peek())
    // stack.push(11);
    // console.log(stack.size()); //输出3
    // console.log(stack.isEmpty()); //输出false
    // stack.push(15);
    // stack.pop();
    // stack.pop();
    // console.log(stack.size()); //输出2
    // stack.print(); //输出[5, 8]
})();