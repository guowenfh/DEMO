//工具函数
/**
 * DomReady,在文档创建时,就访问dom元素.比window.onload要快很多.绑定需要执行的函数.
 * @param  {Function} fn 需要执行的函数
 * @return {执行}      在dom节点创建时,同时执行,window.onload等到节点全部创建完毕才执行
 * myReady(function(){});
 */
function myReady(fn) {
    //对于现代浏览器，对DOMContentLoaded事件的处理采用标准的事件绑定方式
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", fn, false);
    } else {
        IEContentLoaded(fn);
    }
    //IE模拟DOMContentLoaded
    function IEContentLoaded(fn) {
        var d = window.document;
        var done = false;

        //只执行一次用户的回调函数init()&#xe603;
        var init = function () {
            if (!done) {
                done = true;
                fn();
            }
        };
        (function () {
            try {
                // DOM树未创建完之前调用doScroll会抛出错误
                d.documentElement.doScroll('left');
            } catch (e) {
                //延迟再试一次~
                setTimeout(arguments.callee, 50);
                return;
            }
            // 没有错误就表示DOM树创建完毕，然后立马执行用户回调
            init();
        })();

        //监听document的加载状态
        d.onreadystatechange = function () {
            // 如果用户是在domReady之后绑定的函数，就立马执行
            if (d.readyState === 'complete') {
                d.onreadystatechange = null;
                init();
            }
        };
    }
}


/*cookie设置的三个函数*/
/**
 * 设置cookie
 * @param {String} name  设置cookie名
 * @param {String} value 对对应的cookie名
 * @param {Number} iDay  过期的时间(多少天后)
 */
function setCookie(name, value, iDay) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + "=" + value + ";expires=" + oDate;
}
/**
 * 获取cookie
 * @param   {String} name 待寻找的cookie名
 * @returns {String} 返回寻找到的cookie值无时为空
 */
function getCookie(name) {
    //"username=abc","password=123456",
    var arr = document.cookie.split("; ");
    //0: "username=abc"
    //1: "password=123456"
    for (var i = 0, len = arr.length; i < len; i++) {
        var arr2 = arr[i].split("=");
        // getCookie("username"),传入username时
        //0: "username"
        //1: "abc"
        if (arr2[0] == name) {
            return arr2[1];
        }
    }
    return "";
}
/**
 * 删除cookie
 * @param {String} name 待删除的cookie名
 */
function removeCookie(name) {
    setCookie(name, "1", -1);
}



/**
 *获取实际样式函数
 * @param   {Object} obj  需要获取样式的对象
 * @param   {String} attr 获取的样式名
 * @returns {String} 获取到的样式值
 */
function getStyle(obj, attr) {
    //IE写法
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
        //标准
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}


/**通过class类名来选取元素
 * @param   {Object} parent 父级对象,
 * @param   {String} sClass className类名
 * @returns {Array}  获取到的节点数组
 */
function getByClassName(parent, sClass) {
    if (parent.getElementsByClassName) {
        return parent.getElementsByClassName(sClass);
    } else {
        var oEle = parent.getElementsByTagName("*"),
            arr = [],
            reg = new RegExp("\\b" + sClass + "\\b");
        for (var i = 0, len = oEle.length; i < len; i++) {
            if (reg.test(oEle[i].className)) {
                arr.push(oEle[i]);
            }
        }
        return arr;
    }
}

/**动画设置函数
 * @param {Object}   obj  获取到的节点
 * @param {Object}   json JSON数据,名为attr,值为iTarget.
 * @param {Function} fn   回调函数,是实现链式运动.连续运动.(可选参数)
 */

function startMove(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var bStop = true; //这一次运动就结束了--所以的值都到达了
        for (var attr in json) {
            //1.取当前的值
            var iCur = 0;
            if (attr == "opacity") {
                iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }
            //2.算速度
            var iSpeed = (json[attr] - iCur) / 10;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            //3.检测停止
            if (iCur != json[attr]) {
                bStop = false;
            }
            if (attr == "opacity") {
                obj.style.filter = "alpha(opacity:" + (iCur + iSpeed) + ")";
                obj.style.opacity = (iCur + iSpeed) / 100;
            } else {
                obj.style[attr] = iCur + iSpeed + "px";
            }
        }
        if (bStop) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 30);
}

