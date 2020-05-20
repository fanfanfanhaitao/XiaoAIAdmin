import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './global'
import './filters'
import dayjs from 'dayjs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './bus'
import i18n from './i18n/langs/index'
import VCharts from 'v-charts'
import Print from '@/plugs/print'





router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

Vue.use(VCharts)
Vue.use(Print) // 注册
Vue.use(ElementUI)
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false

new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app')