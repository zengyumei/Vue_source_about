/**
 * watcher:订阅者作为Observer和Compile之间通信的桥梁
 */

function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.depIds = {};  
    if (typeof exp === 'function') {
        this.getter = exp;
    } else {
        this.getter = this.parseGetter(exp.trim());
    }
    this.value = this.get(); // 将自己添加到订阅器dep中
}
 
Watcher.prototype = {
    update: function() { // 属性值变化收到通知
        this.run(); 
    },
    run: function() {
        var value = this.get();
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal); // 执行Compile中绑定的回调，更新视图
        }
    },
    addDep: function(dep) {
        if(!this.depIds.hasOwnProperty(dep.id)){
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        }
    },
    get: function() {
        Dep.target = this;  // 将当前订阅者指向自己
        var value = this.getter.call(this.vm, this.vm);  // 强制执行监听器里的get函数
        Dep.target = null;  // 释放自己
        return value;
    },
    parseGetter: function(exp) {
        if (/[^\w.$]/.test(exp)) return; 
        var exps = exp.split('.');
        return function(obj) {
            for (var i = 0, len = exps.length; i < len; i++) {
                if (!obj) return;
                obj = obj[exps[i]];
            }
            return obj;
        }
    }
};
