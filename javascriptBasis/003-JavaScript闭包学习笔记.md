#### 理解 `Javascript`中的`this`

基于不同的调用方式this的指向也会有所不同，调用方式大致有如下几种：

|调用方式 |表达式|
|----|----|
|构造函数调用 |`new Foo();`|
|对象方法调用 |`o.method();`|
|函数直接调用 |`foo();`|
|call/apply/bind |`func.call(o);`|

现在就来看看这些不同的调用模式，this的指向会有怎么样的区别：

- 首先就来看构造函数调用模式

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

- 对象方法调用

通过上面的代码很明显我们创建了一个 allen 对象，其中有一个 `sayName` 方法, 直接打印 this.name ，现在我们就来看一下它会输出什么。
```js
allen.sayName();//allen
```
很明显，这里函数中的`this`指向`allen`对象本身。

- 再来看看较为复杂的函数直接调用

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


为什么这些调用方式的this指向会有所不同呢？请记住一句话:
**this对象是在运行时基于执行环境所绑定的**

下面一个小例子可以很好的帮助理解这句话：


可以看到这个地方，`test()`这个函数实际上是在`window`下被调用的，它实际上是`window.test()`的简写，所以`this.k`中的`this`实际上是指向的`window`。，所以在最后才会打印出20。（this总是指向调用者）


#### 使用 `call`/`apply`与`bind` 手动改变 this


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














最先来看看ES5引入的`bind`，它最简单的用法是来显式的设置this指向。如：
```js
var x = 9;
var module = {
    x :81,
    getX : function(){
        return this.x;
    }
};
console.info(module.getX());//81
var getX = module.getX;
console.info(getX());//9

var boundGetX = getX.bind(module);
console.info(boundGetX());//81
```

下面再来看看`apply`与`call`，所有的函数都有这两个方法，它们所实现的功 能也是相同的，只不过在进行传递参数的时候有所不同。

- 简单用法：绑定一些函数用于传递参数，调用

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
alert(call1(10, 20));//30
alert(call1(5, 10));//15
```
可以看到我们在后两个函数中，可以直接使用sum方法。

- 扩充作用域

我们直接看例子：

```js
var color = 'red';
var obj = {color:'blue'}
function showColor(){
    alert(this.color);
}
showColor()//red
showColor.call(obj)//blue
showColor.apply(obj)//blue
```

使用`call()`、`aplly()`来扩充作用域的最大好处就是对象不需要与方法有任何耦合关系。






原型里的属性和方法被所有对象所共享，只要一个其中一个实例去改变了其原型的值，其余实例都拥有改变后的值

一般都使用构造函数与原型组合的形式来定义一个（类）

### 动态原型模式

> 让你的代码都封装到一起

```js
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.job = job;
    //动态原型方法
    //将原型上的方法写在函数内部，以便更直观的分类，与清晰。
    //使用判断来使方法成为惰性方法，只会在第一次创建示例的时候执行，而不是每一次都去给原型对象上添加同样一个方法
    if( typeof this.sayName != 'function'){
        Person.prototype.sayName = function(){
            console.info(this.name);
        }    
    }
    
}
```

### 稳妥构造函数式

> 稳妥对象，非常安全的对象中：1.没有公共属性，2.不能使用this对象

```js
function Person (name,age,job){
    // 创建一个要返回的对象
    var obj = {};
    // 可以定义一些使用的变量和函数，
    var name = name;
    // var sex = '男'
    // var saySex = function(){}
    //在要返回的对象上添加一个方法
    obj.sayName = function(){
        console.info(name);
    }
    //最后暴露接口给外界调用，但不能访问他里面的属性
    return obj;
}
```