/**
 *事件添加函数
 * @param {Object}   obj  需要绑定事件的对象
 * @param {String}   type 事件类型
 * @param {Function} fn   事件触发执行的函数
 */
function myAddEvent(obj, type, fn) {
    //标准
    if (obj.addEventListener) {
        obj.addEventListener(type, function (ev) {
            if (false == fn.call(obj)) {
                //阻止事件冒泡及默认行为
                ev.cancelBubble = true;
                ev.preventDefault();
            }
        }, false);
    } else if (obj.attachEvent) {
        //IE
        obj.attachEvent("on" + type, function () {
            //修改ie下this指向window的问题
            if (false == fn.call(obj)) {
                //阻止事件冒泡及默认行为
                event.cancelBubble = true;
                return false;
            }
        });
    } else {
        //最后选择
        obj["on" + type] = fn;
    }
}

/**
 *Ajax函数
 * @param {String}   type    get或者post请求
 * @param {String}   url     请求地址
 * @param {Object}   data    键值对的形式请求数据
 * @param {Function} success 请求成功执行的函数
 * @param {Function} failed  请求失败执行的函数.
 */
function Ajax(type, url, data, success, failed) {
    // 1.创建ajax对象
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        //兼容ie6
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    var type = type.toUpperCase();
    // 用于清除缓存
    var random = Math.random();

    if (typeof data == 'object') {
        var str = '';
        for (var key in data) {
            str += key + '=' + data[key] + '&';
        }
        data = str.replace(/&$/, '');
    }
    //2.拼接传入的json,链接服务器
    if (type == 'GET') {
        if (data) {
            xhr.open('GET', url + '?' + data, true);
        } else {
            xhr.open('GET', url + '?t=' + random, true);
        }
        //3.发送请求
        xhr.send();
    } else if (type == 'POST') {
        xhr.open('POST', url, true);
        // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }

    // 4.处理返回数据
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                success(xhr.responseText);
            } else {
                if (failed) {
                    failed(xhr.status);
                }
            }
        }
    };
}

/**
 *  显示隐藏函数,如果是显示就隐藏,是隐藏就显示
 * @param {object} obj 需要在点击或hover后实现点击显示隐藏.的对象
 */
function showHide(obj) {
    var objDisplay = getStyle(obj, "display");
    if (objDisplay == "none") {
        obj.style.display = "block";
    } else {
        obj.style.display = "none";

    }
}
/**
 * 获取相应id的dom节点
 * @param   {string} id 传入的id名
 * @returns {object} 返回获取到的html节点
 */
function $(id) {
    return document.getElementById(id);
}

//工具函数包结束


//页面逻辑开始
/*
 *顶部通知条,不再提醒cookie
 */
myReady(function () {
    var oNotice = $("notice");
    var oClose = $("no-notice");
    //判断顶部通知是否含有cookie
    if (getCookie("close")) {
        oNotice.style.marginTop = -36 + "px";
    } else {
        oNotice.style.marginTop = 0;



    }
    myAddEvent(oClose, "click", function () {
        startMove(oNotice, {
            marginTop: -36
        });
        setCookie("close", "false", 30);
    });
});
/*通知条结束*/

/**
 * 关注与登录模块开始
 */
