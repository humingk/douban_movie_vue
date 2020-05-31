import Vue from 'vue'
// 第三方组件
import vuex from 'vuex'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 自定义组件
import App from './App.vue'
import api from './request/api'
import store from './store'
import router from './router'

// 第三方组件全局注册
Vue.use(vuex)
Vue.use(elementUi)

// 开发环境控制台相关
Vue.config.productionTip = process.env.NODE_ENV !== 'pro'

// api挂载到原型
Vue.prototype.$api = api

// 切换路由之前拦截
router.beforeEach((to, from, next) => {
	// 当前路由需要token
	if (to.meta.requireAuth) {
		// 当前用户已登陆
		if (store.state.userInfo) {
			next()
		} else if (localStorage.getItem('userInfo')) {
			store.dispatch('update', {
				key: 'userInfo',
				value: localStorage.getItem('userInfo')
			})
			next()
		} else {
			// 需要登录
			store.dispatch('updatePopups', {
				key: 'isLogining',
				value: true
			})
		}
	} else {
		next()
	}
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')