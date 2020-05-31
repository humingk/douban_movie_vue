export default {
	getBgList: function (state) {
		// 优先采用特定页面背景列表
		if (state.specialBgList.length !== 0) {
			return state.specialBgList
		} else {
			return state.defaultBgList
		}
	},
}