<template>
	<div id="welcome-component">
			<span class="welcome-title">
				使用方式
			</span>
		<span class="welcome-title way">
				★ 豆瓣电影<span style="color: red">douban</span>后加一个<span style="color: red;font-weight: 800">S</span>
		</span>
		<span class="welcome-title arrow">
						☟
				</span>
		<div class="welcome-content example">
			<el-link class="hvr-grow" href="/subject/1889243/">https://movie.douban<span
				style="color:red;font-weight: 800;font-size: 20px">s</span>.com/subject/1889243
			</el-link>
		</div>
		<span class="welcome-title way">
				★ 调用本项目API服务你的应用
		</span>
		<span class="welcome-title arrow">
				☟
		</span>
		<div class="welcome-content example">
			<el-link class="hvr-grow" href="https://api.doubans.com" style="color:red;padding-right: 10px" target="_blank">
				API文档
			</el-link>
			<el-link :href="githubPlus" class="hvr-grow" style="color:red;" target="_blank">Github
			</el-link>
		</div>
	</div>
</template>
<script>
	import domain from "../request/domain";
	import {mapActions} from "vuex";

	export default {
		name: 'welcome-component',
		data() {
			return {
				githubPlus: domain.github + '/humingk/douban_movie_plus',
			}
		},
		computed: {},
		watch: {},
		mounted() {
			this.update({key: 'isBgClear', value: false})
		},
		methods: {
			...mapActions(['update'])
		},
	}
</script>
<style>
	#welcome-component {
		margin-top: 40px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: rgba(255, 255, 255, 0.6);
		border-radius: 10px;
		padding: 10px;
		font-size: 18px;
		font-weight: 500;
	}

	#welcome-component .welcome-title {
		font-size: 36px;
		font-weight: 600;
		padding-bottom: 10px;
	}

	#welcome-component .way {
		font-size: 20px;
		padding-top: 10px;
	}

	#welcome-component .arrow {
	}

	#welcome-component .welcome-content {
		padding-top: 5px;
		font-weight: 600;
	}

	#welcome-component .welcome-content.example {
		font-size: 18px;
		font-weight: 600;
		padding-bottom: 20px;
	}


	#welcome-component .welcome-github {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding-top: 10px;
	}

	.welcome-github .github-tips {
		align-self: center;
		padding-bottom: 10px;
	}

	.welcome-github .github-plus span {
		padding-right: 10px;
	}

	.welcome-github .github-vue span {
		padding-right: 35px;
	}

	#welcome-component .el-link.el-link--default {
		color: #000;
	}

	#welcome-component .el-link.el-link--default:hover {
		color: #f31919;
	}

	/* Grow */
	#welcome-component .hvr-grow {
		display: inline-block;
		vertical-align: middle;
		-webkit-transform: perspective(1px) translateZ(0);
		transform: perspective(1px) translateZ(0);
		box-shadow: 0 0 1px rgba(0, 0, 0, 0);
		-webkit-transition-duration: 0.3s;
		transition-duration: 0.3s;
		-webkit-transition-property: transform;
		transition-property: transform;
	}

	#welcome-component .hvr-grow:hover, .hvr-grow:focus, .hvr-grow:active {
		-webkit-transform: scale(1.1);
		transform: scale(1.1);
		z-index: 3;
	}

</style>
