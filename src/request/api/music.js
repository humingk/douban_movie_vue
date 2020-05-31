/** 音乐API模块 */
import myAxios from '../myAxios'
import domain from '../domain'

const music = {
	/**
	 * 网易云音乐 搜索
	 *
	 * @param {*} params
	 * keywords:关键字
	 * offset
	 * limit
	 * type: 1-单曲 10-专辑 1000-歌单
	 * @returns
	 */
	neteaseMusicTips(params) {
		return myAxios.get(domain.plus + '/music/search', {
			// return myAxios.get(domain.neteaseMusicApi + '/search', {
			params: params
		})
	},
	/**
	 * 网易云音乐 搜索建议
	 *
	 * @param {*} params keywords:关键字
	 * @returns
	 */
	neteaseMusicSuggest(params) {
		return myAxios.get(domain.plus + '/music/search/suggest', {
			// return myAxios.get(domain.neteaseMusicApi + '/search/suggest', {
			params: params
		})
	},
	/**
	 * 网易云音乐 歌曲详细信息
	 *
	 * @param {*} params ids 逗号隔开的歌曲ID
	 * @returns
	 */
	neteaseMusicSongDetails(params) {
		return myAxios.get(domain.plus + '/music/song/detail', {
			// return myAxios.get(domain.neteaseMusicApi + '/song/detail', {
			params: params
		})
	},
	/**
	 * 网易云音乐 歌单详情
	 *
	 * @param {*} params id:歌单ID
	 * @returns
	 */
	neteaseMusicPlaylistDetails(params) {
		return myAxios.get(domain.plus + '/music/playlist/detail', {
			// return myAxios.get(domain.neteaseMusicApi + '/playlist/detail', {
			params: params
		})
	},
	/**
	 * 网易云音乐 专辑
	 *
	 * @param {*} params id:专辑ID
	 * @returns
	 */
	neteaseMusicAlbum(params) {
		return myAxios.get(domain.plus + '/music/album', {
			// return myAxios.get(domain.neteaseMusicApi + '/album', {
			params: params
		})
	},
	/**
	 * 网易云音乐 热门评论
	 *
	 * @param {*} params
	 * id
	 * offset
	 * limit
	 * type: 0-歌曲 3-专辑 2-歌单
	 * @returns
	 */
	neteaseMusicHotComment(params) {
		return myAxios.get(domain.plus + '/music/comment/hot', {
			// return myAxios.get(domain.neteaseMusicApi + '/comment/hot', {
			params: params
		})
	},
	/**
	 * 网易云音乐 歌曲评论
	 *
	 * @param {*} params
	 * id
	 * offset
	 * limit
	 * @returns
	 */
	neteaseMusicSongComment(params) {
		return myAxios.get(domain.plus + '/music/comment/music', {
			// return myAxios.get(domain.neteaseMusicApi + '/comment/music', {
			params: params
		})
	},
	/**
	 * 网易云音乐 专辑评论
	 *
	 * @param {*} params
	 * id
	 * offset
	 * limit
	 * @returns
	 */
	neteaseMusicAlbumComment(params) {
		return myAxios.get(domain.plus + '/music/comment/album', {
			// return myAxios.get(domain.neteaseMusicApi + '/comment/album', {
			params: params
		})
	},


	/**
	 * 网易云音乐 歌单评论
	 *
	 * @param {*} params
	 * id
	 * offset
	 * limit
	 * @returns
	 */
	neteaseMusicPlaylistComment(params) {
		return myAxios.get(domain.plus + '/music/comment/playlist', {
			// return myAxios.get(domain.neteaseMusicApi + '/comment/playlist', {
			params: params
		})
	},

}

export default music