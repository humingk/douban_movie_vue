<template>
	<div id="app">
		<background-component/>
		<!--		<back-top-component/>-->
		<login-component/>
		<register-component/>
		<div class="header">
			<nav-component/>
		</div>
		<div class="main">
			<router-view/>
		</div>
		<div :style="enjoyHeight" class="enjoy"/>
		<div class="footer">
			<footer-component/>
		</div>
	</div>
</template>

<script>
	import loginComponent from './components/user/Login'
	import registerComponent from './components/user/Register'
	import navComponent from './components/Nav'
	import backgroundComponent from './components/Background'
	// import backTopComponent from './components/BackTop'
	import footerComponent from "./components/Footer";

	export default {
		name: 'App',
		// backTopComponent,
		components: {
			loginComponent,
			registerComponent,
			navComponent,
			backgroundComponent,
			footerComponent
		},
		provide() {
			return {
				// reject引入执行,重载当前路由
				reload: this.reload
			}
		},
		data() {
			return {
				// 当前路由是否显示
				isRouterAlive: true,
				// 背景图是否清晰
				isBgClear: false
			}
		},
		computed: {
			// 壁纸欣赏高度
			enjoyHeight() {
				return "min-height:" + (document.body.clientHeight - 120) + "px;"
			}
		},
		methods: {
			/**
			 * 刷新当前路由
			 *
			 */
			reload() {
				this.isRouterAlive = false
				this.$nextTick(function () {
					this.isRouterAlive = true
				})
			},
		},
		mounted() {
		},
	}
</script>

<style>
	html,
	body {
		margin: 0 0;
		padding: 0 0;
		width: 100%;
		height: 100%;
		/* min-height: 1000px; */
	}

	/* 页面布局--------------- */
	#app {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	/* app */
	#app .header {
		flex: 0 0 120px;
		flex-grow: 0;
		display: flex;
	}

	#app .main {
		flex: 0 0 auto;
		width: 1024px;
		margin: auto;
	}

	#app .enjoy {
		width: 100%;
	}

	#app .footer {
		flex: 0 0 120px;
		width: 100%;
	}

	/* 其他样式---------------- */
	/* 隐藏滚轮 */
	body::-webkit-scrollbar {
		display: none;
	}

	body {
		overflow: -moz-scrollbars-none;
		-ms-overflow-style: none;
	}
</style>
