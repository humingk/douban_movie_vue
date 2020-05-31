<template>
	<div id="movie-none-component">
		请再刷新一次 / 或者，暂未收录此电影
	</div>
</template>
<script>
	export default {
		name: 'movieNoneComponent',
		data() {
			return {}
		},
		computed: {},
		watch: {},
		mounted() {
		},
		methods: {},
	}
</script>
<style>
	#movie-none-component {
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

</style>