myReady(function () {
    var follow = $("follow");
    var followAdd = follow.getElementsByTagName("span")[0];
    var removeDefine = getByClassName(follow, "remove-define")[0];
    var loginWrap = getByClassName(document, "login-wrap")[0];
    var loginClose = $("login-close");
    var user = $("login-form").getElementsByTagName("input")[0];
    var pass = $("login-form").getElementsByTagName("input")[1];
    var obtn = getByClassName($("login-form"), "login-btn")[0];
    var loginError = getByClassName($("login-form"), "login-error")[0];

    //判断是否有关注cookie若有直接设置为关注样式
    if (getCookie("followSuc") === "true") {
        followShow();
    }
    //从服务器获取关注成功数据,并设置关注成功cookie
    function followCookie() {
        Ajax("GET", "http://study.163.com/webDev/attention.htm", {}, function (data) {
            if (data == "1") {
                //设置关注成功cookie
                setCookie("followSuc", "true", 30);
            }
        }, function (err) {
            console.log("服务器响应失败,错误号:" + err);

        });
    }
    //点击关注事执行的函数
    function followClick() {
        //判断是否有登录成功的cookie
        if (getCookie("loginSuc")) {
            //存在登录成功的cookie时,点击关注,改变样式.
            followShow();
            //从服务器获取关注成功数据,并设置关注成功cookie
            followCookie();

        } else {
            //本地不存在登录cookie时,进入登入层
            loginShowHide();
            //添加登录事件
            myAddEvent(obtn, "click", loginBtn);
            //点击X退出登录层
            myAddEvent(loginClose, "click", function(){
                loginWrap.style.display="none";
            });

        }
    }
    //点击登录服务器响应成功时执行的函数
    var loginSuccess = function (data) {
            if (data === "1") {
                //设置登录成功函数cookie
                setCookie("loginSuc", "true", 30);
                //登录成功,登录层消失
                loginShowHide();
                //关注样式改变
                followShow();
                //从服务器获取关注成功数据,并设置关注成功cookie
                followCookie();
            } else {
                /*登录错误时响应*/
                loginError.style.display = "block";
                setTimeout(function () {
                    loginError.style.display = "none";
                }, 2000);
            }
        };
        //登录函数
    function loginBtn() {
        //向服务器提交的数据
        var send = {
            userName: md5(user.value),
            password: md5(pass.value)
        };
        //异步提交
        Ajax("GET", "http://study.163.com/webDev/login.htm", send, loginSuccess, function (error) {
            console.log("服务器响应失败,错误号:" + error);
        });
    }
    //登录层显示
    function loginShowHide() {
        showHide(loginWrap);
    }
    //关注层显示
    function followShow() {
        var followRemove = getByClassName(follow, "follow-remove")[0];
        showHide(followAdd);
        showHide(followRemove);

    }
    //取消关注时,改变follow样式,且删除cookie;
    function followNone() {
        followShow();
        removeCookie("followSuc");
    }
    //给关注按钮添加点击事件
    myAddEvent(followAdd, "click", followClick);
    //给取消关注添加点击事件
    myAddEvent(removeDefine, "click", followNone);
});
/*关注与登录结束*/

/**
 * 轮播图开始,待修改,应该写一个轮播图组件.
 */
myReady(function () {
    var Slideshow = getByClassName(document, "Slideshow")[0];
    var aImg = Slideshow.getElementsByTagName("a");
    var aLI = Slideshow.getElementsByTagName("li");
    var timer = null;
    var index = 0;
    //自动播放函数
    function autoPlay() {
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            if (index >= aImg.length) {
                index = 0;
            }
            change(index);
        }, 5000);
    }
    autoPlay();
    //改变当前高亮的索引,以及显示的图片,切换方法
    function change(curIndex) {
        for (var j = 0, len = aImg.length; j < len; j++) {
            aLI[j].className = "";
            startMove(aImg[j], {
                opacity: 0
            });
            aImg[j].style.display = "none";
        }
        aLI[curIndex].className = "active";
        aImg[curIndex].style.display = "block";
        startMove(aImg[curIndex], {
            opacity: 100
        });
        index = curIndex;
    }
    //添加循环点击切换
    for (var i = 0, len = aImg.length; i < len; i++) {
        aLI[i].id = i;
        myAddEvent(aLI[i], "click", function () {
            change(this.id);
        })
    }
    //hover时暂停轮播
    myAddEvent(Slideshow, "mouseover", function () {
        clearInterval(timer);
    });
    //移出继续轮播
    myAddEvent(Slideshow, "mouseout", autoPlay);

});
/*轮播图结束*/

/*
 * 生活环境图片无缝滚动
 */
myReady(function () {
    var environment = getByClassName(document, "environment")[0];
    var environmentUl = getByClassName(environment, "environment-ul")[0];
    var environmentLi = environmentUl.getElementsByTagName("li");
    var environmentTimer = null;
    var environmentSpeed = 1;
    environmentUl.innerHTML += environmentUl.innerHTML;
    environmentUl.style.width = environmentLi.length * environmentLi[0].offsetWidth + "px";

    function ulMove() {
        environmentUl.style.left = environmentUl.offsetLeft - environmentSpeed + "px";
        if (environmentUl.offsetLeft <= -environmentUl.offsetWidth / 2) {
            environmentUl.style.left = 0;
        }
    }
    environmentTimer = setInterval(ulMove, 10);
    myAddEvent(environment, "mouseover", function () {
        clearInterval(environmentTimer);
    });
    myAddEvent(environment, "mouseout", function () {
        environmentTimer = setInterval(ulMove, 20);

    });
});
/*结束无缝滚动*/

