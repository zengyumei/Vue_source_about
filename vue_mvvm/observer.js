/* 
* observe观察者对data列表中所有属性值的进行监听，
  如果数据发生了变化则拿到最新的值并通知订阅者
*/ 
function Observer(data) {
    this.data = data;
    this.walk(data);
}

function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
}

Observer.prototype = {
    walk: function(data) {
        var self = this;
        Object.keys(data).forEach(function(key) {  //遍历data中的所有key
            self.convert(key, data[key]);
        });
    },
    convert: function(key, val) {
        this.defineReactive(this.data, key, val);
    },
    defineReactive: function(data, key, val) {  //给对象的key进行简单的数据观测，一旦值获取或者设置就会触发一些行为
        var dep = new Dep(); //实现一个消息订阅器
        var childObj = observe(val); //监听子属性

        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                console.log("值变化了");
                val = newVal;    
                childObj = observe(newVal);  // 新的值是object的话，进行监听
                dep.notify();  // 通知订阅者
            }
        });
    }
};

var uid = 0;
function Dep() {
    this.id = uid++;
    this.subs = [];
}
Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    },
    depend: function() {
        Dep.target.addDep(this);
    },
    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    }
};

Dep.target = null;