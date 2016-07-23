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
