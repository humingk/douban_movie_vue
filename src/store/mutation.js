export default {
	/**
	 * 更新state
	 *
	 * @param {*} state
	 * @param {*} keyValue state对应的键值对
	 */
	update: function (state, keyValue) {
		state[keyValue.key] = keyValue.value
		// 永久保存userInfo
		if (keyValue.key === 'userInfo') {
			localStorage.setItem('userInfo', keyValue.value)
		}
	},
	/**
	 * 清除state
	 *
	 * @param {*} state
	 * @param {*} key state对应的键
	 */
	clear: function (state, key) {
		state[key] = null
		// 永久清除userInfo
		if (key === 'userInfo') {
			localStorage.removeItem('userInfo')
		}
	},
	/**
	 * 更新state.popups
	 *
	 * @param {*} state
	 * @param {*} keyValue popups键值对
	 */
	updatePopups: function (state, keyValue) {
		state.popups[keyValue.key] = keyValue.value
	},
	/**
	 * 更新state.subject
	 *
	 * @param {*} state
	 * @param {*} keyValue subject键值对
	 */
	updateSubject: function (state, keyValue) {
		state.subject[keyValue.key] = keyValue.value
	},
}