/*
 *视频播放开始
 */
myReady(function () {
    var moivePlayer = getByClassName(document, "studyMoive")[0].getElementsByTagName("img")[0];
    var playerWrap = getByClassName(document, "moive-wrap")[0];
    var closeMoive = $("moive-close");
    var moive = $("moive");

    function playPause() {
        if (moive.paused)
            setTimeout(function () {
                moive.play();

            }, 500);
        else
            moive.pause();
    }

    function play() {
        showHide(playerWrap);
        playPause();

    }
    myAddEvent(moivePlayer, "click", play);
    myAddEvent(closeMoive, "click", play);
});
/*视频播放结束*/

/*
 * 课程列表开始
 */
myReady(function () {
    var design = getByClassName(document, "design")[0];
    var typeNumber = 10;
    var tabDesign = getByClassName(document, "conent-tab")[0].getElementsByTagName("li")[0];
    var tabLanguage = getByClassName(document, "conent-tab")[0].getElementsByTagName("li")[1];
    //
    var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;

    //默认页面课程列表
    var psizeNumber = 20;
    if (clientWidth <= 1205) {
        psizeNumber = 15;
    } else {
        psizeNumber = 20;
    }
    // 页码大小限制
    var totalPage;
    //默认页码
    var pageNoNumber = 1;
    //tab页切换课程列表
    function tabChange() {
        var parent = getByClassName(document, "design")[0];
        var child = getByClassName(parent, "class-list");
        var i = 0;
        var childLength = child.length - 1;
        for (i = childLength; i >= 0; i--) {
            parent.removeChild(child[i]);
        }
        course();
    }
    /**
     * 判断屏幕的可见区域大小,实现自适应单页加载数量3列或4列,
     * 因为client的缘故在切换时,会有几px的偏差,暂时没想到解决方案.
     */
    window.onresize = function () {
            var currClientWidth = document.documentElement.clientWidth || document.body.clientWidth;
            if (clientWidth > 1205 && currClientWidth <= 1205) {
                psizeNumber = 15;
                clientWidth = currClientWidth;
                tabChange();
            } else if (clientWidth <= 1205 && currClientWidth > 1205) {
                psizeNumber = 20;
                clientWidth = currClientWidth;
                tabChange();
            }
        };
        //产品设计点击切换
    myAddEvent(tabDesign, "click", function () {
        tabLanguage.className = "";
        this.className = "tab-active";
        typeNumber = 10;
        pageNoNumber = 1;
        tabChange();
    });
    //编程语言点击切换
    myAddEvent(tabLanguage, "click", function () {
        tabDesign.className = "";
        this.className = "tab-active";
        typeNumber = 20;
        pageNoNumber = 1;
        tabChange();
    });

    /**
     * 页码切换部分.
     */
    var pagination = getByClassName(document, "pagination")[0];
    var paginationUP = pagination.getElementsByTagName("i")[0];
    var paginationDOWN = pagination.getElementsByTagName("i")[1];

    //数字切换页码
    var pageUl = getByClassName(document, "page-ul")[0];
    var pageLi = pageUl.getElementsByTagName("li");
    for (var i = 0; i < pageLi.length; i++) {
        pageLi[i].onclick = function () {
            for (var j = 0; j < pageLi.length; j++) {
                pageLi[j].className = "";
            }
            //当前高亮
            this.className = "page-active";
            //从服务器获取的页码
            pageNoNumber = parseInt(this.innerHTML);
            tabChange();

        };
    }

    //向上向下切换页码
    //默认为false表示向下增加
    var UpOrDown = true;
    //向上向下点击时执行的事件.
    function upDown() {
        for (var i = 0; i < pageLi.length; i++) {
            //当向下翻页时传入页码不为8的倍数时,根据条件翻页,处理传入为8时,直接翻页导致最后的8和8的倍数取不到的情况
            if (UpOrDown && parseInt(pageNoNumber % 8) !== 0) {
                pageLi[i].innerHTML = parseInt(pageNoNumber / 8) * 8 + i + 1;
            } else {
                //当向上时,如果传入为8的倍数时,直接翻页,不这样处理的话总是会出现要比8的倍数少1才翻页的情况
                if (parseInt(pageNoNumber % 8) == 0) {
                    pageLi[i].innerHTML = (parseInt(pageNoNumber / 8) - 1) * 8 + i + 1;
                } else {
                    //向上翻页的普通情况
                    pageLi[i].innerHTML = parseInt(pageNoNumber / 8) * 8 + i + 1;

                }
            }
            pageLi[i].className = "";
        }
        if (parseInt(pageNoNumber % 8) == 0) {
            pageLi[pageLi.length - 1].className = "page-active";

        } else {
            pageLi[parseInt(pageNoNumber % 8) - 1].className = "page-active";
        }
        tabChange();
    }
    //向上翻页点击事件
    myAddEvent(paginationUP, "click", function () {
        pageNoNumber--;
        //边界处理
        if (pageNoNumber <= 1) {
            pageNoNumber = 1;
        }
        UpOrDown = false;
        upDown();
    });
    //向下翻页点击事件
    myAddEvent(paginationDOWN, "click", function () {
        pageNoNumber++;
        //边界处理
        if (pageNoNumber >= totalPage) {
            pageNoNumber = totalPage;
        }
        UpOrDown = true;
        upDown();
    });

    //Ajax函数
    function course() {
        var senddata = {
            pageNo: pageNoNumber,
            psize: psizeNumber,
            type: typeNumber};
        Ajax("get", "http://study.163.com/webDev/couresByCategory.htm", senddata,
            function (str) {
                //成功时.课程列表创建函数
                var arr = JSON.parse(str);
                //总页数
                totalPage = arr["totalPage"];
                var list = arr["list"];
                for (var i in list) {
                    //课程列表容器
                    var classList = document.createElement("div");
                    classList.className = "class-list";
                        //课程图片
                    var classListImg = document.createElement("img");
                    classListImg.src = list[i].middlePhotoUrl;
                    classListImg.alt = list[i].name;
                    //课程信息.文字信息包裹.
                    var classListContent = document.createElement("div");
                    classListContent.className = "describe";
                    //课程标题
                    var classListTitle = document.createElement("a");
                    var classListTitleTxt = document.createTextNode(list[i].name);
                    classListTitle.appendChild(classListTitleTxt);
                    classListTitle.href = list[i].providerLink;
                    //课程发布者
                    var classProvider = document.createElement("p");
                    var classProviderTxt = document.createTextNode(list[i].provider);
                    classProvider.appendChild(classProviderTxt);
                    //课程学习人数
                    var classPerson = document.createElement("div");
                    //人数图标
                    var hotPriceIcon = document.createElement("i");
                    hotPriceIcon.innerHTML = "&#xe603;";
                    hotPriceIcon.className = "iconfont";
                    classPerson.appendChild(hotPriceIcon);
                    var classPersonTxt = document.createTextNode(list[i].learnerCount);
                    classPerson.appendChild(classPersonTxt);
                    // 课程价格
                    var classPrice = document.createElement("strong");
                    if (list[i].price == "0") {
                        var classPriceTxt = document.createTextNode("免费");
                    } else {
                        var classPriceTxt = document.createTextNode(list[i].price);
                        //价格图标..
                        var classPriceIcon = document.createElement("i");
                        classPriceIcon.innerHTML = "&#xe609;";
                        classPriceIcon.className = "iconfont";
                        classPrice.appendChild(classPriceIcon);
                    }
                    classPrice.appendChild(classPriceTxt);

                    //集体插入
                    design.appendChild(classList);
                    classList.appendChild(classListImg);
                    classList.appendChild(classListContent);
                    classListContent.appendChild(classListTitle);
                    classListContent.appendChild(classProvider);
                    classListContent.appendChild(classPerson);
                    classListContent.appendChild(classPrice);
                    //hover时的样式容器
                    var hoverDiv = document.createElement("div");

                    //hover时课程标题
                    var hoverListTitle = document.createElement("a");
                    var hoverListTitleTxt = document.createTextNode(list[i].name);
                    hoverListTitle.appendChild(hoverListTitleTxt);
                    hoverListTitle.href = list[i].providerLink;
                    var hoverPerson = document.createElement("div");
                    //此处应该可以删除一部分
                    //人数图标
                    var hotPriceIcon = document.createElement("i");
                    hotPriceIcon.innerHTML = "&#xe603;";
                    hotPriceIcon.className = "iconfont";
                    hoverPerson.appendChild(hotPriceIcon);
                    var hoverPersonTxt = document.createTextNode(list[i].learnerCount + "人在学");
                    hoverPerson.appendChild(hoverPersonTxt);
                    //课程发布者
                    var hoverProvider = document.createElement("p");
                    var hoverProviderTxt = document.createTextNode("发布者 ：" + list[i].provider);
                    hoverProvider.appendChild(hoverProviderTxt);
                    //分类
                    var hoverCategory = document.createElement("p");
                    var hoverCategoryTxt = document.createTextNode("分类 ：" + list[i].categoryName);
                    hoverCategory.appendChild(hoverCategoryTxt);
                    hoverDiv.appendChild(hoverListTitle);
                    hoverDiv.appendChild(hoverPerson);
                    hoverDiv.appendChild(hoverProvider);
                    hoverDiv.appendChild(hoverCategory);
                    hoverDiv.className = "describe-hover";
                    hoverDiv.style.display = "none";

                    //课程描述......
                    var hoverDescription = document.createElement("p");
                    var hoverDescriptionTxt = document.createTextNode(list[i].description);
                    hoverDescription.appendChild(hoverDescriptionTxt);
                    hoverDescription.className = "description";
                    hoverDescription.style.display = "none";

                    classList.appendChild(hoverDiv);
                    classList.appendChild(hoverDescription);}
                //课程列表的hover效果
                //获取课程列表数量
                var classlisthover = getByClassName(document, "class-list");
                for (var i = 0; i < classlisthover.length; i++) {
                    myAddEvent(classlisthover[i], "mouseover", function () {
                        this.className = "hover-class-list";
                        getByClassName(this, "describe")[0].style.display = "none";
                        getByClassName(this, "describe-hover")[0].style.display = "block";
                        getByClassName(this, "description")[0].style.display = "block";
                    });
                    myAddEvent(classlisthover[i], "mouseout", function () {
                        this.className = "class-list";
                        getByClassName(this, "describe")[0].style.display = "block";
                        getByClassName(this, "describe-hover")[0].style.display = "none";
                        getByClassName(this, "description")[0].style.display = "none";
                    });
                }
            }
        );
    }
    course();
});
/*课程列表结束*/


