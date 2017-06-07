(function(window) {
    /**
     * 事件添加函数,惰性载入
     * @param { HTMLElement  } ele     触发事件的Dom对象
     * @param { String   } event   触发的事件类型
     * @param { Fucntion } func    事件触发执行的函数
     */
    var addEvent = (function() {
        if (document.addEventListener) {
            return function(ele, event, func) {
                ele.addEventListener(event, func, false);
            };
        } else if (document.attachEvent) {
            return function(ele, event, func) {
                ele.attachEvent('on' + event, func);
            };
        } else {
            return function(ele, event, func) {
                ele['on' + event] = func;
            };
        }
    })();

    /**
     * 事件删除函数,利用闭包特性，惰性载入（只需要加载一次）
     * @param { Element  } ele     需要删除事件的Dom对象
     * @param { String   } event   删除的事件类型
     * @param { Fucntion } func    事件触发执行的函数
     */
    var removeEvent = (function() {
        if (document.removeEventListener) {
            return function(ele, type, func) {
                ele.removeEventListener(type, func, false);
            };
        } else if (document.detachEvent) {
            return function(ele, type, func) {
                ele.detachEvent('on' + type, func);
            };
        } else {
            return function(ele, type) {
                ele['on' + type] = null;
            };
        }
    })();
    /**
     * 把传入的对象转化成url的 queryString的形式
     * @param {Object} data 待转化的对象
     * @returns {String}
     */
    function toQueryString(data) {
        if (typeof data !== 'object') return '';
        var param = '';
        for (var key in data) { // 请求参数拼接
            if (data.hasOwnProperty(key)) {
                param += key + '=' + data[key] + '&';
            }
        }
        param = param.replace(/&$/, '');
        return param;
    }
    /**
     * AJAX函数封装
     * @param {object} options 发送请求的选项参数
     *   @config {string} [options.url]     请求地址（必须）
     *   @config {string} [options.type] 请求发送的类型。默认为GET。
     *   @config {Object} [options.params] 需要发送的数据。
     *   @config {function} [options.success] 需要发送的数据。
     *   @config {function} [options.error] 需要发送的数据。
     */
    function ajax(options) {
        options = options || {};
        var url = options.url || '';
        var params = options.params || {};
        var type = (options.type || 'GET').toUpperCase();
        // 1.创建ajax对象
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        // 2.连接服务器
        // 3.发送请求
        if (type === 'GET') {
            xhr.open('GET', url + (url.indexOf('?') === -1 ? '?' : '&') + toQueryString(params), true);
            xhr.send();
        } else if (type === 'POST') {
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            xhr.send(params);
        }
        // 4.接收返回
        xhr.onreadystatechange = function() {
            var data;
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    try {
                        data = JSON.parse(xhr.responseText);
                    } catch (e) {
                        data = xhr.responseText;
                    }
                    options.success && options.success(data, xhr);
                } else {
                    options.error && options.error(xhr.responseText, xhr);
                }
            }
        };
    }
    /** 通过class类名来选取元素
     * @param   {Object} parent 父级对象,
     * @param   {String} sClass className类名
     * @returns {Array}  获取到的节点数组
     */
    function getByClassName(parent, sClass) {
        if (parent.getElementsByClassName) {
            return parent.getElementsByClassName(sClass);
        }
        var oEle = parent.getElementsByTagName('*'),
            arr = [],
            reg = new RegExp('\\b' + sClass + '\\b');
        for (var i = 0, len = oEle.length; i < len; i++) {
            if (reg.test(oEle[i].className)) {
                arr.push(oEle[i]);
            }
        }
        return arr;
    }
    var eduUtil = {
        addEvent: addEvent,
        removeEvent: removeEvent,
        toQueryString: toQueryString,
        ajax: ajax,
        getByClassName: getByClassName,
    };
    window.eduUtil = eduUtil;
})(window);