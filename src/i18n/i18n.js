import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './langs'
Vue.use(VueI18n)
//从localStorage获取语言选择。
const i18n = new VueI18n({
  locale: localStorage.lang || 'cn', //初始未选择默认 cn 中文
  messages,
})


export default i18n
