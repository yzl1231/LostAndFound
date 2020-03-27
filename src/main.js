import Vue from 'vue'
// import store from './store/stroe'
import App from './App'
import Fly from 'flyio/dist/npm/wx';

Vue.config._mpTrace = true
Vue.config.productionTip = false
App.mpType = 'app'

//将store对象放置在vue的原型上，为的是每个实例都可以使用
// Vue.prototype.$store = store

let fly = new Fly
Vue.prototype.$fly = fly

const app = new Vue(App)
app.$mount()