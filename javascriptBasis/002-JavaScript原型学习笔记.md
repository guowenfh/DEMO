先来看一段代码：
```js
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function() {
        console.info(this.name);
    }
}
var p1 = new Person("小红", 21);
var p2 = new Person("小黑", 21);
console.info(p1.name == p2.name);//false
console.info(p1.sayName == p2.sayName);//false
```
在我们打印的值中可以很清楚的看到第一个打印的值是`false`,这个很容易理解，但是我们再看第二条打印，也返回是`false`，如何理解呢？`sayName()`作为一个函数，在每一次`new Person()`时，都会执行上面三段代码，所以每一个新建出来的对象，都会有自己单独的值。所以`p1.sayName`与`p2.sayName`都是各自实例化的函数，自然不相等。

那么我们要怎么样才能让他们的`sayName`方法是使用的同一个函数呢？很简单

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = sayName;
}
function sayName () {
    console.info(this.name);
}
var p1 = new Person("小红", 21);
var p2 = new Person("小黑", 21);
console.info(p1.sayName == p2.sayName);//true
```
在这里我们将`sayName`提取出来，声明到了全局的作用域下，然后在构造函数`Person`内的`sayName`方法引用了全局的方法，所以在每一次`new Person()`时的`sayName`方法，实际上都是指向同一个函数的引用，自然它就会相等。
但是同时，这样又带来了一个新的问题，如果我们有很多公用的方法，每一次声明一个公用的方法都在全局作用域声明一个函数，显然是一个很不靠谱的事情。怎么解决呢？这时就是`prototype`出场的时候到了。


##　初见prototype

> 创建每一个函数的时候都会有一个prototype属性，这个属性其实是一个指针，而这个指针总是指向一个对象。这个对象的用途就是将特定的属性和方法包含在内，起到一个所有实例所共享的的作用

那么我们就先来试试这个属性


```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.sayName = function(){
    console.info(this.name)
}
Person.prototype.sayAge = function(){
    console.info(this.age)
}
var p1 = new Person("小红", 21);
var p2 = new Person("小黑", 21);
console.info(p1.sayName == p2.sayName);//true
console.info(p1.sayAge == p2.sayAge);//true
//现在p1和p2的sayName和sayAge就是共有的了
```
