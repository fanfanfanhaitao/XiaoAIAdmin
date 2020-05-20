// 总线传值 适用于任意组件 eventBus
import Vue from 'vue'
const bus = new Vue()
// 原理就是利用了一个空的vue实例

Vue.prototype.$bus = bus