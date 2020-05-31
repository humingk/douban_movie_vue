<template>
	<div id="movie-scene-component" v-if="sceneBases">
		<div class="place-list">
			<el-carousel :interval="5000"
									 :loop="true"
									 arrow="never"
									 height="290px"
									 indicator-position="none"
									 type="card">
				<el-carousel-item :key="item.base.id" v-for="item in sceneBases.sceneList">
					<el-image
						:src="item.place.base.urlPoster"
						fit="cover"/>
					<div class="place-des">
						<span class="scene-title">
							<span class="scene-place">
								{{item.base.nameZh}} ➜
							</span>
							<span class="real-place" v-if="item.place.base.nameZh!==''">
								<el-link
									:href="getGoogleMap(item)"
									target="_blank">
								{{item.place.base.nameZh}}
								</el-link>
							</span>
							<span class="real-place" v-if="item.place.base.nameZh==='' && item.place.base.nameEn!=='' ">
								<el-link
									:href="getGoogleMap(item)"
									target="_blank">
								{{item.place.base.nameEn}}
								</el-link>
							</span>
						</span>
						<span class="place-des-content">
								{{item.place.base.description}}
							</span>

						<span class="place-address-zh"
									v-if="item.place.base.addressZh!==''">
							地址:
								{{item.place.base.addressZh}}
						</span>

						<span class="place-address-en"
									v-if="item.place.base.addressEn!==''">
							address:
								{{item.place.base.addressEn}}
						</span>
						<span class="place-phone" v-if="item.place.base.phone!==''">
								电话: {{item.place.base.phone}}
						</span>
					</div>
				</el-carousel-item>
			</el-carousel>
		</div>
		<div class="scene-detail">
			<div class="pic">
				<img :src="sceneBases.base.urlMap" fit="cover"/>
			</div>
			<div class="scene-des">
				{{sceneBases.base.description}}
			</div>
		</div>
	</div>
</template>
<script>
	import domain from "../../request/domain";
	import {mapActions} from "vuex";

	export default {
		name: 'movieSceneComponent',
		props: {
			movieId: Number
		},
		data() {
			return {
				sceneBases: null
			}
		},
		computed: {},
		watch: {},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				if (this.movieId) {
					this.$api.scene.sceneBases({id: this.movieId}).then(res => {
						setTimeout(() => {
							this.sceneBases = res
							this.updateSubject({key: 'isSceneGot', value: true})
							this.updateSubject({key: 'isSceneDone', value: true})
						}, 2000)
					}).catch(error => {
						this.updateSubject({key: 'isSceneDone', value: true})
					})
				}
			},
			getGoogleMap(item) {
				return domain.google + '/maps/search/?api=1&query=' + item.place.base.latitude + ',' + item.place.base.longitude
			},
			...mapActions(['update', 'updateSubject'])
		},
	}
</script>
<style>
	#movie-scene-component {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	#movie-scene-component .place-list {
		flex: 1;
		min-height: 290px;
		width: 100%;
		padding-right: 10px;
		display: flex;
		border-right: 2px solid rgba(255, 255, 255, 0.2);
	}

	#movie-scene-component .place-list {

	}

	#movie-scene-component .place-list el-image {
		width: 360px;
		border-radius: 10px;

	}

	#movie-scene-component .place-list .place-des {
		padding: 0 8px;
		line-height: 1.7;
		display: flex;
		flex-direction: column;
		font-size: 16px;
		font-weight: 500;
	}

	#movie-scene-component .place-list .scene-title {
		align-self: center;
		font-size: 18px;
		font-weight: 600;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	#movie-scene-component .place-list .scene-title .scene-place {
		padding-right: 5px;
	}

	#movie-scene-component .place-list .scene-title .real-place {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	#movie-scene-component .place-list .scene-title .real-place a {
		font-size: 18px;
		font-weight: 600;
	}

	#movie-scene-component .el-link.el-link--default {
		color: #000;
	}

	#movie-scene-component .el-link.el-link--default:hover {
		color: #f31919;
	}

	#movie-scene-component .place-list .place-des-content {
	}

	#movie-scene-component .place-list .place-address-zh {
		font-weight: 500;
		font-size: 14px;
		margin-top: 10px;
	}


	#movie-scene-component .place-list .place-address-en {
		font-weight: 500;
		font-size: 14px;
		margin-top: 10px;
	}

	#movie-scene-component .place-list .place-phone {
		font-weight: 500;
		font-size: 14px;
	}

	#movie-scene-component .scene-detail {
		flex: 0 0 280px;
		width: 280px;
		height: 290px;
		margin-left: 8px;
		margin-right: 10px;
		display: flex;
		flex-direction: column;
		background-color: rgba(255, 255, 255, 0.5);
		overflow: auto;
		overflow: -moz-scrollbars-none;
		-ms-overflow-style: none;
		border-radius: 10px;
	}

	#movie-scene-component .scene-detail::-webkit-scrollbar {
		display: none;
	}


	#movie-scene-component .scene-detail .pic {
		flex: 0 0 180px;
	}

	#movie-scene-component .scene-detail .scene-des {
		flex: 0 0 auto;
		line-height: 1.60;
		font-weight: 500;
		padding-left: 3px;
	}

	#movie-scene-component .scene-detail .pic img {
		max-height: 180px;
		max-width: 290px;
		border-radius: 10px;
	}

	/*其他*/
	.el-carousel.el-carousel--horizontal.el-carousel--card {
		width: 100%;
	}

	.el-carousel__item.is-active.el-carousel__item--card {
		border-radius: 10px;
	}

	.el-carousel__item.el-carousel__item--card.is-in-stage {
		border-radius: 10px;
	}

	.el-carousel__item.is-active.el-carousel__item--card.is-in-stage {
		border-radius: 10px;
		background-color: rgba(255, 255, 255, 0.7);
	}


	.el-carousel__item {
		overflow: auto;
		overflow: -moz-scrollbars-none;
		-ms-overflow-style: none;
	}

	.el-carousel__item::-webkit-scrollbar {
		display: none;
	}

</style>
