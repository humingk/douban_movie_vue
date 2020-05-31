/** 留言模块 */
import myAxios from '../myAxios'
import domain from '../domain'
import qs from 'qs'

const message = {
	/**
	 * 留言列表
	 *
	 * @param {*} params: order offset limit
	 * @returns
	 */
	messageList(params) {
		return myAxios.get(domain.plus + '/movie/message/details', {
			params: params
		})
	},
	/**
	 * 留言赞同
	 *
	 * @param {*} params: id
	 * @returns
	 */
	messageAgree(params) {
		return myAxios.put(domain.plus + '/movie/message/agree', qs.stringify(params))
	},
	/**
	 * 增加留言
	 *
	 * @param {*} params: idUser nickname content
	 * @returns
	 */
	messageAdd(params) {
		return myAxios.post(domain.plus + '/movie/message/add', qs.stringify(params))
	},
}

export default message