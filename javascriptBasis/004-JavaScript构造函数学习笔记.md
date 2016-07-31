#### 理解 `Javascript`中的`this`

基于不同的调用方式this的指向也会有所不同，调用方式大致有如下几种：

|调用方式 |  表达式|
|----|----|
|直接调用 |  `foo();`|
|对象方法 |  `o.method();`|
|构造器 |  `new Foo();`|
|call／apply／bind |  `func.call(o)`|

为什么这些调用方式的this指向会有所不同呢？请记住一句话:
**this对象是在运行时基于执行环境所绑定的**

下面一个小例子可以很好的帮助理解这句话：

```js
var k = 10;

function test() {
    this.k = 20;
}
alert(test.k);//undefined
test();
alert(test.k);//undefined
alert(k);//20
```

可以看到这个地方，`test()`这个函数实际上是在`window`下被调用的，它实际上是`window.test()`的简写，所以`this.k`中的`this`实际上是指向的`window`。，所以在最后才会打印出20。（this总是指向调用者）


#### 使用 `call`与 `apply`， `bind`手动改变this

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



