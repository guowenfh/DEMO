[TOC]

## Javascript中this与闭包学习笔记

### 理解 `Javascript`中的`this`

基于不同的调用方式this的指向也会有所不同，调用方式大致有如下几种：

|调用方式 |表达式|
|----|----|
|构造函数调用 |`new Foo();`|
|对象方法调用 |`o.method();`|
|函数直接调用 |`foo();`|
|call/apply/bind |`func.call(o);`|

现在就来看看这些不同的调用模式，this的指向会有怎么样的区别：

#### 构造函数调用模式

```js
function Person(name,age){
    this.name = name;
    this.age = age;
    this.sayName  = function(){
        console.info(this.name);
    };
}
var allen = new Person("allen",12);
console.info(allen);//{name: "allen", age: 12};...
```
通过这样的代码可以很清楚的的看出，构造函数 Person 内部的`this`指向被创建的调用对象 allen

#### 对象方法调用

通过上面的代码很明显我们创建了一个 allen 对象，其中有一个 `sayName` 方法, 直接打印 this.name ，现在我们就来看一下它会输出什么。
```js
allen.sayName();//allen
```
很明显，这里函数中的`this`指向`allen`对象本身。

#### 函数直接调用

先来看一段代码
```js
function add(a, b) {
    return a + b;
}
var myNumber = {
    value: 1,
    double: function() {
        function handle() {
            this.value = add(this.value, this.value);
        }
        handle();
    }
};
console.info(myNumber.value);//1
myNumber.double();
console.info(myNumber.value);//1
```

解析： 首先我们定义了一个全局函数`add`用于加法运算，接着我们定义了一个对象，有一属性value为1，还有一个方法的目的是让value值乘以二。我们在函数内嵌套定义了一个函数`handle`,调用`add`方法并且执行。但是在调用函数值执行之后并没有达到我们想要的效果。这是为什么呢？
如何你打开chrome调试工具并打下断点会发现在`handle`函数内部的this会指向window！
由此可以发现，**在函数内部创建的函数，在这个函数调用时，函数内部的`this`会指向window而不是外部的函数**

下面就就可以看一下常见的两个方案：

```js
// 取消 handle函数的定义，直接在对象的方法中使用this
double2: function() {
    this.value = add(this.value, this.value);
},
// 使用变量保存外部函数的this。
double3: function() {
    var that = this;
    function handle() {
        that.value = add(that.value, that.value);
    }
    handle();
}
```

#### 使用 `call`/`apply`与`bind` 手动改变 this

先来看下面这样一段代码：
```js
function Point(x, y){
    this.x = x;
    this.y = y;
}
Point.prototype.move = function(stepX, stepY){
    this.x += stepX;
    this.y += stepY;
};
var p = new Point(0, 0);
console.log(p);//{x: 0, y: 0}
p.move(2,2);
console.log(p);//{x: 2, y: 2}
var circle = {x:1,y:1,r:1};
p.move.apply(circle, [2,1]);
console.info(circle);//{x: 3, y: 2, r: 1}
```