/*
 * 热门排行开始
 */
myReady(function () {
    var ranking = getByClassName(document, "ranking-list")[0];

    Ajax("get", "http://study.163.com/webDev/hotcouresByCategory.htm", {}, function (str) {
        var arr = JSON.parse(str);
        console.log(arr);
        var i = Math.round(Math.random() * 10);
        var len = i + 10;
        for (i; i < len; i++) {
            //最外层包裹
            var hotList = document.createElement("div");
            hotList.className = "list-content";
            hotList.className += " clearfix";
            //左侧图片
            var hotListImg = document.createElement("img");
            hotListImg.src = arr[i].smallPhotoUrl;
            hotListImg.alt = arr[i].name;
            //名字
            var hotListTitle = document.createElement("a");
            hotListTitle.href = arr[i].providerLink;
            var titleContent = document.createTextNode(arr[i].name);
            hotListTitle.appendChild(titleContent);
            //学习人数
            var hotPrice = document.createElement("div");
            var hotPriceContent = document.createTextNode(arr[i].price);
            //图标..
            var hotPriceIcon = document.createElement("i");
            hotPriceIcon.innerHTML = "&#xe603;";
            hotPriceIcon.className = "iconfont";
            hotPrice.appendChild(hotPriceIcon);
            hotPrice.appendChild(hotPriceContent);

            //集中插入
            hotList.appendChild(hotListImg);
            hotList.appendChild(hotListTitle);
            hotList.appendChild(hotPrice);
            ranking.appendChild(hotList);
        }
    });
});
/*热门排行结束*/
