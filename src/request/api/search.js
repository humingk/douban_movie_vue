/** 搜索API模块 */
import myAxios from '../myAxios'
import domain from '../domain'

const search = {
	/**
	 * 豆瓣电影搜索提示
	 *
	 * @param {*} params keyword:关键字 offset limit
	 * @returns
	 */
	movieDoubanTips(params) {
		return myAxios.get(domain.plus + '/search/movie/douban/tips', {
			params: params
		})
	},
	/**
	 * 豆瓣影人搜索提示
	 *
	 * @param {*} params keyword:关键字 offset limit
	 * @returns
	 */
	celebrityDoubanTips(params) {
		return myAxios.get(domain.plus + '/search/celebrity/douban/tips', {
			params: params
		})
	},
	/**
	 * 场景电影搜索提示
	 *
	 * @param {*} params keyword:关键字 offset limit
	 * @returns
	 */
	movieSceneTips(params) {
		return myAxios.get(domain.plus + '/search/movie/scene/tips', {
			params: params
		})
	},
	/**
	 * 场景地点搜索提示
	 *
	 * @param {*} params keyword:关键字 offset limit
	 * @returns
	 */
	placeSceneTips(params) {
		return myAxios.get(domain.plus + '/search/place/scene/tips', {
			params: params
		})
	},
	/**
	 * 电影资源搜索
	 *
	 * @param {*} params keyword:关键字 offset limit
	 * @returns
	 */
	resourceDetails(params) {
		return myAxios.get(domain.plus + '/search/resource/details', {
			params: params
		})
	},
}

export default search