我们使用`Point`构造函数可以创建出一个点，在其原型上有一个`move`方法可以使这个点坐标移动。
之后我们又创建`circle`对象，有x/y/r属性（把它想象成一个圆），之后我们的需求是：将这个圆的圆心移动，我们就使用了`apply`来借用`move`方法，最终将圆移动了位置，最终效果如下图：
![apply使用圆示意图](http://ww4.sinaimg.cn/large/82d12951gw1f6emf8rigdj208l07tglm.jpg)

- `function.prototype.apply/call`

在上面我们可以看到能实现圆心移动的关键方法就是`apply`，大致解析如下，`p.move`是一个函数它的作用就是将一个点移动，然后我们通过`apply`方法把它借用给`circle`这个对象。将`circle`对象上的x/y属性进行变更，分别加2和1，实现了圆心的移动。很明显在这里 **`apply`方法描述的就是一个借用的功能**.

为什么会把`apply/call`放在一起说呢，因为他们的功能并没有实质性的区别。只是在传入参数的时候，apply需要将参数以数组的形式进行传递，而call是将需要传入的参数一个一个跟在借用的对象后。下面一个小例子足以说明：

```js
function sum(a, b) {
    return a + b;
}
function call1(num1, num2) {
    return sum.call(this, num1, num2);
}
function apply1(num1, num2) {
    // return sum.apply(this,[num1,num2])
    return sum.apply(this, arguments);//利用函数的arguments对象

}
console.info(call1(10, 20));//30
console.info(call1(5, 10));//15
```
可以看到我们在后两个函数中，可以直接使用sum方法。

- `function.prototype.bind`

这里来看看ES5引入的`bind`，又有什么不同，还是和上面类似的代码
```js
function Point(x, y){
    this.x = x;
    this.y = y;
}
Point.prototype.move = function(stepX, stepY){
    this.x += stepX;
    this.y += stepY;
};
var p = new Point(0, 0);
var circle = {x:1,y:1,r:1};
var circleMove = p.move.bind(circle,2,2);
circleMove();
console.info(circle);//{x: 3, y: 3, r: 1}
circleMove(3,4);
console.info(circle);//{x: 5, y: 5, r: 1}
```
这里我使用了和 call 类似的调用方法，但是显然 bind 和 call 不一样，使用 bind 时，它会将我们绑定 this 后的函数引用返回，然后手动执行。可以看到的是，因为在这里我们绑定的对象的后面传入了x/y两个值，所以执行后坐标立即变化，并且在后来手动设置偏移量时也不再起到效果。
这样的相比于apply立即执行的好处时，我们可以使用定时器，例如:`setTimeout(circleMove,1000)`，延迟一秒后移动。

当然，每次只能移动固定的值也不是一件很好的事情，所以我们在使用 bind 的时候常常不会设置其默认参数， `var circleMove2 = p.move.bind(circle,);`,之后在执行函数时，再将参数传入`circleMove(3,4);`，这样就可以实现每次自定义偏移量了

这又引出了`call`/`apply`与`bind`的作用的另外一种说法： **扩充作用域**

```js
var color = 'red';
var obj = {color:'blue'};
var obj1 = {color:'black'};
var obj2 = {color:'yellow'};

function showColor(){
    console.info(this.color);
}
showColor();//red
showColor.call(obj);//blue
showColor.apply(obj1);//black
showColor.bind(obj2)();//yellow
```

可以看到这里都实现了一样的效果。值得说的是使用`call`、`aplly()`来扩充作用域的最大好处就是对象不需要与方法有任何耦合关系。

###　闭包

#### 简单定义


先来看这样的一段代码，在chrome中找到`Scope`列表，可以看到，在作用域链上我们已经创建了一个闭包作用域！
```js
(function() {
    var a = 0;
    function b() {
        a = 1;
        debugger;
    }
    b();
})();
```

闭包一个最简单的定义就是：闭包就是说在函数内部定义了一个函数，然后这个函数调用到了父函数内的相关临时变量，这些相关的临时变量就会存入闭包作用域里面.这就是闭包最基础的定义

#### 保存变量

下面就来看一下闭包的一个基本特性保存变量

```js
function add(){
    var i = 0;
    return function(){
        console.info(i++);
    };
}
var f = add();
f();//1
f();//2
```
我们定义了一个 add 方法，执行完毕后会返回一个函数，接着我们就把这个函数赋值给了变量f，由于 add 函数也是返回一个函数，在我们每一次执行`f()`的时候，它引用了add内的变量i，并且保存在自己的闭包作用域内，所以一直输出执行的话，也会累加输出。

#### 小tips

需要我们记住的是 **每次函数调用的时候创建一个新的闭包**：

```js
var fun = add();
fun();//1
fun();//2
```

我们再来通过简单的例子看看另一个注意的地方：

```js
function test(){
    var a  = 0;
    var ff =  function(){
        console.info(a);
    };
    a = 1214;
    return ff;
}
var b = test();
b();//1214
```
执行的结果是1214，从这里我们可以看到 **闭包中局部变量是引用而非拷贝**，其实这样的改变发散开来我们就可以知道，即使在这里变量 a 未在函数 ff 之前定义，而是`var a = 1214;`我们同样会得到同样的结果


#### 点击li显示对应编号案例解析

其实上面这些我是很晕的，来看一个我们实际在前端编程过程中经常遇到的问题。
我们有一个列表，分别为1/2/3，我们的需求是在点击不同的数字时，也能把它对应的编号弹出来。然后我们洋洋洒洒写下了这样的代码：

```html
<ul id="#list">
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
<script>
(function() {
    var oLi = document.getElementById("#list").getElementsByTagName("li");
    for (var i = 0; i < oLi.length; i++) {
        oLi[i].onclick = function() {
            alert(i);
        };
    }
})();
</script>
```
一运行，发现懵了。怎么弹出来的都是3？不对啊，我不是用循环将值都传进去了吗？

如果你确实理解了上面的 **闭包中局部变量是引用而非拷贝**这一节中的两个案例的话，那么就应该能了解一些。

解析：在这里我们为每一个li的`onclick`事件 **绑定**了一个匿名函数，这个匿名函数就形成了一个闭包。这些匿名函数并不立即执行，而是在点击对应的li的时候才回去执行它。
而在这时就和上面的`a = 1214;`这个例子一样，此时的循环早已结束，i 就等于`oLi.length`，在我们点击不同的`li`时，闭包中引用的其实都是引用的同一个变量i自然弹出来的都是3，（这里不理解引用的都是用一个i的话，可以将`alert(i);`替换成`alert(i++);`，再到浏览器上去进行测试）


解决方案：

```js
(function() {
    var oLi = document.getElementById("#list").getElementsByTagName("li");
    for (var i = 0; i < oLi.length; i++) {
        oLi[i].onclick = (function(j) {
            return function(){
                alert(j);
            };
        })(i);
    }
})();
/*
(function() {
    var oLi = document.getElementById("#list").getElementsByTagName("li");
    for (var i = 0; i < oLi.length; i++) {
        (function(j){
            oLi[i].onclick= function(){
                alert(j);
            };
        })(i);
    }
})();
*/
```

可以看到这里给出了两个简单的写法，但实际上除了写法不同之外、闭包包含范围、内容也不太一样（有兴趣的可以打开chrome调试工具看看），但是达到的效果是一样的。这样我们就为每个`li`的`onclick`事件的匿名函数，都保存下了自己闭包变量。就可以实现在点击每个li的时候弹出对应的标号了。（还可以将`alert(j);`替换成`alert(j++);`欣赏一下点击不同li时的累加效果）


当然如果你只是想要记住一些标号这么简单的事情，其实还可以将变量保留于元素节点上，也能达到一样的效果，如下：

```js
(function() {
    var oLi = document.getElementById("#list").getElementsByTagName("li");
    for (var i = 0; i < oLi.length; i++) {
        oLi[i].flag = i;
        oLi[i].onclick = function() {
            alert(this.flag);
        };
    }
})();
```


