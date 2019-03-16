/**
 * MVVM是数据绑定的入口，将Observer、Watcher和compile关联起来
 * @param {*} options 
 */
function MVVM (options) {
    this.$options = options || {};
    var self = this;
    var data = this._data = this.$options.data;
    this.methods = options.methods;

    //数据代理  实现 vm.xxx -> vm._data.xxx
    Object.keys(data).forEach(function(key) {
        self._proxyData(key);
    });
    this._initComputed();
    observe(data, this);
    this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },
    _proxyData: function (key, setter, getter) {
        var self = this;
        setter = setter || 
        Object.defineProperty(self, key, {
            configurable: false,
            enumerable: true,
            get: function proxyGetter() {
                return self._data[key];
            },
            set: function proxySetter(newVal) {
                self._data[key] = newVal;
            }
        });
    },
    _initComputed: function() {
        var self = this;
        var computed = this.$options.computed;
        if (typeof computed === 'object') {
            Object.keys(computed).forEach(function(key) {
                Object.defineProperty(self, key, {
                    get: typeof computed[key] === 'function' 
                            ? computed[key] 
                            : computed[key].get,
                    set: function() {}
                });
            });
        }
    }
};