/**
 * 创建一个链表
 */
function LinkedList() {

    /**
     * 链表辅助类，表示要加入列的项
     * @param {any} element 添加到列表的值
     * @param {any} next 指向列表中下一个节点项的指针
     */
    var Node = function(element) {
        this.element = element;
        this.next = null;
    };
    var length = 0;
    var head = null;


    /**
     * 向列表尾部添加一个新的项
     * @param {any} element 列表项
     */
    this.append = function(element) {
        var node = new Node(element);
        var current;
        if (head === null) { // 列表中的第一个节点
            head = node;
        } else {
            current = head;
            // 循环列表，直到找到最后一项
            while (current.next) {
                current = current.next;
            }
            // 找到最后一项，将其next 赋为node，建立链接
            current.next = node;
        }
        length++; // 更新列表的长度
    };

    /**
     * 向列表的特定位置插入一个新的项
     * @param {Number} position 插入位置
     * @param {any} element 列表项
     * @returns {Boolean} 插入成功返回 true,返回 false
     */
    this.insert = function(position, element) {
        if (position >= 0 && position <= length) {
            var node = new Node(element);
            var current = head;
            var previous;
            var index = 0;
            if (position === 0) {
                node.next = current;
                head = node;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            length++;
            return true;
        } else {
            return false;
        }
    };

    /**
     * 从列表的特定位置移除一项
     * @param {any} position 移除位置
     * @returns {any} 移除不成功返回null
     */
    this.removeAt = function(position) {
        // 检查越界值
        if (position > -1 && position < length) {
            var current = head;
            var previous;
            var index = 0;
            // 移除第一项
            if (position === 0) {
                head = current.next;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                // 将 previous 与 current 的下一项链接起来； 跳过current,从而移除它
                previous.next = current.next;
            }
            length--;
            return current.element;
        } else {
            return null;
        }
    };

    /**
     * 从列表中移除一项
     * @param {any} element 移除元素
     * @returns {any} 移除的元素
     */
    this.remove = function(element) {
        var index = this.indexOf(element);
        return this.removeAt(index);
    };

    /**
     * 返回元素在列表中的索引，如果列表中没有该元素则返回－1
     * @param {any} element 查找的元素
     * @returns {Number} 索引
     */
    this.indexOf = function(element) {
        var current = head;
        var index = -1;
        while (current) {
            if (element === current.element) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    };

    /**
     * 如果链表中不包含任何元素，返回 true ，如果链表长度大于0则返回 false
     * @returns {Boolean} 空时，为true
     */
    this.isEmpty = function() {
        return length === 0;
    };

    /**
     * 返回链表包含的元素个数，与数组的length属性类似
     * @returns {Number} 返回链表长度
     */
    this.size = function() {
        return length;
    };

    /**
     * 由于列表项使用了Node 类，就需要重写继承自 JavaScript 对象默认的 toString方法
     * 让其只输出元素的值
     * @return {String} 输出元素值
     */
    this.toString = function() {
        var current = head;
        var string = '';
        while (current) {
            string = current.element;
            current = current.next;
        }
        return string;
    };

    /**
     * 获取链表第一个元素
     * @return {any} 得到第一个元素
     */
    this.getHead = function() {
        return head;
    };
}

