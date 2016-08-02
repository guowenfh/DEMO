## 原型 prototype

在每一个函数呗创建时，都会有一个`prototype`属性。这个属性

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
在我们打印的值中可以很清楚的看到第一个打印的值是`false`这个应该没人不能理解,但是我们再看第二条打印也返回是`false`，如何理解呢？

首先要明确一点，JavaScript对于引用类型的相等判定时会判断它是否指向同一个地址。`sayName()`作为一个函数，在每一次`new Person()`时，都会执行上面三段代码，所以每一个新建出来的对象，都会有自己单独的值。所以`p1.sayName`与`p2.sayName`都是各自实例化的函数，自然不相等。

那么我们要怎么样才能让他们的`sayName`方法是使用的同一个函数呢？很简单：

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


但同时仔细想想，这样又带来了一个新的问题，如果我们有很多公用的方法，每一次声明一个公用的方法都在定义在全局作用域下，可以被所有的地方所调用。显然是一个很不靠谱的事情。怎么解决呢？这时就是原型`prototype`出场的时候到了。


##　初见prototype

> 创建每一个函数的时候，每一个函数都会有一个prototype属性，这个属性其实是一个指针，而这个指针总是指向一个对象。这个对象的用途就是将特定的属性和方法包含在内，起到一个所有实例所共享的的作用。

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



**【图解！！】** 需添加

构造函数.prototype = 原型对象
原型对象.constructor = 构造函数
实例对象.prototype = 构造函数（ 构造函数.isPrototypeOf(实例对象)）这里不能直接用prototype判断 `isPrototypeOf`方法用于判断一个传入对象是不是另外一个对象的原型

### 判断一个对象属性是 原型属性，还是输入实例属性

在判断属性是原型属性还是实例属性之前，我们首先要明白，JavaScript的属性查找机制：每次代码读取一个对象的属性的时候，首先会进行一次搜索，搜索实例对象里的属性，看看有没有；如果没有，再去实例所对应的原型对象里去搜索属性，如果有就返回，如果最终没有，就返回`undefined`。

例子如下：
```js
function Person() {}
Person.prototype.name = "小红";
Person.prototype.age = "21";
Person.prototype.sayName = function() {
    console.info("我是原型对象的方法！");
};

var p1 = new Person();
p1.name = "小黑"; // 实例对象的name属性
delete p1.name;
console.info(p1.name);//获得原型对象的name属性
```
相当于当实例对象本身拥有所查找的属性时，若原型对象也同样具有该属性，那么实例对象上的属性会“屏蔽”原型上的属性。

现在就来看一下判断属性是原型还是实例对象上的
```js
var p2 = new Person();
p2.name = "小刚";
console.info(p2.name);//小刚
console.info(p2.hasOwnProperty('name'))//true
///hasOwnProperty可以判断一个属性是不是实例对象上的属性，在这里我们为p2新增了一个name属性，自然为true。要不你delete后再试试？
```

再来看看 `in`操作符，`for in`

```js
var p3 = new Person();
console.info('name' in p3)//true;位于原型、
p3.name = "小国";
console.info('name' in p3)//true;位于实例
```
可以看到，`in`操作符无论是原型和示例上的属性都能读取到，那么我们集合起来，就可以实现一个`for in`循环并且过滤掉原型上的属性，这也是我们常用的：
```js
for (prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      // ...  
    }
}
```
ECMA5新方法`Object.keys()`：拿到当前对象中的所有keys，返回一个数组

```js
var p4 = new Person();
p4.name = "小石";
p4.age = '23';
var attrs = Object.keys(p4);//["name", "age"]
var attrs2 = Object.keys(Person.prototype);//["name", "age", "sayName"]
var attrs3 = Object.getOwnPropertyNames(Person.prototype);
//["constructor", "name", "age", "sayName"]，该方法可以枚举对象所有属性，不管该内部属性是否能被枚举，（constructor属性是不能被枚举的）
```


### 使用原型扩展对象中的属性和方法

#### 模拟array中的forEach方法，可处理嵌套数组

```js
var arr = [1, 2, 3, [4, [5, 6]]];
arr.forEach(function(item, index, arrary) {
    console.info(item)
})
Array.prototype.each = function(fn) {
    try {
        //1.目的，变量数组的每一项，计数器 记录当前遍历的元素位置
        this.i || (this.i = 0); //var i = 0;
        // 当数组长度大于0的时候，&& 传递的参数必须为函数
        if (this.length > 0 && fn.constructor == Function) {
            //循环遍历数组的每一项
            while (this.i < this.length) { //while循环的范围
                //获取到数组的每一项
                var item = this[this.i];
                if (item && item.constructor == Array) {
                    // 执行递归操作
                    item.each(fn)
                } else {
                    // 如果不是数组（那就是一个单独的元素）
                    // 这里的目标就是为了把数组的当前原声传递给fn函数，并且让函数执行
                    // fn.apply(item, [item]);
                    fn.call(item, item);
                }
                this.i++
            }
            this.i = null; //释放内存，垃圾回收机制回收变量
        }
    } catch (ex) {
        // 做些什么
    }
    return this;
}
arr.each(function(item) {
    console.info(item)
})
```
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
