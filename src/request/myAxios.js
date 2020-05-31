/**
 * 封装的axios实例
 */
import axios from 'axios'
import store from '../store'
// 单独引入element ui
import {Notification} from 'element-ui'

// 创建axios实例，超时5s
var instance = axios.create({
	timeout: 20000
})
// axios的post请求的默认请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

/**
 * axios请求拦截器
 */
instance.interceptors.request.use(
	config => {
		const userInfo = store.state.userInfo
		// 如果当前用户已登录,每次请求都加上token
		if (userInfo && userInfo.access_token) {
			config.headers.Authorization = 'Bearer ' + userInfo.access_token
		}
		return config
	},
	error => {
		return Promise.error(error)
	}
)

/**
 * axios 响应拦截器
 */
instance.interceptors.response.use(
	// 对应axios的then
	res => {
		// 请求成功
		if (res.status === 200) {
			// 返回正确
			if (res.data.code === 200) {
				if (res.data.data) {
					// 后端API自定义结果集
					return Promise.resolve(res.data.data)
				} else {
					// 其他
					return Promise.resolve(res.data)
				}
			} else {
				// 请求成功,返回错误
				errorHandle(res.data.code, res.data.msg)
				return Promise.reject(res.data)
			}
		} else {
			errorHandle(res.status, res.statusText)
			return Promise.reject(res)
		}
	},
	// 对应axios的catch
	error => {
		// 请求超时
		if (error.code === 'ECONNABORTED') {
			errorHandle(408, '服务器网络异常,将稍后再试')
		} else {
			const res = error.response
			if (res) {
				errorHandle(res.status, res.statusText)
			} else {
				errorHandle(500, '请联系管理员')
			}
		}
		return Promise.reject(error)
	})

/**
 * 请求失败后的错误统一处理
 * @param {*} code 请求失败的状态码
 * @param {*} msg 错误信息
 */
const errorHandle = (code, msg) => {
	// 提示标题
	let title = ''
	// 提示类型
	let type = 'error'
	// 提示显示时间 /ms
	let duration = 2000
	// 提示显示位置
	const position = 'bottom-right'
	// 提示能否关闭
	let showClose = true
	// 错误类型
	switch (code) {
		case 1006:
			duration = 1
			break
		case 1004:
			title = '重复注册'
			type = 'warning'
			duration = 5000
			break
		case 1003:
			title = '此用户无权限'
			break
		case 1002:
			title = '无此用户'
			break
		case 1001:
			title = '请求参数错误'
			break
		case 400:
			title = '客户端错误'
			break
		case 404:
			title = '请求失败'
			break
		case 403:
			title = '请勿重复请求'
			type = 'warning'
			duration = 10000
			showClose = false
			// 清除当前登录用户信息
			store.dispatch('clear', 'userInfo')
			// 重新登录
			store.dispatch('updatePopups', 'isLogining')
			break
		case 408:
			title = '请求超时'
			break
		case 500:
		case 503:
			title = '服务器错误'
			break
		default:
			title = '请求失败'
	}
	// 错误提醒
	if (type === 'error') {
		Notification.error({
			title: title,
			message: msg,
			type: type,
			duration: duration,
			position: position,
			showClose: showClose
		})
	} else if (type === 'warning') {
		Notification.warning({
			title: title,
			message: msg,
			type: type,
			duration: duration,
			position: position,
			showClose: showClose
		})
	}
	console.log(msg)
}

export default instance