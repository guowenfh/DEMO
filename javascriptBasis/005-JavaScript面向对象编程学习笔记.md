> 面向对象程序设计（英语：Object-oriented programming，缩写：OOP）是种具有对象概念的程序编程范型，同时也是一种程序开发的方法。它可能包含数据、属性、代码与方法。对象则指的是类的实例。它将对象作为程序的基本单元，将程序和数据封装其中，以提高软件的重用性、灵活性和扩展性，对象里的程序可以访问及经常修改对象相关连的数据。－－－－[维基百科](https://zh.wikipedia.org/wiki/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1)

> 实际上传统的面向对象的语言有一个标志，那就是他们都有类的概念，通过类(相当于模板)可以创建任意多个具有相同属性和方法的对象。但是在JS中没有类的概念，需要我们可以通过其他的方式来模拟面向对象中的类。 


### 类的概念



- 构造函数

```js
function Person(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.sayName = function(){
        console.info(this.name)
    }

}
var p1 = new Person("小红",21,"女")
var p2 = new Person("小国",22,"男")
console.info(p1.name);//小红
console.info(p2.age);//22
p2.sayName();//小国
```
在使用构造函数时，我们需要注意函数的首字母要大写（在JS中约定俗成的规范，用于类的模板）
构造一个对象需要使用 `new`关键字，传递参数，执行模板代码，返回对象

```js
console.info(p1 instanceof Person)//true
console.info(p1 instanceof Object)//true
//instanceof 该操作法用于判断一个对象是不是另一个对象的的实例
```

### 构造函数的使用方式

除去上面使用`new`关键字创建对象之外iain，构造函数和普通函数一样还有其他的两种调用方式：

- 如果一个构造函数，不使用`new`关键字使用，而被当作普通的函数去调用时，会导致全局变量污染，如：

```js
Person("小黑",21,"女");
console.info(name);//小黑
//当使用这种形式时，在全局环境里定义属性，并复制直接定义在window上
```
- 当然构造函数还可以在另一个对象的作用域中调用。

```js
var o = new Object();
Person.call(o,"小白",22,"女");
console.info(o.name);//小白
//使用call与apply来来扩充作用域
```

### 简单原型

```js
function Person(){}
Person.prototype  = {
    name:'小红',
    job:'黑客',
    say:function(){
        console.info('我是原型的函数！');
    }
}
var p1 = new Person();
console.info(p1.name);//name
p1.say();//我是原型的函数！
console.info(Person.prototype.constructor);//function Object() { [native code] }
```

这里我们直接将Person的原型对象赋值给了一个普普通通使用大括号表示的对象，它的父类就是`object`！
如果要使用这样简单原型的形式的话，我们必须手动在`Person.prototype`这个对象中加入一个`constructor`属性（一般写在最开头），这里这样写`constructor:Person`（必须得表示原型对象的构造器）
这时我们再打印:
```js
console.info(Person.prototype.constructor);//function Person() {} 
```

但是这样会有一个弊端，我们再来试试用`for in`循环一下这个对象。就会看到`constructor`也被枚举了，这样显然是不应该的！下面就来看看如何去把这个弊端消除掉


### Object.defineProperty()：重设原型对象构造器

三个参数：
1. 重设构造器的对象
2. 设置什么属性
3. Options配置项

将`constructor:Person`删掉，我们来试试这个新方法

```js
Object.defineProperty(Person.prototype, 'constructor', {
    enumerable: false,
    value: Person
});
console.info(Person.prototype.constructor);//function Person() {} 
```

在使用简单原型时，不会有声明提前，所以在实例化一个对象时，必须在简单原型的复制之后

为什么这些调用方式的this指向会有所不同呢？请记住一句话:
**this对象是在运行时基于执行环境所绑定的**

下面一个小例子可以很好的帮助理解这句话：


可以看到这个地方，`test()`这个函数实际上是在`window`下被调用的，它实际上是`window.test()`的简写，所以`this.k`中的`this`实际上是指向的`window`。，所以在最后才会打印出20。（this总是指向调用者）
