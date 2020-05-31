<template>
	<div id="home-view">
		<welcome-component/>
	</div>
</template>
<script>
	import WelcomeComponent from "../components/Welcome";

	export default {
		name: 'home-view',
		components: {WelcomeComponent},
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
</style>
