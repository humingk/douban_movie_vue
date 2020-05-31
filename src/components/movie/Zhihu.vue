<template>
	<div id="movie-zhihu-component">
		<div :key="index" class="zhihu-question" v-for="(item,index) in zhihuBases.questionList">
			<el-link :href="item.urlZhihuQuestion" class="question-item hvr-grow" target="_blank">{{item.nameZh}}</el-link>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'movieZhihuComponent',
		props: {zhihuBases: Object},
		data() {
			return {}
		},
		mounted() {
		},
		methods: {},
		computed: {},
		watch: {}
	}
</script>
<style>
	#movie-zhihu-component {
		width: 100%;
		flex: 0 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	#movie-zhihu-component .zhihu-question {
	}

	.question-item {
		font-size: 16px;
		font-weight: 500;
	}

	/*其他*/

	.question-item.el-link.el-link--default {
		color: #000;
		background-color: rgba(255, 255, 255, 0.4);
		border-radius: 10px;
		padding: 0 10px;
		margin-bottom: 5px;
	}

	.question-item.el-link.el-link--default:hover {
		color: #f31919;
	}

	.question-item.el-link.is-underline:hover:after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		height: 0;
		bottom: 0;
		border-bottom: 0 solid white;
	}

	/* Grow */
	.hvr-grow {
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

	.hvr-grow:hover, .hvr-grow:focus, .hvr-grow:active {
		-webkit-transform: scale(1.1);
		transform: scale(1.1);
	}
</style>
