> 实际上传统的面向对象的语言有一个标志，那就是他们都有类的概念，通过类(相当于模板)可以创建任意多个具有相同属性和方法的对象。但是在JS中没有类的概念，
> 但是我们可以通过其他的方式来模拟面向对象中的类。 


### 类的概念

- 工厂模型

```js
function createPerson(name, age, sex) {
    var obj = {};
    obj.name = name;
    obj.age = age;
    obj.sex = sex;
    obj.sayName = function(){
        console.info(this.name)
    }
    return obj;
}
var p1 = createPerson("小红",21,"女")
var p2 = createPerson("小国",22,"男")
console.info(p1.name);//小红
console.info(p2.age);//22
p2.sayName();//小国
```

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
instanceof //该操作法用于判断一个对象是不是另一个对象的的实例
```

如果一个构造函数，不使用`new`关键字使用，而被当作普通的函数去调用时，会导致全局变量污染，如：
```js
Person("小黑",21,"女");
console.info(name);//小黑
//当使用这种形式时，在全局环境里定义属性，并复制直接定义在window上
```
当然构造函数还可以在另一个对象的作用域中调用。
```js
var o = new Object();
Person.call(o,"小白",22,"女");
console.info(o.name);//小白
//使用call与apply来来扩充作用域
```

