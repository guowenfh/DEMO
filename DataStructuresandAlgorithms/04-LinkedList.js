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
     * @param {any} position 插入位置
     * @param {any} element 列表项
     */
    this.insert = function(position, element) {
        // do..
    };

    /**
     * 从列表的特定位置移除一项
     * @param {any} position 移除位置
     * @returns {any} 移除不成功返回null
     */
    this.removeAt = function(position) {
        if (position > -1 && position < length) {
            var current = head;
            var previous;
            var index = 0;
            if (position === 0) {
                head = current.next;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
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
     */
    this.remove = function(element) {
        // do..
    };

    /**
     * 返回元素在列表中的索引，如果列表中没有该元素则返回－1
     * @param {any} element 查找的元素
     */
    this.indexOf = function(element) {
        // do..
    };

    /**
     * 如果链表中不包含任何元素，返回 true ，如果链表长度大于0则返回 false
     */
    this.isEmpty = function() {
        // do..
    };

    /**
     * 返回链表包含的元素个数，与数组的length属性类似
     */
    this.size = function() {
        // do..
    };

    /**
     * 由于列表项使用了Node 类，就需要重写继承自 JavaScript 对象默认的 toString方法
     * 让其只输出元素的值
     */
    this.toString = function() {
        // do..
    };

    /**
     * 打印链表
     */
    this.print = function() {
        // do..
    };
}
