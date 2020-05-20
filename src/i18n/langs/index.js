import en from './en' //英文
import cn from './cn' //中文
import tw from './tw'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)


// 注册i18n实例并引入语言文件，文件格式等下解析
const i18n = new VueI18n({
    locale: localStorage.getItem('lang') || 'cn', //初始未选择默认 cn 中文
    messages: {
        en: {
            ...en
        },
        cn: {
            ...cn
        },
        tw: {
            ...tw
        },
    }
});

export default i18n;