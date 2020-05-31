<template>
	<div id="people-view">
		<welcome-component/>
	</div>
</template>
<script>
	import {mapState} from 'vuex'
	import WelcomeComponent from "../components/Welcome";

	export default {
		name: 'people-view',
		components: {WelcomeComponent},
		data() {
			return {
				userId: null,
				// 当前登录用户信息
				userInfo: null
			}
		},
		methods: {},
		computed: {
			...mapState({
				userId: state => state.userInfo.userId,
				userInfo: state => state.userInfo
			})
		}
	}
</script>
<style></style>
