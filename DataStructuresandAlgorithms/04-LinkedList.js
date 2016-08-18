/**
 * 创建一个链表
 */
function LinkedList() {

    /**
     *
     *
     * @param {any} element
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
        // do..
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
     */
    this.removeAt = function(position) {
        // do..
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

