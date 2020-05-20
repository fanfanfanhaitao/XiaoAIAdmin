import Vue from 'vue'
import Vuex from 'vuex'
import user from "./user"
import calendar from "./calendar"
Vue.use(Vuex)

// 只放公共的状态
export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user,
        calendar
    }
})