<template>
	<div id="movie-resource-component" v-if="resourceList.length!==0">
		<span @click="searchResource()" class="resource-item resource-search hvr-grow"><el-link class="content">没有你想要的资源？点击这里手动搜索 <span
			class="el-icon-search"></span></el-link></span>
		<div :key="index" class="classify" v-for="(rList,index) in classify">
			<span :key="index2" :style="'background-color:'+resource.websiteColor" class="resource-item hvr-grow"
						v-for="(resource,index2) in rList">
						<span class="type" v-if="resource.typeResource!==''">{{resource.typeResource}}</span>
			<el-link :href="resource.urlResource"
							 class="content"
							 target="_blank">
				<span>{{(resource.nameOrigin && resource.nameOrigin.trim()!=='')?resource.nameOrigin:nameZh}}</span>
			</el-link>
			</span>
		</div>
	</div>
</template>
<script>
	import {mapActions, mapState} from "vuex";

	export default {
		name: 'movieResourceComponent',
		props: {
			movieId: Number,
			nameZh: String
		},
		data() {
			return {
				resourceList: [],
				// 资源分类
				classify: {
					legalOnlineList: [],
					priacyOnlineList: [],
					piracyList: [],
					unknownList: []
				},
				// 资源背景透明度
				resourceTransparency: 0.8
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				if (this.movieId) {
					this.$api.movie.resourceBases({id: this.movieId}).then(res => {
						this.resourceList = res
						if (this.resourceList.length <= 3) {
							this.searchResourceNow()
						}
						this.updateSubject({key: 'isResourceDone', value: true})
					}).catch(error => {
						this.searchResourceNow()
					})
				}
			},
			searchResourceNow() {
				this.$api.search.resourceDetails({keyword: this.nameZh, offset: 0, limit: 18}).then(res => {
					this.resourceList.push.apply(this.resourceList, res)
					this.updateSubject({key: 'isResourceDone', value: true})
				}).catch(error => {
					this.updateSubject({key: 'isResourceDone', value: true})
				})
			},
			// 资源搜索
			searchResource() {
				this.update({key: 'searchSelect', value: 'resource'})
				this.update({key: 'keyword', value: this.nameZh})
				document.getElementById('search-auto').focus()
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
			},
			...mapActions(['update', 'updateSubject'])
		},
		computed: {
			...mapState({})
		},
		watch: {
			// 资源分类
			resourceList() {
				if (this.resourceList.length !== 0) {
					this.resourceList.forEach(resource => {
						resource['websiteColor'] = 'rgba(' + resource['websiteColor'] + ',' + this.resourceTransparency + ')'
						// 资源类型分类
						if (resource.idTypeResource === 0 || resource.idTypeResource === 1000) {
							this.classify.unknownList.push(resource)
						} else if (resource.idTypeResource === 101 && resource.idWebsiteType !== 180) {
							this.classify.priacyOnlineList.push(resource)
						} else if (resource.idTypeResource > 0 && resource.idTypeResource < 100) {
							this.classify.legalOnlineList.push(resource)
						} else if (resource.idTypeResource > 100) {
							this.classify.piracyList.push(resource)
						}
					})
					this.updateSubject({key: 'isResourceGot', value: true})
				}
			},
		}
	}
</script>
<style>
	#movie-resource-component {
		width: 100%;
		flex: 0 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}

	#movie-resource-component .classify {
		width: 100%;
		flex: 0 0 auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
	}

	#movie-resource-component .resource-search {
		align-self: center;
		background-color: rgba(33, 191, 115, 1);
	}

	#movie-resource-component .resource-search .content {
		font-weight: 500;
		font-size: 16px;
	}

	#movie-resource-component .resource-item {
		margin-right: 5px;
		margin-bottom: 5px;
		border-radius: 6px;
	}

	.resource-item .type {
		background-color: rgba(33, 191, 115, 1);
		border-radius: 6px;
		padding-left: 2px;
		padding-right: 2px;
		font-weight: 500;
		font-size: 16px;
	}

	.resource-item .content {
		padding-left: 3px;
		padding-right: 3px;
		font-size: 14px;
		font-weight: 500;
		color: #000;
	}

	/*其他*/
	.content.el-link.el-link--default:hover {
		color: rgba(255, 255, 255, 1);
	}

	.content.el-link.is-underline:hover:after {
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
		z-index: 3;
	}
</style>
